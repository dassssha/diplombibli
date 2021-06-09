import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProrezngaikaComponent } from './prorezngaika.component';

describe('ProrezngaikaComponent', () => {
  let component: ProrezngaikaComponent;
  let fixture: ComponentFixture<ProrezngaikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProrezngaikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProrezngaikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
