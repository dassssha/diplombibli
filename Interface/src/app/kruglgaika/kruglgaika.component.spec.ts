import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KruglgaikaComponent } from './kruglgaika.component';

describe('KruglgaikaComponent', () => {
  let component: KruglgaikaComponent;
  let fixture: ComponentFixture<KruglgaikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KruglgaikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KruglgaikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
