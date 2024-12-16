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
import {
  TableDirective,
  TableColorDirective,
  TableActiveDirective,
  BorderDirective,
  AlignDirective,
} from '@coreui/angular';
import { ColDirective } from '@coreui/angular';
import { BookCreate } from '../../../environments/global.component';
import { AdminService } from '../../../services/admin.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs';
declare let iziToast: any;

@Component({
  selector: 'app-galeria-imagenes',
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
    TableDirective,
    TableColorDirective,
    TableActiveDirective,
    BorderDirective,
    AlignDirective,
    CommonModule,
  ],
  templateUrl: './galeria-imagenes.component.html',
  styleUrl: './galeria-imagenes.component.scss',
})
export class GaleriaImagenesComponent {
  public imgSelect: any | ArrayBuffer = 'assets/carpeta.jpg';
  public token: string;
  public files: any = undefined;
  public id: any;
  public libro: any;
  public url;
  public tooltipValidated = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
  ) {
    const token = this.adminService.getToken();
    this.token = token !== null ? token : '';

    this.url = BookCreate.urlbook;
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.adminService.getBooks(this.id, this.token).subscribe(
        (response) => {
          if (response.data == undefined) {
            this.libro = undefined;
          } else {
            this.libro = response.data;
          }
          console.log(this.libro);
        },
        (error) => {
          console.log(error);
        },
      );
    });
  }

  subir_imagenes() {
    if (this.files && this.files.length > 0) {
      console.log('ID:', this.id); // Verificar el valor del ID
      console.log(
        'URL:',
        `${this.adminService.urlbook}/libreria/agregar-imagen/${this.id}`,
      ); // Confirmar que la URL es correcta
      console.log('Archivos a subir:', this.files); // Comprobar los archivos seleccionados
      this.adminService
        .agregarImagenesGaleria(this.id, this.files, this.token)
        .subscribe(
          (response) => {
            iziToast.success({
              title: 'Ok',
              message: 'Se registraron las imágenes correctamente.',
              position: 'topRight',
            });
            this.init_data();
            this.files = [];
            console.log('Respuesta del servidor:', response);
          },
          (error) => {
            console.error('Error al subir las imágenes:', error);
            iziToast.error({
              title: 'Error',
              message: 'Ocurrió un error al subir las imágenes.',
              position: 'topRight',
            });
          },
        );
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Debe seleccionar al menos una imagen para subir.',
        position: 'topRight',
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.files = Array.from(event.target.files); // Mantén el arreglo de archivos
      const file = this.files[0]; // Toma el primer archivo para validación

      if (file.size <= 1000000) {
        if (
          file.type === 'image/png' ||
          file.type === 'image/webp' ||
          file.type === 'image/jpg' ||
          file.type === 'image/jpeg' ||
          file.type === 'image/gif'
        ) {
          const reader = new FileReader();
          reader.onload = (e) => (this.imgSelect = reader.result);
          reader.readAsDataURL(file);
          console.log(file);
        } else {
          iziToast.error({
            title: 'Error',
            message: 'El archivo debe ser una imagen válida.',
            position: 'topRight',
          });
          this.imgSelect = 'assets/carpeta.jpg';
          this.files = []; // Restablece el arreglo si hay un error
        }
      } else {
        iziToast.error({
          title: 'Error',
          message: 'La imagen no puede superar los 4MB.',
          position: 'topRight',
        });
        this.imgSelect = 'assets/carpeta.jpg';
        this.files = []; // Restablece el arreglo si hay un error
      }
    } else {
      this.files = [];
      iziToast.error({
        title: 'Error',
        message: 'No hay una imagen seleccionada.',
        position: 'topRight',
      });
      this.imgSelect = 'assets/carpeta.jpg';
    }
    console.log(this.files);
  }
}
