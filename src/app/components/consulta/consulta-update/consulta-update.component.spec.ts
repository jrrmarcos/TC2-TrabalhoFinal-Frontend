import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaUpdateComponent } from './consulta-update.component';

describe('ConsultaUpdateComponent', () => {
  let component: ConsultaUpdateComponent;
  let fixture: ComponentFixture<ConsultaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
