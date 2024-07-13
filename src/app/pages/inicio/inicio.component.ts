import { Component } from '@angular/core';
import { DefaultLayoutComponent } from 'src/app/components/default-layout/default-layout.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ DefaultLayoutComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

}
