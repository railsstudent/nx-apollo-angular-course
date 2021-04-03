import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { CourseModule } from '../course'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
      sortSchema: true,
      include: [CourseModule],
      formatError: (err) => {
        console.log(err)
        return err
      },
    }),
    CourseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
