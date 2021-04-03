import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { AddLanguageInput } from './add-language.dto'

@InputType()
export class UpdateLanguageInput extends PartialType(AddLanguageInput) {
  @Field(() => ID)
  id: string
}
