import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEventRolComponent } from './modal-event-rol.component';

describe('ModalEventRolComponent', () => {
  let component: ModalEventRolComponent;
  let fixture: ComponentFixture<ModalEventRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEventRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEventRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
