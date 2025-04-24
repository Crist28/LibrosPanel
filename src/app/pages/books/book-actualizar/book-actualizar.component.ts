import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  NgForm,
  FormGroup,
  FormControl,
} from '@angular/forms';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
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
} from '@coreui/angular';
import { DefaultLayoutComponent } from '../../../components/default-layout/default-layout.component';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscriber } from 'rxjs';
import { BookService } from '../../../services/book.service';
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
  templateUrl: './book-actualizar.component.html',
  styleUrl: './book-actualizar.component.scss',
})
export class BookActualizarComponent {
  public registerForm: FormGroup;
  public token: string;
  public id: any;
  public book: any;
  public file: any = undefined;
  public imgSelect: any | ArrayBuffer = 'assets/carpeta.jpg';

  constructor(
    private adminService: AdminService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const token = this.adminService.getToken();
    this.token = token !== null ? token : '';
    const file = this.adminService;

    this.registerForm = new FormGroup({
      titulo: new FormControl(''),
      portada: new FormControl(''),
      contenido: new FormControl(''),
      precio: new FormControl(''),
      stock: new FormControl(''),
      descripcion: new FormControl(''),
      categoria: new FormControl(''),
      anio_publicacion: new FormControl(''),
      autor: new FormControl(''),
      isbn: new FormControl(''),
    });
  }

  ngOnInit():void{
    this.obtenerLibro()
  }

  obtenerLibro(){
    this.route.params.subscribe(params =>{
      this.id = params['id']
      this.bookService.obtener_libro(this.id, this.token).subscribe(
        respuesta =>{
          this.book = respuesta.data
        } 
      )
    })
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

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log(formData);
      this.adminService.CreateBook(formData, this.file, this.token).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);
          // this.error = error.error.message;
        },
      );
    }
  }

  tooltipValidated = false;

  onReset3() {
    this.tooltipValidated = false;
    console.log('Reset... 3');
  }
}
