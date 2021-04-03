import { Test, TestingModule } from '@nestjs/testing'
import { PaginatedItemsResolver } from './paginated-items.resolver'

describe('PaginatedItemsResolver', () => {
  let resolver: PaginatedItemsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginatedItemsResolver],
    }).compile()

    resolver = module.get<PaginatedItemsResolver>(PaginatedItemsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
