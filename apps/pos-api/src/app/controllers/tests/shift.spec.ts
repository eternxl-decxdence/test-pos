import { ShiftController } from '../shift'

// PL: Testy kontrolera shift - sprawdzamy, czy deleguje do serwisu
describe('ShiftController', () => {
  let mockService: any
  let ctrl: ShiftController

  beforeEach(() => {
    mockService = { start: jest.fn(), end: jest.fn() }
    ctrl = new ShiftController(mockService)
  })

  it('start delegates to service', async () => {
    mockService.start.mockResolvedValue({ shift: 's1' })
    await expect(ctrl.start({ cashStart: 100 })).resolves.toEqual({ shift: 's1' })
    expect(mockService.start).toHaveBeenCalledWith(100)
  })

  it('end delegates to service', async () => {
    mockService.end.mockResolvedValue({ id: 'id' })
    await expect(ctrl.end({ shiftId: 'id', cashEnd: 200 })).resolves.toEqual({ id: 'id' })
    expect(mockService.end).toHaveBeenCalledWith(200, 'id')
  })
})
