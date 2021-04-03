import { Field, InputType, Int } from '@nestjs/graphql'
import { IsOptional, Min } from 'class-validator'

@InputType()
export class CursorPaginationArgs {
  @Field(() => Number, { defaultValue: -1, nullable: true })
  @IsOptional()
  cursor?: number

  @Field(() => Int, { defaultValue: 10, nullable: true })
  @Min(1)
  @IsOptional()
  limit?: number
}
