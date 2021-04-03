import { ArgsType, Field } from '@nestjs/graphql'
import { CursorPaginationArgs } from './cursor-pagination.dto'

@ArgsType()
export class GetLessonArgs extends CursorPaginationArgs {
  @Field({ nullable: true })
  courseId: string
}
