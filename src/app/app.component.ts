import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  constructor(private Render: Renderer2) {
    this.Render.addClass(document.body, 'page--enterprise-ecommerce');
  }
}

