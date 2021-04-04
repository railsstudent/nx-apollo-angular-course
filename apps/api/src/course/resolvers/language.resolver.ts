import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AddLanguageInput, UpdateLanguageInput } from '../dto'
import { Language } from '../entities'
import { TranslationService } from '../services'

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private translationService: TranslationService) {}

  @Query(() => [Language])
  async getLanguages(): Promise<Language[]> {
    return this.translationService.getLanguages()
  }

  @Mutation(() => Language)
  async addLanguage(@Args('newLanguage') input: AddLanguageInput): Promise<Language> {
    return this.translationService.addLanguage(input)
  }

  @Mutation(() => Language)
  async updateLanguage(@Args('updateLanguage') input: UpdateLanguageInput): Promise<Language> {
    return this.translationService.updateLanguage(input)
  }

  @ResolveField(() => String)
  async fullname(@Parent() language: Language): Promise<string> {
    return `${language.name} (${language.nativeName})`
  }
}
