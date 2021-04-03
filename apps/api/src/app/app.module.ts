import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // include: [CourseModule],
      formatError: (err) => {
        console.log(err)
        return err
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
