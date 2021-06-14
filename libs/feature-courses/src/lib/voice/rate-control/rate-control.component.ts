import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'nx-apollo-angular-course-rate-control',
  templateUrl: './rate-control.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .volume {
        width: 300px;
      }

      .volume-label {
        width: 30px;
      }
    `,
  ],
})
export class RateControlComponent {
  @Input()
  voiceName: string

  @Output()
  saySentence = new EventEmitter<number>()

  min = 0
  max = 1
  step = 0.01
  volume = 1

  changeVolume(value: number) {
    this.volume = value
  }
}
