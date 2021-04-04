import { Field, ObjectType } from '@nestjs/graphql'
import { Course } from './course.entity'
import { Lesson } from './lesson.entity'
import { Sentence } from './sentence.entity'

@ObjectType({ description: 'Cursor-based pagination of courses/lessons/sentences' })
export class PaginatedItems {
  @Field(() => Number, { nullable: true })
  cursor?: number

  @Field(() => [Course], { nullable: true })
  courses?: Course[]

  @Field(() => [Sentence], { nullable: true })
  sentences?: Sentence[]

  @Field(() => [Lesson], { nullable: true })
  lessons?: Lesson[]
}
