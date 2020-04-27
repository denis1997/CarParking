import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaParcheggiPage } from './lista-parcheggi.page';

describe('ListaParcheggiPage', () => {
  let component: ListaParcheggiPage;
  let fixture: ComponentFixture<ListaParcheggiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaParcheggiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaParcheggiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
