import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-checkbox',
  imports: [
    NgClass
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() label: string = '';
  @Input() background: 'dark' | 'light' = 'light';
}
