import { ComponentFixture, TestBed } from '@angular/core/testing';
import { habit-logPage } from './habit-log.page';

describe('habit-logPage', () => {
  let component: habit-logPage;
  let fixture: ComponentFixture<habit-logPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(habit-logPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
