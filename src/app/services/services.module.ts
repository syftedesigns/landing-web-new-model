import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material.module';
import { MailchimpService } from './ads/mailchimp.service';
import { AuthService } from './auth/auth.service';
import { CampaignService } from './ads/campaign.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientJsonpModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  providers: [
    MailchimpService,
    AuthService,
    CampaignService
  ]
})
export class ServicesModule { }
