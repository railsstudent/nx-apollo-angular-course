import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Course } from './course.entity'
import { PaginatedItems } from './paginated-items.entity'
import { Sentence } from './sentence.entity'

@ObjectType({ description: 'Lesson model' })
export class Lesson {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  name?: string

  createdAt?: Date

  updatedAt?: Date

  @Field(() => Course, { nullable: true })
  course?: Course

  @Field(() => [Sentence], { nullable: true })
  sentences?: Sentence[]

  @Field(() => PaginatedItems, { nullable: true })
  paginatedSentences?: PaginatedItems
}
