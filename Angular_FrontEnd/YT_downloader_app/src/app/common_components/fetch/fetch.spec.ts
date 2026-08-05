import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fetch } from './fetch';

describe('Fetch', () => {
  let component: Fetch;
  let fixture: ComponentFixture<Fetch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fetch],
    }).compileComponents();

    fixture = TestBed.createComponent(Fetch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
