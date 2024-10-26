import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgForm ,FormGroup, FormControl} from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { DefaultLayoutComponent } from '../../../components/default-layout/default-layout.component';
import { AdminService } from '../../../services/admin.service';
import { Router, RouterLink } from '@angular/router';
import { Subscriber } from 'rxjs';
declare let iziToast: any;
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
  public imgSelect : any | ArrayBuffer = 'assets/carpeta.jpg';

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
    if (this.file.size <= 4000000) {
      if (
        this.file.type == 'image/png' ||
        this.file.type == 'image/webp' ||
        this.file.type == 'image/jpg' ||
        this.file.type == 'image/jpeg' ||
        this.file.type == 'image/gif'
      ) {
        const reader = new FileReader();
        reader.onload = (e) => (this.imgSelect = reader.result);
        reader.readAsDataURL(this.file);
        console.log(this.file);
      } else {
        iziToast.error({
          title: 'Error',
          message: 'El archivo debe ser una imagen',
          position: 'topRight',
        });
        this.imgSelect = 'assets/biblioteca.png';
        this.file = undefined;
      }
    } else {
      iziToast.error({
        title: 'Error',
        message: 'La imagen no puede superar los 4MB',
        position: 'topRight',
      });
      this.imgSelect = 'assets/carpeta.jpg';
      this.file = undefined;
    }
  } else {
    iziToast.error({
      title: 'Error',
      message: 'No hay una imagen de envío',
      position: 'topRight',
    });
    this.imgSelect = 'assets/carpeta.jpg';
    this.file = undefined;
  }
  console.log(this.file);
}
  
 onSubmit(){
  if(this.registerForm.valid){
    const formData = this.registerForm.value
    console.log(formData)
    this.adminService.CreateBook(formData,this.file,this.token).subscribe(
      (response) =>{
        iziToast.success({
          title: 'Ok',
          message: 'Se registró correctamente el nuevo libro',
          position: 'topRight',
        });
        this.router.navigate(['indexbook']);
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
