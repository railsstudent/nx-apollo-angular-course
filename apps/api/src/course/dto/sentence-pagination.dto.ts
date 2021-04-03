import { ArgsType, Field } from '@nestjs/graphql'
import { CursorPaginationArgs } from './cursor-pagination.dto'

@ArgsType()
export class GetSentenceArgs extends CursorPaginationArgs {
  @Field({ nullable: true })
  lessonId: string
}
