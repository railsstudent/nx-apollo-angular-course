import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AddSentenceInput, UpdateSentenceInput } from '../dto'
import { Language, Sentence } from '../entities'
import { SentenceService, TranslationService } from '../services'

@Resolver(() => Sentence)
export class SentenceResolver {
  constructor(
    private readonly sentenceService: SentenceService,
    private readonly translationService: TranslationService,
  ) {}

  @Query(() => Sentence, { nullable: true })
  async getSentence(@Args('id', { defaultValue: '', type: () => String }) id: string): Promise<Sentence> {
    return this.sentenceService.getSentence(id)
  }

  @Query(() => Number, { defaultValue: 0 })
  async getTotalSentences(@Args('lessonId', { defaultValue: '' }) lessonId: string): Promise<number> {
    return this.sentenceService.getTotalSentences(lessonId)
  }

  @Mutation(() => Sentence)
  async addSentence(@Args('newSentence') input: AddSentenceInput): Promise<Sentence> {
    return this.sentenceService.addSentence(input)
  }

  @Mutation(() => Sentence)
  async updateSentence(@Args('updateSentence') input: UpdateSentenceInput): Promise<Sentence> {
    return this.sentenceService.updateSentence(input)
  }

  @ResolveField(() => [Language])
  async availableTranslations(@Parent() sentence: Sentence): Promise<Language[]> {
    return this.translationService.getAvailableTranslations(sentence?.id || '')
  }
}
