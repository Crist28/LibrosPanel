import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormCheckComponent,
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  TableDirective,
  TableColorDirective,
  TableActiveDirective,
  BorderDirective,
  AlignDirective,
} from '@coreui/angular';
import {
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormSelectDirective,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonDirective,
  ColDirective,
  InputGroupComponent,
  InputGroupTextDirective,
} from '@coreui/angular';

import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';
declare let iziToast: any;

import { RouterLink } from '@angular/router';
import { PaginationComponent, PageItemComponent, PageLinkDirective } from '@coreui/angular';
import { AdminService } from '../../../services/admin.service';
import { Libro } from '../../../interfaces/book.interfaces';
import { BookCreate } from '../../../environments/global.component';

@Component({
  selector: 'app-book-index',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    TableColorDirective,
    TableActiveDirective,
    BorderDirective,
    AlignDirective,
    FormCheckComponent,
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ColDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    RouterLink,
    PaginationComponent,
    PageItemComponent,
    PageLinkDirective,
    FormsModule,
    CommonModule
  ],
  templateUrl: './book-index.component.html',
  styleUrl: './book-index.component.scss'
})

export class BookIndexComponent {
  libros: Libro[] = [];
  public filtro_titulo: string = '';
  public filtro_categoria: string = '';
  public libros_arr: Libro[] = [];
  public token: string;
  public url;
  page = 1;
  pageSize= 10;
  totalLibros = 0;
  Math = Math;

  constructor(private libroService: AdminService) {
    const token = this.libroService.getToken();
    this.token = token !== null ? token : '';
    this.url = BookCreate.urlbook;
  }

  ngOnInit(): void {
    this.cargarLibros();
    
  }

  cargarLibros(): void {
    this.libroService.cargarLibros('titulo', '', this.token).subscribe(
      (response) => {
        this.libros_arr = response.data; // Ahora `response.data` es reconocido
        this.totalLibros = this.libros_arr.length;
        this.libros_arr.reverse().forEach((element) => {
          this.libros.push({
            _id:  element._id,
            titulo: element.titulo,
            precio: element.precio,
            stock: element.stock,
            categoria: element.categoria,
            nventas: element.nventas,
            autor: element.autor,
            isbn: element.isbn,
            anio_publicacion: element.anio_publicacion,
            portada: element.portada,
            createdAt: element.createdAt,
          });
        });
      },
      (error) => {
        console.error('Error al listar libros:', error);
      }
    );
  }

  filtrar(tipo: string): void {

    this.page = 1;

    const filtroValor = tipo === 'titulo' ? this.filtro_titulo : this.filtro_categoria;
    this.libroService.cargarLibros(tipo, filtroValor, this.token).subscribe(
      (response) => {
        this.libros_arr = response.data;
        this.totalLibros = this.libros_arr.length;
      },
      (error) => {
        console.error('Error al listar libros:', error);
      }
    );
  }
   // Método para cambiar de página
   cambiarPagina(pagina: number): void {
    this.page = pagina;
    this.cargarLibros();
  }

  eliminarProducto(id: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: '¿Quieres eliminar el libro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
      didOpen: () => {
        const actionsContainer = document.querySelector('.swal2-actions') as HTMLElement;
        if (actionsContainer) {
          actionsContainer.style.display = 'flex';
          actionsContainer.style.gap = '10px'; // Ajusta el valor de gap según sea necesario
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroService.deleteBookAdmin(id, this.token).subscribe(
          response => {
            // Mostrar mensaje de éxito
            iziToast.success({
              title: 'OK',
              message: 'Libro borrado correctamente!',
          });
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
              'El Libro ha sido eliminado.',
              'success'
            );
            // Actualizar la lista de productos después de eliminar, si corresponde
            // location.reload();
            this.cargarLibros();
          },
          error => {
            // Manejar errores en caso de que ocurra alguno durante la eliminación
            // Mostrar mensaje de error
            swalWithBootstrapButtons.fire(
              'Error',
              'Hubo un problema al eliminar el libro.',
              'error'
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El libro no ha sido eliminado.',
          'info'
        );
      }
    });
  }  
}
