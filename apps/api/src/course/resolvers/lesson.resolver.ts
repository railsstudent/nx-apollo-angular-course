import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GqlThrottlerGuard } from '../../gql'
import { AddLessonInput, CursorPaginationArgs, UpdateLessonInput } from '../dto'
import { Lesson, PaginatedItems } from '../entities'
import { LessonService, SentenceService } from '../services'

@UseGuards(GqlThrottlerGuard)
@Resolver(() => Lesson)
export class LessonResolver {
  constructor(private lessonService: LessonService, private sentenceService: SentenceService) {}

  @Query(() => Lesson, { nullable: true })
  async getLesson(@Args('id', { defaultValue: '', type: () => String }) id?: string): Promise<Lesson | undefined> {
    return this.lessonService.getLesson(id)
  }

  @Mutation(() => Lesson)
  async addLesson(@Args('newLesson') input: AddLessonInput): Promise<Lesson> {
    return this.lessonService.addLesson(input)
  }

  @Mutation(() => Lesson)
  async updateLesson(@Args('updateLesson') input: UpdateLessonInput): Promise<Lesson> {
    return this.lessonService.updateLesson(input)
  }

  @ResolveField()
  async paginatedSentences(
    @Parent() lesson: Lesson,
    @Args('args') args: CursorPaginationArgs,
  ): Promise<PaginatedItems> {
    const lessonId = lesson?.id || ''
    return this.sentenceService.getPaginatedSentences({ ...args, lessonId })
  }
}
