import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import { BookCreate } from '../../../environments/global.component';
declare let iziToast: any;
declare const $: any;
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
    CommonModule,
  ],
  templateUrl: './book-actualizar.component.html',
  styleUrl: './book-actualizar.component.scss',
})
export class BookActualizarComponent {
  public token: string;
  public id: any;
  public book: any = {};
  public file: File | any = undefined;
  public imgSelect: any | ArrayBuffer = 'assets/carpeta.jpg';
  public producto: any = { categoria: '' }
  public url;

  constructor(
    private adminService: AdminService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.url = BookCreate.urlbook;
    const token = this.adminService.getToken();
    this.token = token !== null ? token : '';
    const file = this.adminService;


  }

  ngOnInit(): void {
    this.obtenerLibro()
  }

  obtenerLibro() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.bookService.obtener_libro(this.id, this.token).subscribe(
        respuesta => {
          if (respuesta.data == undefined) {
            this.producto = undefined
          } else {
            this.producto = respuesta.data
            this.imgSelect = this.url + 'portada/' + this.producto.portada
          }
        }
      )
    })
  }
  fileChangeEvent(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];

      // Condicionales para el tamaño y tipo de archivo
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

          $('#input-portada').text(this.file.name);
        } else {
          iziToast.error({
            title: 'Error',
            message: 'El archivo debe ser una imagen',
            position: 'topRight',
          });
          $('#input-portada').text('Seleccionar imagen');
          this.imgSelect = 'assets/carpeta.jpg';
          this.file = undefined;
        }
      } else {
        iziToast.error({
          title: 'Error',
          message: 'La imagen no puede superar los 4MB',
          position: 'topRight',
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/carpeta.jpg';
        this.file = undefined;
      }
    } else {
      iziToast.error({
        title: 'Error',
        message: 'No hay imagen de envio',
        position: 'topRight',
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/carpeta.jpg';
      this.file = undefined;
    }
  }
  actualizarlibro(actualizarFormulario: NgForm) {
    if (actualizarFormulario.valid) {
      const productoActualizado = {
        _id: this.producto._id,
        titulo: this.producto.titulo,
        portada: this.file instanceof File ? this.file : this.producto.portada,
        contenido: this.producto.contenido,
        precio: this.producto.precio,
        stock: this.producto.stock,
        descripcion: this.producto.descripcion,
        categoria: this.producto.categoria,
        anio_publicacion: this.producto.anio_publicacion,
        autor: this.producto.autor,
        isbn: this.producto.isbn,
      }
      this.bookService.actualiza_libro(this.producto._id, productoActualizado, this.token).subscribe(
        respuesta => {
          console.log('Libro Actualizado')
          this.router.navigate(['indexbook'])
          iziToast.success({
            title: 'Actualizado',
            message: 'Libro se actualizó correctamente',
            position: 'topRight',
          });
        }, err => {
          console.log('Error en la actualización')
          iziToast.error({
            title: 'Error',
            message: 'No Actualizado',
            position: 'topRight',
          });  
        }
      )
    }
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

  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     const formData = this.registerForm.value;
  //     console.log(formData);
  //     this.adminService.CreateBook(formData, this.file, this.token).subscribe(
  //       (response) => {
  //         console.log(response);
  //         this.router.navigate(['']);
  //       },
  //       (error) => {
  //         console.log(error);
  //         // this.error = error.error.message;
  //       },
  //     );
  //   }
  // }

  tooltipValidated = false;

  onReset3() {
    this.tooltipValidated = false;
    console.log('Reset... 3');
  }
}
