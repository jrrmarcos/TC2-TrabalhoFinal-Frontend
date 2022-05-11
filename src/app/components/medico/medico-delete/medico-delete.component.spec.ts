import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoDeleteComponent } from './medico-delete.component';

describe('MedicoDeleteComponent', () => {
  let component: MedicoDeleteComponent;
  let fixture: ComponentFixture<MedicoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
