import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchMyPositionPage } from './watch-my-position.page';

describe('WatchMyPositionPage', () => {
  let component: WatchMyPositionPage;
  let fixture: ComponentFixture<WatchMyPositionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchMyPositionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchMyPositionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
