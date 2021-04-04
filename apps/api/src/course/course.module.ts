import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma'
import {
  CourseResolver,
  LanguageResolver,
  LessonResolver,
  PaginatedItemsResolver,
  DeletedSentenceResolver,
  TranslationResolver,
  SentenceResolver,
} from './resolvers'
import { CourseService, LessonService, SentenceService, TranslationService, UniqueHelper } from './services'

@Module({
  imports: [PrismaModule],
  providers: [
    CourseService,
    CourseResolver,
    LanguageResolver,
    LessonResolver,
    PaginatedItemsResolver,
    DeletedSentenceResolver,
    SentenceResolver,
    TranslationResolver,
    UniqueHelper,
    LessonService,
    SentenceService,
    TranslationService,
  ],
})
export class CourseModule {}
