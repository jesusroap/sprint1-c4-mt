import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Base';
  numero:number = 0;

  aumentar():void {
    this.numero = this.numero + 1;
  }

  decrementar():void {
    this.numero = this.numero - 1;
  }

  sumar(numero1:any, numero2:any):void {
    this.numero = numero1 + numero2;
  }
}
