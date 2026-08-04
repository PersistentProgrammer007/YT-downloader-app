import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialTab } from './trial-tab';

describe('TrialTab', () => {
  let component: TrialTab;
  let fixture: ComponentFixture<TrialTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialTab],
    }).compileComponents();

    fixture = TestBed.createComponent(TrialTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
