import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
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

import { RouterLink } from '@angular/router';
import { PaginationComponent, PageItemComponent, PageLinkDirective } from '@coreui/angular';


@Component({
  selector: 'app-cliente-index',
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
    PageLinkDirective
  ],
  templateUrl: './cliente-index.component.html',
  styleUrl: './cliente-index.component.scss',
})
export class ClienteIndexComponent {}
