import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AddTranslationInput {
  @Field(() => String)
  text: string

  @Field(() => String)
  languageId: string

  @Field(() => String)
  sentenceId: string
}
