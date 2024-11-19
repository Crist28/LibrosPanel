import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgForm ,FormGroup, FormControl, Validators} from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { DefaultLayoutComponent } from '../../../components/default-layout/default-layout.component';
import { AdminService } from '../../../services/admin.service';
import { Router, RouterLink } from '@angular/router';
import { Subscriber } from 'rxjs';
declare let iziToast: any;


// 'src/app/components/default-layout/default-layout.component'

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  imports: [
    DefaultLayoutComponent,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    FormFeedbackComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormSelectDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ListGroupDirective,
    ListGroupItemDirective,
    RouterLink,
  ],
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.scss'
})
export class ClienteCreateComponent {
  public registerForm: FormGroup;
  public token: string;
  constructor(private adminService: AdminService, private router: Router) {
    const token = this.adminService.getToken();
    this.token = token !== null ? token : '';
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      direction: new FormControl(''),
      phone: new FormControl(''),
      country: new FormControl(''),
      profile: new FormControl(''),
    });
    this.onSubmit()
  }
  
  onSubmit() {
    const formData = this.registerForm.value;
    this.adminService.registro_cliente(formData, this.token).subscribe(
      response => {
        console.log(response)
      }  
    )
  }
}
