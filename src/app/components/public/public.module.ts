import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './public.routes';
import { StaticModule } from '../static/static.module';
import { AngularMaterialModule } from '../../angular-material.module';
import { ParticlesModule } from 'angular-particle';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    StaticModule,
    AngularMaterialModule,
    ParticlesModule
  ]
})
export class PublicModule { }
