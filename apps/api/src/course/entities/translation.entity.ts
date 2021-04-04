import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Language } from './language.entity'
import { Sentence } from './sentence.entity'

@ObjectType({ description: 'Translation model' })
export class Translation {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  text?: string

  createdAt?: Date

  updatedAt?: Date

  @Field(() => Language, { nullable: true })
  language?: Language

  @Field(() => Sentence, { nullable: true })
  sentence?: Sentence
}
