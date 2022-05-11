import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoCrudComponent } from './medico-crud.component';

describe('MedicoCrudComponent', () => {
  let component: MedicoCrudComponent;
  let fixture: ComponentFixture<MedicoCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
