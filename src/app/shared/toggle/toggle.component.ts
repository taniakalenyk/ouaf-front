import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-toggle',
    templateUrl: './toggle.component.html',
    styleUrl: './toggle.component.scss',
    imports: [
        NgClass
    ]
})
export class ToggleComponent {
    @Input() label: string = '';
    @Input() size: 'regular' | 'small' = 'regular';
    @Output() toggleEvent = new EventEmitter<void>();


    toggle() {
        this.toggleEvent.emit();
    }
}

