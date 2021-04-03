import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Language } from './language.entity'
import { Lesson } from './lesson.entity'
import { PaginatedItems } from './paginated-items.entity'

@ObjectType({ description: 'Course model' })
export class Course {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  description?: string

  createdAt?: Date

  updatedAt?: Date

  @Field(() => Language, { nullable: true })
  language?: Language

  @Field(() => [Lesson], { nullable: true })
  lessons?: Lesson[]

  @Field(() => PaginatedItems, { nullable: true })
  paginatedLessons?: PaginatedItems
}
