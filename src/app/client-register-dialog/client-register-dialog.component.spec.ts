import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRegisterDialogComponent } from './client-register-dialog.component';

describe('ClientRegisterDialogComponent', () => {
  let component: ClientRegisterDialogComponent;
  let fixture: ComponentFixture<ClientRegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientRegisterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
