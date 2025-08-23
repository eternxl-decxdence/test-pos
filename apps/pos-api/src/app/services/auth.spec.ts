// Mok bcrypt na poziomie modułu aby unikać problemów z redefinicją właściwości
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}))

import { AuthService } from './auth'
import { PrismaClient } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

// Unit tests dla AuthService - mokujemy PrismaClient i JwtService
describe('AuthService', () => {
  let mockPrisma: any
  let mockJwt: any
  let svc: AuthService

  beforeEach(() => {
    // przygotowanie mocków
    mockPrisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      refreshToken: {
        findFirst: jest.fn(),
        create: jest.fn(),
        findUnique: jest.fn(),
      },
    } as unknown as PrismaClient

    mockJwt = {
      sign: jest.fn(),
      verifyAsync: jest.fn(),
    } as unknown as JwtService

    process.env.MASTER_TOKEN = 'master'
    svc = new AuthService(mockJwt, mockPrisma)
    jest.clearAllMocks()
  })

  it('register - success', async () => {
    // brak istniejącego użytkownika -> create zwraca nowego użytkownika
    ;(mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null)
    // korzystamy z zamockowanego bcrypt.hash
    ;(bcrypt.hash as unknown as jest.Mock).mockResolvedValue('hashed')
    ;(mockPrisma.user.create as jest.Mock).mockResolvedValue({ id: '1', username: 'u' })

    const res = await svc.register('u', 'p', 'master')

    expect(res).toHaveProperty('success', true)
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: {
        username: 'u',
        password: 'hashed',
      },
    })
  })

  it('register - invalid master token', async () => {
    await expect(svc.register('u', 'p', 'bad')).rejects.toThrow('Invalid master token')
  })

  it('login - invalid credentials', async () => {
    ;(mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null)
    await expect(svc.login('x', 'y')).rejects.toThrow('Invalid credentials')
  })

  it('login - success returns tokens when refresh exists', async () => {
    const user = { id: '1', username: 'u', password: 'hash' }
    ;(mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(user)
    // korzystamy z zamockowanego bcrypt.compare
    ;(bcrypt.compare as unknown as jest.Mock).mockResolvedValue(true)

    // istniejący refresh token w bazie
    ;(mockPrisma.refreshToken.findFirst as jest.Mock).mockResolvedValue({
      token: 'rt',
      userId: '1',
      revoked: false,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    })
    ;(mockJwt.sign as jest.Mock).mockReturnValue('at')

    const out = await svc.login('u', 'p')
    expect(out.accessToken).toBe('at')
    expect(out.refreshToken).toBe('rt')
  })

  it('refresh - missing token throws', async () => {
    // pusty token -> BadRequestException
    // @ts-ignore
    await expect(svc.refresh('')).rejects.toThrow()
  })

  it('refresh - invalid token', async () => {
    ;(mockPrisma.refreshToken.findUnique as jest.Mock).mockResolvedValue(null)
    await expect(svc.refresh('bad')).rejects.toThrow('Invalid refresh token')
  })

  it('refresh - revoked token', async () => {
    ;(mockPrisma.refreshToken.findUnique as jest.Mock).mockResolvedValue({ revoked: true })
    await expect(svc.refresh('tok')).rejects.toThrow('Refresh token revoked')
  })

  it('refresh - expired token', async () => {
    ;(mockPrisma.refreshToken.findUnique as jest.Mock).mockResolvedValue({
      revoked: false,
      expiresAt: new Date(0),
    })
    await expect(svc.refresh('tok')).rejects.toThrow('Refresh token expired')
  })

  it('refresh - success returns new access token', async () => {
    ;(mockPrisma.refreshToken.findUnique as jest.Mock).mockResolvedValue({
      userId: '1',
      revoked: false,
      expiresAt: new Date(Date.now() + 10000),
    })
    ;(mockJwt.sign as jest.Mock).mockReturnValue('newAccess')
    const out = await svc.refresh('tok')
    expect(out.accessToken).toBe('newAccess')
  })
})
