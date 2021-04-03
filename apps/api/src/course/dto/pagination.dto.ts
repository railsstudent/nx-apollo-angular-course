import { Field, InputType, Int } from '@nestjs/graphql'
import { IsOptional, Min } from 'class-validator'

@InputType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0, nullable: true })
  @Min(0)
  @IsOptional()
  offset?: number

  @Field(() => Int, { defaultValue: 10, nullable: true })
  @Min(1)
  @IsOptional()
  limit?: number
}
