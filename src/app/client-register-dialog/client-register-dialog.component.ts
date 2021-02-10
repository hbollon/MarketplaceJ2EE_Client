import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/models/client.model'

@Component({
  selector: 'app-client-register-dialog',
  templateUrl: './client-register-dialog.component.html',
  styleUrls: ['./client-register-dialog.component.scss']
})
export class ClientRegisterDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClientRegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
  ngOnInit(): void {
  }

}
