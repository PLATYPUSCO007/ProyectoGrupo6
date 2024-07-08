import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoresPageComponent } from './tutores-page.component';

describe('TutoresPageComponent', () => {
  let component: TutoresPageComponent;
  let fixture: ComponentFixture<TutoresPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutoresPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutoresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
