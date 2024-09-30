import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
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

import { RouterLink } from '@angular/router';
import { PaginationComponent, PageItemComponent, PageLinkDirective } from '@coreui/angular';
import { AdminService } from '../../../services/admin.service';
import { Libro } from '../../../interfaces/book.interfaces';

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
    DocsExampleComponent,
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
  page = 1;
  pageSize= 10;
  totalLibros = 0;
  Math = Math;

  constructor(private libroService: AdminService) {
    const token = this.libroService.getToken();
    this.token = token !== null ? token : '';
  }

  ngOnInit(): void {
    this.libroService.cargarLibros('titulo', '', this.token).subscribe(
      (response) => {
        this.libros_arr = response.data; // Ahora `response.data` es reconocido
        this.totalLibros = this.libros_arr.length;
        this.libros_arr.forEach((element) => {
          this.libros.push({
            _id:  element._id,
            titulo: element.titulo,
            precio: element.precio,
            stock: element.stock,
            categoria: element.categoria,
            nventas: element.nventas,
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
  }
}
