import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AddSentenceInput {
  @Field(() => String)
  text: string

  @Field(() => String)
  lessonId: string
}
