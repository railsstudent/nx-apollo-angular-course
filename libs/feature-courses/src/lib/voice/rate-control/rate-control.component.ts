import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nx-apollo-angular-course-rate-control',
  templateUrl: './rate-control.component.html',
  styles: [`
    :host {
      display: block;
    }

    .volume {
      width: 250px;
    }
  `]
})
export class RateControlComponent implements OnInit {

  @Input()
  voiceName: string

  @Output()
  saySentence = new EventEmitter<number>()

  min = 0
  max = 1
  step = 0.01
  volume = 1

  constructor() { }

  ngOnInit(): void {}

  changeVolume(value: number) {
    this.volume = value
  }
}
