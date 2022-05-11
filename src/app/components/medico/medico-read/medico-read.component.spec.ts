import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoReadComponent } from './medico-read.component';

describe('MedicoReadComponent', () => {
  let component: MedicoReadComponent;
  let fixture: ComponentFixture<MedicoReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
