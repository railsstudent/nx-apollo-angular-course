import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateControlComponent } from './rate-control/rate-control.component';

@NgModule({
  declarations: [
    RateControlComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RateControlComponent
  ]
})
export class VoiceModule { }
