import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Language model' })
export class Language {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  nativeName?: string

  @Field(() => String, { nullable: true })
  fullname?: string

  @Field(() => String, { nullable: true })
  flag?: string

  @Field(() => String, { nullable: true })
  shinyFlag?: string

  createdAt?: Date

  updatedAt?: Date
}
