import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuscriberComponent } from './dialog/suscriber/suscriber.component';
import { FormsModule } from '@angular/forms';
import { ThankPageComponent } from './dialog/thank-page/thank-page.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { FooterComponent } from './footer/footer.component';
import { CountsComponent } from './counts/counts.component';


@NgModule({
  declarations: [
    SuscriberComponent,
    ThankPageComponent,
    FooterComponent,
    CountsComponent
  ],
  entryComponents: [
    SuscriberComponent,
    ThankPageComponent
  ],
  exports: [
    SuscriberComponent,
    ThankPageComponent,
    FooterComponent,
    CountsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ]
})
export class StaticModule { }
