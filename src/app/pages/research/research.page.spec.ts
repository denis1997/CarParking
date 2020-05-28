import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchPage } from './research.page';

describe('ResearchPage', () => {
  let component: ResearchPage;
  let fixture: ComponentFixture<ResearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
