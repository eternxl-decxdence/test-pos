// Kontroler odpowiedzialny za endpointy /auth (register, login, refresh)
// Endpointy oznaczone dekoratorem @Public() są pomijane przez JwtAuthGuard
import { Controller, Post, Res, Body, Req } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from '@services/auth'
import { Public } from 'app/decorators/public'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('register')
  async register(@Body() body: { username: string; password: string; greetname: string; masterToken: string }) {
    return await this.authService.register(body.username, body.password, body.greetname, body.masterToken)
  }

  @Public()
  @Post('login')
  async login(@Res({ passthrough: true }) res: Response, @Body() body: { username: string; password: string }) {
    // Po poprawnym loginie ustawiamy cookie z refresh tokenem oraz zwracamy access token
    const { accessToken, refreshToken, greetname } = await this.authService.login(
      body.username,
      body.password,
    )
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return { accessToken, greetname }
  }

  @Public()
  @Post('refresh')
  async refreshAccessToken(@Req() req: Request) {
    const token = req.cookies['refreshToken']
    // Odświeżamy access token za pomocą refresh tokena
    return await this.authService.refresh(token)
  }
}
