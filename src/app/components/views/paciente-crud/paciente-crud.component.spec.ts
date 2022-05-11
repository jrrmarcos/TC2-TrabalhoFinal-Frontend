import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteCrudComponent } from './paciente-crud.component';

describe('PacienteCrudComponent', () => {
  let component: PacienteCrudComponent;
  let fixture: ComponentFixture<PacienteCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
