import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SuscriberComponent } from '../../static/dialog/suscriber/suscriber.component';
import { ThankPageComponent } from '../../static/dialog/thank-page/thank-page.component';
import { ParticleStyle, ParticleConfigMobile, ParticleConfigDesktop } from 'src/app/settings/particles.config';
// Facebook.js script file with Fb Track functions
declare function ViewContent();
declare function WhatsAppContact();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Device: any;
  public ParticleStyle: object = {};
  public particles: object | any = {};
  IsPageTracked: boolean = false; // La pagina por defecto no ha sido trackeada, es decir el cliente no ha leido
  BtnWsTriggered: boolean = false; // El cliente no ha pulsado click en ningún boton de whats app
  /*
  Determinamos si hace scrolling al final de una pagina
  para saber si es un cliente potencial, ya que vio todo nuestro contenido
  */
  @HostListener('window:scroll', ['$event']) onScroll(event) {
    // Determinamos si el cliente llego a leer un 80% de la pagina
    if (window.pageYOffset >= document.getElementById('track-fb').offsetTop) {
      // Si no ha disparado el evento antes
      if (!this.IsPageTracked) {
        // Lanzamos el fb pixel
        this.IsPageTracked = true;
        ViewContent(); // Se dispara la función de fb, que trackea la pagina, siendo un cliente potencial
        console.log('Tracking started');
      } else {
        console.log('ya ha sido trackeado');
        return;
      }
    }
  }
  constructor(public dialog: MatDialog, private DOM: ElementRef) { }

  ngOnInit() {
    if (window.innerWidth <= 480) {
      this.ParticleStyle = ParticleStyle;
      this.particles = ParticleConfigMobile;
    } else {
      this.ParticleStyle = ParticleStyle;
      this.particles = ParticleConfigDesktop;
    }
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
  FbPixelBtnWsTrack(): void {
    if (this.BtnWsTriggered) {
      console.log('Ya ha pulsado el botón de whats app, no necesitamos volver a trackear');
      return;
    } else {
      WhatsAppContact(); // Inicia el tracking de Contact en FB pixel
      this.BtnWsTriggered = true;
    }
  }
}
