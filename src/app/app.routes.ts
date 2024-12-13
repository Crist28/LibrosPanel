import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./pages/inicio/inicio.component').then(m => m.InicioComponent),
        canActivate: [adminGuard],
        data: {
          title: 'Inicio'
        }
      },
      {
        path: 'panel/clientes',
        loadComponent: () =>
          import('./pages/clientes/cliente-index/cliente-index.component').then(m => m.ClienteIndexComponent),
        canActivate: [adminGuard],
        data: {
          title: 'Clientes'
        }
      },
      {
        path: 'panel/clientes/registro',
        loadComponent: () =>
          import('./pages/clientes/cliente-create/cliente-create.component').then(m => m.ClienteCreateComponent),
        canActivate: [adminGuard],
        data: {
          title: 'Registro de Clientes'
        }
      },
      {
        path: 'panel/clientes/:id',
        loadComponent: () =>
          import('./pages/clientes/cliente-edit/cliente-edit.component').then(m => m.ClienteEditComponent),
        canActivate: [adminGuard],
        data: {
          title: 'Editar Cliente'
        }
      },
      {
        path: 'indexbook',
        loadComponent: () =>
          import('./pages/books/book-index/book-index.component').then(m => m.BookIndexComponent),
        canActivate: [adminGuard],
        data: {
          title: 'Listado de libros'
        }
      },
      {
        path: 'createbook',
        loadComponent: () =>
          import('./pages/books/crear-libro/crear-libro.component').then(m => m.CrearLibroComponent),
        canActivate: [adminGuard],
        data: {
          title: 'Createbook Page'
        }
      },
      {
        path: 'actualizarbook/:id',
        loadComponent: () =>
          import('./pages/books/book-actualizar/book-actualizar.component').then(m => m.BookActualizarComponent ),
        canActivate: [adminGuard],
        data: {
          title: 'Actualizar Page'
        }

      },
      {
        path: 'galeria/:id',
        loadComponent: () =>
          import('./pages/books/galeria-imagenes/galeria-imagenes.component').then(m => m.GaleriaImagenesComponent ),
        canActivate: [adminGuard],
        data: {
          title: 'Galeria de fotos'
        }

      },
    ]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
