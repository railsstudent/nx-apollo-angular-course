import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma'
import { CourseResolver, LanguageResolver, LessonResolver, PaginatedItemsResolver } from './resolvers'
import { CourseService, LessonService, SentenceService, TranslationService, UniqueHelper } from './services'

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
    SentenceService,
    TranslationService,
  ],
})
export class CourseModule {}
