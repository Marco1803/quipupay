import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEventRolMenuComponent } from './modal-event-rol-menu.component';

describe('ModalEventRolMenuComponent', () => {
  let component: ModalEventRolMenuComponent;
  let fixture: ComponentFixture<ModalEventRolMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEventRolMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEventRolMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
