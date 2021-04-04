import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Language } from './language.entity'
import { Lesson } from './lesson.entity'
import { Translation } from './translation.entity'

@ObjectType({ description: 'Sentence model' })
export class Sentence {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  text?: string

  createdAt?: Date

  updatedAt?: Date

  @Field(() => Lesson, { nullable: true })
  lesson?: Lesson

  @Field(() => [Translation], { nullable: true })
  translations?: Translation[]

  @Field(() => [Language], { nullable: true })
  availableTranslations?: Language[]
}
