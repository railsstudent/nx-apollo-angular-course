import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GqlThrottlerGuard } from '@nx-apollo-angular-course/gql'
import { DeletedSentence } from '../entities'
import { SentenceService } from '../services'

@UseGuards(GqlThrottlerGuard)
@Resolver(() => DeletedSentence)
export class DeletedSentenceResolver {
  constructor(private sentenceService: SentenceService) {}

  @Mutation(() => DeletedSentence)
  async deleteSentence(@Args('id') sentenceId: string): Promise<DeletedSentence> {
    return this.sentenceService.deleteSentence(sentenceId)
  }
}
