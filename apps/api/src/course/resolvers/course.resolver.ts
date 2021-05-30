import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GqlThrottlerGuard } from '@nx-apollo-angular-course/gql'
import { UpdateCourseInput, AddCourseInput, CursorPaginationArgs } from '../dto'
import { Course, PaginatedItems } from '../entities'
import { CourseService, LessonService } from '../services'

@UseGuards(GqlThrottlerGuard)
@Resolver(() => Course)
export class CourseResolver {
  constructor(private courseService: CourseService, private lessonService: LessonService) {}

  @Query(() => Course, { nullable: true })
  async course(@Args('id', { defaultValue: '', type: () => String }) id?: string): Promise<Course | undefined> {
    return this.courseService.getCourse(id)
  }

  @Mutation(() => Course)
  async addCourse(@Args('newCourse') input: AddCourseInput): Promise<Course> {
    return this.courseService.addCourse(input)
  }

  @Mutation(() => Course)
  async updateCourse(@Args('updateCourse') input: UpdateCourseInput): Promise<Course> {
    return this.courseService.updateCourse(input)
  }

  @ResolveField()
  async paginatedLessons(@Parent() course: Course, @Args('args') args: CursorPaginationArgs): Promise<PaginatedItems> {
    const { id: courseId } = course
    return this.lessonService.getPaginatedLessons({ ...args, courseId })
  }
}
