import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgForm ,FormGroup, FormControl} from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { DefaultLayoutComponent } from '../../../components/default-layout/default-layout.component';
import { AdminService } from '../../../services/admin.service';
import { Router, RouterLink } from '@angular/router';
import { Subscriber } from 'rxjs';
@Component({
  selector: 'app-crear-libro',
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
  templateUrl: './crear-libro.component.html',
  styleUrl: './crear-libro.component.scss',
})
export class CrearLibroComponent {

  public registerForm: FormGroup;
  public token: string;
  public file : any = undefined;

constructor (private adminService: AdminService,private router: Router){
  const token = this.adminService.getToken();
  this.token = token !== null ? token : '';
  const file = this.adminService;

  this.registerForm = new FormGroup({
    titulo: new  FormControl ('',),
    portada : new  FormControl ('',),
    contenido: new  FormControl ('',),
    precio: new  FormControl ('',),
    stock:new  FormControl ('',),
    descripcion: new  FormControl ('',),
    categoria:new  FormControl ('',),
  });
  
 

}

onFileChange(event: any) {
  if (event.target.files.length > 0) {
    this.file = event.target.files[0];
  }
}

 onSubmit(){
  if(this.registerForm.valid){
    const formData = this.registerForm.value
    console.log(formData)
    this.adminService.CreateBook(formData,this.file,this.token).subscribe(
      (response) =>{
        console.log(response)
        this.router.navigate(['']);
      },
      (error) =>{
        console.log(error)
        // this.error = error.error.message;
      }
      
    );

  }
 }



  tooltipValidated = false;

  onReset3() {
    this.tooltipValidated = false;
    console.log('Reset... 3');
  }

}
