import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Panel Administrador',
    title: true
  },
  {
    name: 'Clientes',
    url: '/base',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'Ver Clientes',
        url: '/panel/clientes',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Crear Cliente',
        url: '/panel/clientes/registro',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Libros',
    url: '/buttons',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Ver Libros',
        url: '/buttons/buttons',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Crear Libros',
        url: 'createbook',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Actualizar libro',
        url: 'actualizarbook',
        icon: 'nav-icon-bullet'
      }
     
    ]
  },
  {
    name: 'Cupones',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Form Control',
        url: '/forms/form-control',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Select',
        url: '/forms/select',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Checks & Radios',
        url: '/forms/checks-radios',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Range',
        url: '/forms/range',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Input Group',
        url: '/forms/input-group',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Floating Labels',
        url: '/forms/floating-labels',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Layout',
        url: '/forms/layout',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Validation',
        url: '/forms/validation',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Configuraciones',
    iconComponent: { name: 'cil-chart-pie' },
    url: '/charts'
  },
];
