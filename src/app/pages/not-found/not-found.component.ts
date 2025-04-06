import { Component } from '@angular/core';
import {ButtonComponent} from '../../shared/button/button.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {FooterComponent} from '../../shared/footer/footer.component';

@Component({
  selector: 'app-not-found',
  imports: [
    ButtonComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
