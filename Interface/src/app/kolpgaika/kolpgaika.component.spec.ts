import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KolpgaikaComponent } from './kolpgaika.component';

describe('KolpgaikaComponent', () => {
  let component: KolpgaikaComponent;
  let fixture: ComponentFixture<KolpgaikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KolpgaikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KolpgaikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
