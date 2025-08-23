import { JwtAuthGuard } from './auth'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

//testy dla JwtAuthGuard - sprawdzamy publiczne endpointy i walidację tokena
describe('JwtAuthGuard', () => {
  let reflector: any
  let jwt: any
  let guard: JwtAuthGuard

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn() }
    jwt = { verifyAsync: jest.fn() }
    guard = new JwtAuthGuard(reflector as Reflector, jwt as JwtService)
  })

  it('allows public route', async () => {
    ;(reflector.getAllAndOverride as jest.Mock).mockReturnValue(true)
    const ctx: any = {
      getHandler: () => {},
      getClass: () => {},
      switchToHttp: () => ({ getRequest: () => ({ headers: {} }) }),
    }
    const ok = await guard.canActivate(ctx)
    expect(ok).toBe(true)
  })

  it('rejects missing auth header', async () => {
    ;(reflector.getAllAndOverride as jest.Mock).mockReturnValue(false)
    // zapewniamy getHandler i getClass, bo guard ich oczekuje
    const ctx: any = {
      getHandler: () => {},
      getClass: () => {},
      switchToHttp: () => ({ getRequest: () => ({ headers: {} }) }),
    }
    await expect(guard.canActivate(ctx as any)).rejects.toThrow('No token provided')
  })

  it('accepts valid token and sets request.user', async () => {
    ;(reflector.getAllAndOverride as jest.Mock).mockReturnValue(false)
    const req: any = { headers: { authorization: 'Bearer tok' } }
    ;(jwt.verifyAsync as jest.Mock).mockResolvedValue({ sub: 1 })
    const ctx: any = {
      switchToHttp: () => ({ getRequest: () => req }),
      getHandler: () => {},
      getClass: () => {},
    }
    const ok = await guard.canActivate(ctx)
    expect(ok).toBe(true)
    expect(req.user).toEqual({ sub: 1 })
  })

  it('rejects invalid token', async () => {
    ;(reflector.getAllAndOverride as jest.Mock).mockReturnValue(false)
    const req: any = { headers: { authorization: 'Bearer tok' } }
    ;(jwt.verifyAsync as jest.Mock).mockRejectedValue(new Error('invalid'))
    const ctx: any = {
      switchToHttp: () => ({ getRequest: () => req }),
      getHandler: () => {},
      getClass: () => {},
    }
    await expect(guard.canActivate(ctx as any)).rejects.toThrow('Invalid or expired token')
  })
})
