// Guard JWT — weryfikuje nagłówek Authorization i waliduje token JWT
// Jeśli metoda/klasa jest oznaczona jako @Public(), guard pomija walidację
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { IS_PUBLIC_KEY } from 'app/decorators/public'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) return true

    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers['authorization']

    if (!(authHeader && authHeader.startsWith('Bearer ')))
      throw new UnauthorizedException('No token provided')

    const token = authHeader.split(' ')[1]
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_SECRET,
      })
      request.user = payload
      return true
    } catch {
      throw new UnauthorizedException('Invalid or expired token')
    }
  }
}
