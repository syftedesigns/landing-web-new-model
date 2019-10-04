import { Component, OnInit } from '@angular/core';
declare function WhatsAppContact();

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  BtnWsTriggered: boolean = false; // El cliente no ha pulsado click en ningún boton de whats app

  constructor() { }

  ngOnInit() {
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
