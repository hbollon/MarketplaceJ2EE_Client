import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductDialogComponent } from './sell-product-dialog.component';

describe('SellProductDialogComponent', () => {
  let component: SellProductDialogComponent;
  let fixture: ComponentFixture<SellProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellProductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
