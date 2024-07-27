import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';

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
    IconModule,
  ],
  providers: [
    IconSetService
  ],
  templateUrl: './cliente-index.component.html',
  styleUrl: './cliente-index.component.scss',
})
export class ClienteIndexComponent {}
