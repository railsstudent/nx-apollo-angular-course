import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma'
import { CourseResolver, LanguageResolver, PaginatedItemsResolver } from './resolvers'
import { CourseService, LessonService, UniqueHelper } from './services'

@Module({
  imports: [PrismaModule],
  providers: [CourseService, CourseResolver, LanguageResolver, PaginatedItemsResolver, UniqueHelper, LessonService],
})
export class CourseModule {}
