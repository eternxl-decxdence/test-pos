import { AuthController } from './auth'

// Testy jednostkowe dla AuthController - sprawdza, czy deleguje do serwisu i ustawia cookie
describe('AuthController', () => {
  let mockService: any
  let ctrl: AuthController

  beforeEach(() => {
    mockService = {
      register: jest.fn(),
      login: jest.fn(),
      refresh: jest.fn(),
    }
    ctrl = new AuthController(mockService)
  })

  it('register delegates to service', async () => {
    mockService.register.mockResolvedValue({ ok: true })
    await expect(
      ctrl.register({ username: 'u', password: 'p', masterToken: 'm' }),
    ).resolves.toEqual({ ok: true })
    expect(mockService.register).toHaveBeenCalledWith('u', 'p', 'm')
  })

  it('login sets cookie and returns accessToken', async () => {
    mockService.login.mockResolvedValue({ accessToken: 'at', refreshToken: 'rt' })
    const res: any = { cookie: jest.fn() }
    const out = await ctrl.login(res, { username: 'u', password: 'p' })
    expect(res.cookie).toHaveBeenCalledWith('refreshToken', 'rt', expect.any(Object))
    expect(out).toEqual({ accessToken: 'at' })
  })

  it('refresh delegates to service', async () => {
    mockService.refresh.mockResolvedValue({ accessToken: 'a' })
    await expect(ctrl.refreshAccessToken({ token: 't', userId: '1' })).resolves.toEqual({
      accessToken: 'a',
    })
    expect(mockService.refresh).toHaveBeenCalledWith('t')
  })
})
