import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { AddSentenceInput } from './add-sentence.dto'

@InputType()
export class UpdateSentenceInput extends PartialType(AddSentenceInput) {
  @Field(() => ID)
  id: string
}
