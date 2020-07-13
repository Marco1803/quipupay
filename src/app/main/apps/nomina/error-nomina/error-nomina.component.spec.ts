import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNominaComponent } from './error-nomina.component';

describe('ErrorNominaComponent', () => {
  let component: ErrorNominaComponent;
  let fixture: ComponentFixture<ErrorNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
