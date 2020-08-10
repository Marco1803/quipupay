import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendconfirmationComponent } from './resendconfirmation.component';

describe('ResendconfirmationComponent', () => {
  let component: ResendconfirmationComponent;
  let fixture: ComponentFixture<ResendconfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendconfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
