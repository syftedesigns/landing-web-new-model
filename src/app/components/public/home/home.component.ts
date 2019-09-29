import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SuscriberComponent } from '../../static/dialog/suscriber/suscriber.component';
import { ThankPageComponent } from '../../static/dialog/thank-page/thank-page.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  SuscriberDialog(): void {
    const dialgoRef = this.dialog.open(SuscriberComponent, {
      disableClose: true,
      width: '100%',
      maxWidth: '100vw !important',
      minHeight: '100vh',
      autoFocus: false,
    });
    dialgoRef.afterClosed().subscribe(
      (data) => {
        if (data.role === 'suscribed') {
          this.ThankDialog();
        }
      }
    );
  }
  ThankDialog(): void {
    const dialgoRef = this.dialog.open(ThankPageComponent, {
      disableClose: true,
      width: '100%',
      maxWidth: '100vw !important',
      minHeight: '100vh',
      autoFocus: false,
    });
  }
}
