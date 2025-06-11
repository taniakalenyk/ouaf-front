// import {Component, EventEmitter, Output} from '@angular/core';
// import {PolaroidComponent} from '../../shared/polaroid/polaroid.component';
// import {ToggleComponent} from '../../shared/toggle/toggle.component';
//
// @Component({
//   selector: 'app-academy-gallery',
//   imports: [
//     PolaroidComponent,
//     ToggleComponent
//   ],
//   templateUrl: './academy-gallery.component.html',
//   styleUrl: './academy-gallery.component.scss'
// })
//
// export class AcademyGalleryComponent {
//   @Output() toggled = new EventEmitter<boolean>();
//   fullSize: boolean = true;
//
//   onToggle() {
//     this.fullSize = !this.fullSize;
//     console.log('Full-size mode:', this.fullSize);
//   }
// }
import {Component} from '@angular/core';
import {ToggleComponent} from '../../shared/toggle/toggle.component';
import {PolaroidComponent} from '../../shared/polaroid/polaroid.component';
import {NgClass} from '@angular/common';
import {FilepickerComponent} from '../../shared/filepicker/filepicker.component';

@Component({
  selector: 'app-academy-gallery',
  templateUrl: './academy-gallery.component.html',
  imports: [
    ToggleComponent,
    PolaroidComponent,
    NgClass,
    FilepickerComponent
  ],
  styleUrls: ['./academy-gallery.component.scss']
})
export class AcademyGalleryComponent {
  fullSize: boolean = true;
  zoom: boolean = false;
  gap: string = 'gap-1-75';
  photo: File | null = null;

  onPolaroid() {
    this.fullSize = !this.fullSize;
    console.log('Polaroid', this.fullSize);
  }

  onZoom() {
    this.zoom = !this.zoom;
    if (this.gap === 'gap-1-75') {
      this.gap = 'gap-2-25';
    } else {
      this.gap = 'gap-1-75';
    }
    console.log('Zoom', this.zoom);
    console.log('Gap', this.gap);
  }

  onFilePicked(pickedFile: File | null) {
    this.photo = pickedFile;
  }
}
