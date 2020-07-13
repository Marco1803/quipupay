import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarganominaComponent } from './carganomina.component';

describe('CarganominaComponent', () => {
  let component: CarganominaComponent;
  let fixture: ComponentFixture<CarganominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarganominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarganominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
