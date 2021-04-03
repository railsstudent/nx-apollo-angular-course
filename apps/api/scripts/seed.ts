import { PrismaClient } from '@prisma/client' 
import { Language } from '../src/course/entities/language.entity';
import { SentenceTranslation, GreetingSentences, GenderSentences, IntroSentences, AvailableLanguages, ActivitySentences, DescriptionSentences } from './samples';
const prisma = new PrismaClient()

const insertSentences = async (sentences: SentenceTranslation[], lessonId: string, newLanguages: any[]) => {
  for (const sentence of sentences) {
    const newSentence = await prisma.sentence.create({
        data: {
          text: sentence.text,
          lessonId,
        }
    })

    const translations = sentence.translations.map(translation => {
      const { id: languageId } = newLanguages.find(lang => lang.name === translation.lang)
      return {
        text: translation.text,
        languageId,
        sentenceId: newSentence.id,
      }
    })

    await prisma.translation.createMany({
      data: translations
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
          name: language.name,
          nativeName: language.nativeName,
        }
      })
      newLanguages.push(newLanguage)
  }
  console.log('Insert languages - done')

  console.log('Insert courses - start')
  const spanish = newLanguages.find(lang => lang.name === 'Spanish')
  const spanishCourse = await prisma.course.create({
      data: {
        name: 'Spanish 101',
        description: 'First Spanish course for beginners',
        languageId: spanish.id
      }
  })

  const spanishCourse2 = await prisma.course.create({
    data: {
        name: 'Spanish 102',
        description: 'Second Spanish course for beginners',
        languageId: spanish.id
    }
  })

  const courses = [
    {
      name: 'Spanish 201',
      description: 'Level 2 Spanish course A',
      languageId: spanish.id
    },
    {
      name: 'Spanish 202',
      description: 'Level 2 Spanish course B',
      languageId: spanish.id
    },
    {
      name: 'Spanish 301',
      description: 'Level 3 Spanish course A',
      languageId: spanish.id
    },
    {
      name: 'Spanish 302',
      description: 'Level 3 Spanish course B',
      languageId: spanish.id
    },
    {
      name: 'Spanish 401',
      description: 'Level 4 Spanish course A',
      languageId: spanish.id
    },
    {
      name: 'Spanish 402',
      description: 'Level 4 Spanish course B',
      languageId: spanish.id
    }
  ]

  for (const lang of courses) {
    await prisma.course.create({ data: lang })
  }
  console.log('Insert courses - done')

  console.log('Insert lessons - start')
  const createLessonPromises = [];
  const lessons = ['Greeting', 'Gender', 'Introduction', 'Phrase', 'School', 
  'Shopping 1', 'People 1', 'Activity', 'Description of persons', 'Professon',
  'People 2', 'Shopping 2', 'Task',];
  for (let index = 0; index < lessons.length; index++) {
    createLessonPromises.push(await prisma.lesson.create({
      data: {
        name: lessons[index],
        courseId: index < 7 ? spanishCourse.id : spanishCourse2.id    
      }
    }))
  }

  const resolvedLessons = await Promise.all(createLessonPromises)
  const [
    introductionLesson, 
    genderLesson, 
    introLesson,
    unused1, unused2, unused3, unuse4,
    activityLesson, 
    descriptionLesson
  ] = resolvedLessons
  console.log('Insert lessons - done')

  console.log('Insert sentences - start')
  await insertSentences(GreetingSentences, introductionLesson.id, newLanguages)
  await insertSentences(GenderSentences, genderLesson.id, newLanguages)
  await insertSentences(IntroSentences, introLesson.id, newLanguages)
  await insertSentences(ActivitySentences, activityLesson.id, newLanguages)
  await insertSentences(DescriptionSentences, descriptionLesson.id, newLanguages)
  console.log('Insert sentences - end')
}

main()
    .catch(e => { 
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })