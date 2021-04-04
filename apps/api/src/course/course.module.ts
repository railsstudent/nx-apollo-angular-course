import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma'
import { CourseResolver, LanguageResolver, LessonResolver, PaginatedItemsResolver } from './resolvers'
import { CourseService, LessonService, UniqueHelper } from './services'

@Module({
  imports: [PrismaModule],
  providers: [
    CourseService,
    CourseResolver,
    LanguageResolver,
    LessonResolver,
    PaginatedItemsResolver,
    UniqueHelper,
    LessonService,
  ],
})
export class CourseModule {}
