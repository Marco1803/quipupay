import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarNominaComponent } from './aprobar-nomina.component';

describe('AprobarNominaComponent', () => {
  let component: AprobarNominaComponent;
  let fixture: ComponentFixture<AprobarNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
