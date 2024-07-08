import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCodeComponent } from './active-code.component';

describe('ActiveCodeComponent', () => {
  let component: ActiveCodeComponent;
  let fixture: ComponentFixture<ActiveCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
