import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlThrottlerGuard } from '@nx-apollo-angular-course/gql'
import { AddTranslationInput } from '../dto'
import { Sentence, Translation } from '../entities'
import { TranslationService } from '../services'

@UseGuards(GqlThrottlerGuard)
@Resolver(() => Sentence)
export class TranslationResolver {
  constructor(private translationService: TranslationService) {}

  @Query(() => Translation, { nullable: true })
  async getTranslation(
    @Args('sentenceId') sentenceId: string,
    @Args('languageId') languageId: string,
  ): Promise<Translation> {
    return this.translationService.getTranslation(sentenceId, languageId)
  }

  @Mutation(() => Translation)
  async addTranslation(@Args('newTranslation') input: AddTranslationInput): Promise<Translation> {
    return this.translationService.addTranslation(input)
  }

  @Mutation(() => Translation)
  async deleteTranslation(@Args('id') translationId: string): Promise<Translation> {
    return this.translationService.deleteTranslation(translationId)
  }
}
