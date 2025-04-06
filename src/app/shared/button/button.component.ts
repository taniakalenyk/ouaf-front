import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string = 'Click';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'home' | 'long' | 'small' | '' = '';
  @Input() disabled: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
