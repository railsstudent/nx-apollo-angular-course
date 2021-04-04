import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { DeletedSentence } from './../entities'
import { SentenceService } from '../services'

@Resolver(() => DeletedSentence)
export class DeletedSentenceResolver {
  constructor(private sentenceService: SentenceService) {}

  @Mutation(() => DeletedSentence)
  async deleteSentence(@Args('id') sentenceId: string): Promise<DeletedSentence> {
    return this.sentenceService.deleteSentence(sentenceId)
  }
}
