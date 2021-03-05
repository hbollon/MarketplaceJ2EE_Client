import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from './../models/product.model';

@Component({
  selector: 'app-sell-product-dialog',
  templateUrl: './sell-product-dialog.component.html',
  styleUrls: ['./sell-product-dialog.component.scss']
})
export class SellProductDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SellProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) {
      this.data = new Product("", "", 0, 0.0, 0.0, 0.0, "")
    }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
  }

}
