import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEventComComponent } from './modal-event-com.component';

describe('ModalEventComComponent', () => {
  let component: ModalEventComComponent;
  let fixture: ComponentFixture<ModalEventComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEventComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEventComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
