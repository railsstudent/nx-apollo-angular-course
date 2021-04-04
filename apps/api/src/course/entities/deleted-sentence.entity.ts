import { Field, ObjectType } from '@nestjs/graphql'
import { Sentence } from './sentence.entity'
import { Translation } from './translation.entity'

@ObjectType({ description: 'Deleted sentence model' })
export class DeletedSentence {
  @Field(() => Sentence, { nullable: true })
  sentence?: Sentence

  @Field(() => [Translation], { nullable: true })
  translations?: Translation[]
}
