import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { AddCourseInput } from './add-course.dto'

@InputType()
export class UpdateCourseInput extends PartialType(AddCourseInput) {
  @Field(() => ID)
  id: string
}
