import { Module } from '@nestjs/common'
import { GqlThrottlerGuard } from './gql-throttle.guard'

@Module({
  providers: [GqlThrottlerGuard],
  exports: [GqlThrottlerGuard],
})
export class GQLModule {}
