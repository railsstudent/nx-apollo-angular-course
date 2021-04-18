import { Test, TestingModule } from '@nestjs/testing'
import { CourseService, LessonService, SentenceService } from '../services'
import { PaginatedItemsResolver } from './paginated-items.resolver'

describe('PaginatedItemsResolver', () => {
  let resolver: PaginatedItemsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaginatedItemsResolver,
        {
          provide: CourseService,
          useValue: {},
        },
        {
          provide: LessonService,
          useValue: {},
        },
        {
          provide: SentenceService,
          useValue: {},
        },
      ],
    }).compile()

    resolver = module.get<PaginatedItemsResolver>(PaginatedItemsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
