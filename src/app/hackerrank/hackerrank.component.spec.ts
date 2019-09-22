import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackerrankComponent } from './hackerrank.component';

describe('HackerrankComponent', () => {
  let component: HackerrankComponent;
  let fixture: ComponentFixture<HackerrankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackerrankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackerrankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
