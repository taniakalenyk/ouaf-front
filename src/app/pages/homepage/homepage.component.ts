import { Component } from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {ButtonComponent} from '../../shared/button/button.component';
import {FooterComponent} from '../../shared/footer/footer.component';

@Component({
  selector: 'app-homepage',
  imports: [
    HeaderComponent,
    ButtonComponent,
    FooterComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
