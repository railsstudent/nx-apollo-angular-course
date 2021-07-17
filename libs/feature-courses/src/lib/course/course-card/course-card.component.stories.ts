import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { CourseCardComponent } from './course-card.component'
import { RouterTestingModule } from '@angular/router/testing'
import { course } from '../storybook'

export default {
  title: 'CourseCardComponent',
  component: CourseCardComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
} as Meta<CourseCardComponent>

const Template: Story<CourseCardComponent> = (args: CourseCardComponent) => ({
  component: CourseCardComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  course,
}

export const CourseWithFlag = Template.bind({})
CourseWithFlag.args = {
  course: {
    ...course,
    language: {
      ...course.language,
      flag: 'https://www.countryflags.io/es/flat/32.png',
    },
  },
}
