import { Language } from '../src/course/entities'
import { PrismaClient } from '@prisma/client'
import { GreetingSentences } from './greeting'
import {
  AvailableLanguages,
} from './samples'
import { SentenceTranslation } from './types'
import { GenderSentences } from './gender'
import { IntroSentences } from './intro'
import { ActivitySentences } from './activity'
import { DescriptionSentences } from './description'
import { ProfessionSentences } from './profession'
import { PlacesOfWorkSentences } from './places-of-work'
import { PrepositionSentences } from './preposition'

const prisma = new PrismaClient()

const insertSentences = async (sentences: SentenceTranslation[], lessonId: string, newLanguages: Language[]) => {
  for (const sentence of sentences) {
    const newSentence = await prisma.sentence.create({
      data: {
        text: sentence.text,
        lessonId,
      },
    })

    const translations = sentence.translations.map((translation) => {
      const { id: languageId } = newLanguages.find((lang) => lang.name === translation.lang)
      return {
        text: translation.text,
        languageId,
        sentenceId: newSentence.id,
      }
    })

    await prisma.translation.createMany({
      data: translations,
    })
  }
}

async function main() {
  console.log('Delete all records')
  await prisma.translation.deleteMany()
  await prisma.sentence.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.course.deleteMany()
  await prisma.language.deleteMany()

  console.log('Insert languages - start')
  const newLanguages: Language[] = []
  for (const language of AvailableLanguages) {
    const newLanguage = await prisma.language.create({
      data: {
        ...language,
      },
    })
    newLanguages.push(newLanguage)
  }
  console.log('Insert languages - done')

  console.log('Insert courses - start')
  const spanish = newLanguages.find((lang) => lang.name === 'Spanish')
  const spanishCourse = await prisma.course.create({
    data: {
      name: 'Spanish 101',
      description: 'First Spanish course for beginners',
      languageId: spanish.id,
    },
  })

  const spanishCourse2 = await prisma.course.create({
    data: {
      name: 'Spanish 102',
      description: 'Second Spanish course for beginners',
      languageId: spanish.id,
    },
  })

  const courses = [
    {
      name: 'Spanish 201',
      description: 'Level 2 Spanish course A',
      languageId: spanish.id,
    },
    {
      name: 'Spanish 202',
      description: 'Level 2 Spanish course B',
      languageId: spanish.id,
    },
    {
      name: 'Spanish 301',
      description: 'Level 3 Spanish course A',
      languageId: spanish.id,
    },
    {
      name: 'Spanish 302',
      description: 'Level 3 Spanish course B',
      languageId: spanish.id,
    },
    {
      name: 'Spanish 401',
      description: 'Level 4 Spanish course A',
      languageId: spanish.id,
    },
    {
      name: 'Spanish 402',
      description: 'Level 4 Spanish course B',
      languageId: spanish.id,
    },
  ]

  for (const lang of courses) {
    await prisma.course.create({ data: lang })
  }
  console.log('Insert courses - done')

  console.log('Insert lessons - start')
  const createLessonPromises = []
  const lessons = [
    'Greeting',
    'Gender',
    'Introduction',
    'Phrase',
    'School',
    'Shopping 1',
    'People 1',
    'Activity',
    'Description of persons',
    'Professions',
    'Places and stores of professions',
    'Preposition of place',
    'Task',
  ]

  const spanishLevel1LastLessonIdx = 6
  for (let index = 0; index < lessons.length; index++) {
    createLessonPromises.push(
      await prisma.lesson.create({
        data: {
          name: lessons[index],
          courseId: index <= spanishLevel1LastLessonIdx ? spanishCourse.id : spanishCourse2.id,
        },
      }),
    )
  }

  const resolvedLessons = await Promise.all(createLessonPromises)
  const [
    introductionLesson,
    genderLesson,
    introLesson,
    unused1,
    unused2,
    unused3,
    unused4,
    activityLesson,
    descriptionLesson,
    professionalLesson,
    placesOfWorkLesson,
    prepositionPlaceLesson,
  ] = resolvedLessons
  console.log(unused1, unused2, unused3, unused4)
  console.log('Insert lessons - done')

  console.log('Insert sentences - start')
  const createSentences = [
    insertSentences(GreetingSentences, introductionLesson.id, newLanguages),
    insertSentences(GenderSentences, genderLesson.id, newLanguages),
    insertSentences(IntroSentences, introLesson.id, newLanguages),
    insertSentences(ActivitySentences, activityLesson.id, newLanguages),
    insertSentences(DescriptionSentences, descriptionLesson.id, newLanguages),
    insertSentences(ProfessionSentences, professionalLesson.id, newLanguages),
    insertSentences(PlacesOfWorkSentences, placesOfWorkLesson.id, newLanguages),
    insertSentences(PrepositionSentences, prepositionPlaceLesson.id, newLanguages),
  ]
  await Promise.all(createSentences)
  console.log('Insert sentences - end')
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
