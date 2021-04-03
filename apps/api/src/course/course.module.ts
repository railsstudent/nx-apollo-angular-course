import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma'
import {
  PaginatedItemsResolver,
} from './resolvers'
import { CourseService } from './services'

@Module({
  imports: [PrismaModule],
  providers: [
    CourseService,
    PaginatedItemsResolver,
  ],
})
export class CourseModule {}
