import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AddLessonInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  courseId: string
}
