import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-max-projects',
  imports: [
    HeaderComponent,
    TranslocoModule,
    RouterModule
  ],
  templateUrl: './max-projects.component.html',
  styleUrl: './max-projects.component.scss'
})
export class MaxProjectsComponent {

}
