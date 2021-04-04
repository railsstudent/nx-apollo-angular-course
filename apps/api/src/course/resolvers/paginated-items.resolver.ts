import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CursorPaginationArgs } from '../dto'
import { PaginatedItems } from '../entities'
import { CourseService, LessonService, SentenceService } from '../services'

@Resolver(() => PaginatedItems)
export class PaginatedItemsResolver {
  constructor(
    private courseService: CourseService,
    private lessonService: LessonService,
    private sentenceService: SentenceService,
  ) {}

  @Query(() => PaginatedItems, { nullable: true })
  async courses(@Args('args') args: CursorPaginationArgs): Promise<PaginatedItems> {
    return this.courseService.getCourses(args)
  }

  @Mutation(() => PaginatedItems)
  async nextLessons(
    @Args('courseId') courseId: string,
    @Args('args') args: CursorPaginationArgs,
  ): Promise<PaginatedItems> {
    return this.lessonService.getPaginatedLessons({ ...args, courseId })
  }

  @Mutation(() => PaginatedItems)
  async nextSentences(
    @Args('lessonId') lessonId: string,
    @Args('args') args: CursorPaginationArgs,
  ): Promise<PaginatedItems> {
    return this.sentenceService.getPaginatedSentences({ ...args, lessonId })
  }
}
