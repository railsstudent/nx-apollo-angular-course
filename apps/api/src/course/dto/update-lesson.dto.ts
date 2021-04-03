import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { AddLessonInput } from './add-lesson.dto'

@InputType()
export class UpdateLessonInput extends PartialType(AddLessonInput) {
  @Field(() => ID)
  id: string
}
