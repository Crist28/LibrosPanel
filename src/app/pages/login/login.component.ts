import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective
} from '@coreui/angular';
import { NgForm, FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

declare let iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    FormsModule
  ],
})
export class LoginComponent {
  public user: any = {};
  public usuario: any = {};
  token: string;
  passwordFieldType: string = 'password';

  constructor(private adminService: AdminService, private router: Router) {
    const token = this.adminService.getToken();
    this.token = token !== null ? token : '';
  }

  ngOnInit(): void {
    if (this.token) {
      this.router.navigate(['/']);
    }
  }

  togglePasswordVisibility(event: any) {
    this.passwordFieldType = event.target.checked ? 'text' : 'password';
  }

  login(loginForm: NgForm) {
    let data = {
      email: this.user.email,
      password: this.user.password
    }
    if(loginForm.valid){
      this.adminService.login_admin(data).subscribe(
        response => {
          this.usuario = response.administrador;
          
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', this.usuario._id);
          localStorage.setItem('nombre', this.usuario.name);

          this.router.navigate(['']);
          
        }, error => {
          iziToast.error({
            title: 'Error',
            position: 'topRight',
            message: 'Correo o contraseña no encontrada',
        });
        }
      )
    }else{
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message: 'Los datos del formulario no son validos',
    });
    }    
  }
}
