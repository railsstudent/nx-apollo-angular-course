import { UniqueHelper } from './unique.helper'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../prisma'
import { CourseService } from './course.service'

describe('CourseService', () => {
  let service: CourseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: UniqueHelper,
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<CourseService>(CourseService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
