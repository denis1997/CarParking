import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaRecensionePage } from './crea-recensione.page';

describe('CreaRecensionePage', () => {
  let component: CreaRecensionePage;
  let fixture: ComponentFixture<CreaRecensionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaRecensionePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaRecensionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
