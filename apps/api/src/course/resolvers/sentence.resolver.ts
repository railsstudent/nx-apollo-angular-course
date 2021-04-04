import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AddTranslationInput, AddSentenceInput, UpdateSentenceInput } from '../dto'
import { Language, Sentence, Translation } from '../entities'
import { SentenceService, TranslationService } from '../services'

@Resolver(() => Sentence)
export class SentenceResolver {
  constructor(
    private readonly sentenceService: SentenceService,
    private readonly translationService: TranslationService,
  ) {}

  @Query(() => Sentence)
  async getSentence(@Args('id', { defaultValue: '', type: () => String }) id: string): Promise<Sentence> {
    return await this.sentenceService.getSentence(id)
  }

  @Mutation(() => Sentence)
  async addSentence(@Args('newSentence') input: AddSentenceInput): Promise<Sentence> {
    return this.sentenceService.addSentence(input)
  }

  @Mutation(() => Sentence)
  async updateSentence(@Args('updateSentence') input: UpdateSentenceInput): Promise<Sentence> {
    return this.sentenceService.updateSentence(input)
  }

  @Mutation(() => Translation)
  async addTranslation(@Args('newTranslation') input: AddTranslationInput): Promise<Translation> {
    return this.translationService.addTranslation(input)
  }

  @ResolveField(() => [Translation])
  async translations(@Parent() sentence: Sentence): Promise<Translation[]> {
    return this.translationService.getTranslations(sentence?.id || '')
  }

  @ResolveField(() => [Language])
  async availableTranslations(@Parent() sentence: Sentence): Promise<Language[]> {
    return this.translationService.getAvailableTranslations(sentence?.id || '')
  }
}
