import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupTeamsComponent } from './signup-teams.component';

describe('SignupTeamsComponent', () => {
  let component: SignupTeamsComponent;
  let fixture: ComponentFixture<SignupTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
