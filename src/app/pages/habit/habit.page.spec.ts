import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitPage } from './habit.page';

describe('HabitPage', () => {
  let component: HabitPage;
  let fixture: ComponentFixture<HabitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
