// Moduł odpowiedzialny za rejestrację AuthService i AuthController
// Rejestrujemy także JwtModule z podstawową konfiguracją (sekrety z env)
import { Module } from '@nestjs/common'
import { AuthService } from '@services/auth'
import { AuthController } from '@controllers/auth'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from './prisma'

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule { }
