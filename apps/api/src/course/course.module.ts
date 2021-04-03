import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma'
import { LanguageResolver, PaginatedItemsResolver } from './resolvers'
import { CourseService } from './services'

@Module({
  imports: [PrismaModule],
  providers: [CourseService, LanguageResolver, PaginatedItemsResolver],
})
export class CourseModule {}
