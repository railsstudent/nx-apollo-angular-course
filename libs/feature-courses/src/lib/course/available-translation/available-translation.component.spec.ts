import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AvailableTranslationComponent } from './available-translation.component'

describe('AvailableTranslationComponent', () => {
  let component: AvailableTranslationComponent
  let fixture: ComponentFixture<AvailableTranslationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailableTranslationComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableTranslationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
