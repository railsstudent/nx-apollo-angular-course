import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddSentenceComponent } from './add-sentence.component'

describe('AddSentenceComponent', () => {
  let component: AddSentenceComponent
  let fixture: ComponentFixture<AddSentenceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSentenceComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSentenceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
