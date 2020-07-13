import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNominaComponent } from './detalle-nomina.component';

describe('DetalleNominaComponent', () => {
  let component: DetalleNominaComponent;
  let fixture: ComponentFixture<DetalleNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
