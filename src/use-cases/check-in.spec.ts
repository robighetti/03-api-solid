import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check-in', async () => {
    vi.setSystemTime(new Date())

    gymsRepository.items.push({
      id: 'gym-id',
      title: 'Gym Name',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    // -22.68935037081246, -47.65547533052136

    const { checkin } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -22.6907388,
      userLongitude: -47.6610253,
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date())

    gymsRepository.items.push({
      id: 'gym-id',
      title: 'Gym Name',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -22.6907388,
      userLongitude: -47.6610253,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -22.6907388,
        userLongitude: -47.6610253,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check-in twice in the different days', async () => {
    vi.setSystemTime(new Date(2023, 7, 3, 8, 0, 0))

    gymsRepository.items.push({
      id: 'gym-id',
      title: 'Gym Name',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -22.6907388,
      userLongitude: -47.6610253,
    })

    vi.setSystemTime(new Date(2023, 7, 4, 8, 0, 0))

    const { checkin } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -22.6907388,
      userLongitude: -47.6610253,
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in on distant gym', async () => {
    vi.setSystemTime(new Date())

    gymsRepository.items.push({
      id: 'gym-id',
      title: 'Gym Name',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    const { checkin } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -22.6907388,
      userLongitude: -47.6610253,
    })

    expect(checkin.id).toEqual(expect.any(String))
  })
})
