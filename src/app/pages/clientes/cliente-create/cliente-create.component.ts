import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../../components/default-layout';

// 'src/app/components/default-layout/default-layout.component'

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  imports: [DefaultLayoutComponent],
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.scss'
})
export class ClienteCreateComponent {

}
