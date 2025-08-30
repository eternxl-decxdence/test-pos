// Serwis zawierający logikę autoryzacji: rejestrację, logowanie oraz odświeżanie tokenów
// Używamy PrismaClient do operacji na bazie oraz JwtService do generacji tokenów
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private JwtService: JwtService, private prisma: PrismaClient) {}

  // Rejestracja nowego użytkownika — wymaga master tokena do zabezpieczenia tworzenia kont
  async register(username: string, password: string, greetname: string, masterToken: string) {
    if (masterToken !== process.env.MASTER_TOKEN)
      throw new ForbiddenException('Invalid master token')

    if (!(username && password)) throw new BadRequestException('Username or password not provided')

    const hash = await bcrypt.hash(password, 10)

    const existingUser = await this.prisma.user.findUnique({ where: { username } })

    if (existingUser) throw new ConflictException('User already exists')

    const user = await this.prisma.user.create({
      data: {
        greetname,
        username,
        password: hash,
      },
    })

    return {
      success: true,
      message: `User ${user.username} registered successfully`,
    }
  }

  // Logowanie — weryfikujemy poświadczenia i generujemy access oraz refresh token
  async login(username: string, password: string) {
    if (!(username && password)) throw new BadRequestException('Username or password not provided')

    const user = await this.prisma.user.findUnique({ where: { username } })

    if (!(user && (await bcrypt.compare(password, user.password))))
      throw new UnauthorizedException('Invalid credentials')

    let refreshToken = await this.prisma.refreshToken.findFirst({
      where: { userId: user.id, revoked: false },
    })

    if (!refreshToken) {
      // PL: jeśli refresh token nie istnieje, tworzymy go i przypisujemy zmiennej
      refreshToken = await this.prisma.refreshToken.create({
        data: {
          userId: user.id,
          token: this.JwtService.sign(
            { sub: user.id },
            { secret: process.env.REFRESH_SECRET, expiresIn: '7d' },
          ),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      })
    }

    const accessToken = this.JwtService.sign({ sub: user.id })
    return { accessToken, greetname: user.greetname, refreshToken: refreshToken.token }
  }

  // Odświeżanie access tokena przy pomocy refresh tokena
  async refresh(token: string) {
    if (!token) throw new BadRequestException('')

    const storedToken = await this.prisma.refreshToken.findUnique({ where: { token } })
    if (!storedToken) throw new UnauthorizedException('Invalid refresh token')
    if (storedToken.revoked) throw new ForbiddenException('Refresh token revoked')
    if (storedToken.expiresAt < new Date()) throw new ForbiddenException('Refresh token expired')

    return { accessToken: this.JwtService.sign({ sub: storedToken.userId }) }
  }
}
