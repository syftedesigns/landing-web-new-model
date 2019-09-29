import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-suscriber',
  templateUrl: './suscriber.component.html',
  styles: []
})
export class SuscriberComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuscriberComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
