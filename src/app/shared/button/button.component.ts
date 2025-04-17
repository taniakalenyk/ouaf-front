import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgClass, NgIf],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})

export class ButtonComponent {
  @Input() label: string = 'Click';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'home' | 'long' | 'small' | 'google-button' | '' = '';
  @Input() disabled: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
