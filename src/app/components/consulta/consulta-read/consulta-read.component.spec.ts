import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaReadComponent } from './consulta-read.component';

describe('ConsultaReadComponent', () => {
  let component: ConsultaReadComponent;
  let fixture: ComponentFixture<ConsultaReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
