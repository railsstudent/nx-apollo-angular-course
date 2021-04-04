import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Sentence, Translation } from '../entities'
import { TranslationService } from '../services'

@Resolver(() => Sentence)
export class TranslationResolver {
  constructor(private translationService: TranslationService) {}

  @Query(() => Translation)
  async getTranslation(
    @Args('sentenceId') sentenceId: string,
    @Args('languageId') languageId: string,
  ): Promise<Translation> {
    return this.translationService.getTranslation(sentenceId, languageId)
  }

  @Mutation(() => Translation)
  async deleteTranslation(@Args('id') translationId: string): Promise<Translation> {
    return this.translationService.deleteTranslation(translationId)
  }
}
