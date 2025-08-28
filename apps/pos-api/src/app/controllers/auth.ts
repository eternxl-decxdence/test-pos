// Kontroler odpowiedzialny za endpointy /auth (register, login, refresh)
// Endpointy oznaczone dekoratorem @Public() są pomijane przez JwtAuthGuard
import { Controller, Post, Res, Body } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from '@services/auth'
import { Public } from 'app/decorators/public'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() body: { username; password; greetname; masterToken }) {
    // Delegujemy logikę rejestracji do serwisu
    return this.authService.register(body.username, body.password, body.greetname, body.masterToken)
  }

  @Public()
  @Post('login')
  async login(@Res({ passthrough: true }) res: Response, @Body() body: { username; password }) {
    // Po poprawnym loginie ustawiamy cookie z refresh tokenem oraz zwracamy access token
    const { accessToken, refreshToken } = await this.authService.login(body.username, body.password)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })
    return { accessToken }
  }

  @Public()
  @Post('refresh')
  async refreshAccessToken(@Body() body: { token; userId }) {
    // Odświeżamy access token za pomocą refresh tokena
    return this.authService.refresh(body.token)
  }
}
