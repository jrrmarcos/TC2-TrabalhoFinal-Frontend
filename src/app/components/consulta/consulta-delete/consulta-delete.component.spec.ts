import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDeleteComponent } from './consulta-delete.component';

describe('ConsultaDeleteComponent', () => {
  let component: ConsultaDeleteComponent;
  let fixture: ComponentFixture<ConsultaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
