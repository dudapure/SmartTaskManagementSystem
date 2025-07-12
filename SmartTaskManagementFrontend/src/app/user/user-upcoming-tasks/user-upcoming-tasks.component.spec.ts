import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpcomingTasksComponent } from './user-upcoming-tasks.component';

describe('UserUpcomingTasksComponent', () => {
  let component: UserUpcomingTasksComponent;
  let fixture: ComponentFixture<UserUpcomingTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserUpcomingTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpcomingTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
