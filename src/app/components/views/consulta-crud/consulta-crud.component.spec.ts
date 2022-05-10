import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCrudComponent } from './consulta-crud.component';

describe('ConsultaCrudComponent', () => {
  let component: ConsultaCrudComponent;
  let fixture: ComponentFixture<ConsultaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
