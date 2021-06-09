import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GostsbyrtComponent } from './gostsbyrt.component';

describe('GostsbyrtComponent', () => {
  let component: GostsbyrtComponent;
  let fixture: ComponentFixture<GostsbyrtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GostsbyrtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GostsbyrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
