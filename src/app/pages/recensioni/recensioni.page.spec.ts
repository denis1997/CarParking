import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecensioniPage } from './recensioni.page';

describe('RecensioniPage', () => {
  let component: RecensioniPage;
  let fixture: ComponentFixture<RecensioniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecensioniPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecensioniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
