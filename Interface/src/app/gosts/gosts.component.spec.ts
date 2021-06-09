import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GostsComponent } from './gosts.component';

describe('GostsComponent', () => {
  let component: GostsComponent;
  let fixture: ComponentFixture<GostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
