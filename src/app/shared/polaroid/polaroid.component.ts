import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-polaroid',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './polaroid.component.html',
  styleUrl: './polaroid.component.scss',
})
export class PolaroidComponent implements OnChanges {
  @Input() size: 'small' | 'regular' | 'zoom' = 'regular';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() polaroidView: boolean = true;
  @Input() zoomed: boolean = false;

  default = '/images/gallery/1.jpg';
  width = '';
  height = '';
  finalImageUrl = this.imageUrl?.trim() ? this.imageUrl : this.default;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size'] || changes['zoomed']) {
      this.setSize();
    }
    if (changes['imageUrl']) {
      this.finalImageUrl = this.imageUrl?.trim() ? this.imageUrl : this.default;
    }
  }

  setSize() {
    const sizes = {
      small: {width: '7.19rem', height: '9rem'},
      regular: {width: '11.25rem', height: '14.13rem'},
      zoom: {width: '16.875rem', height: '21.195rem'},
    };

    const selectedSize = this.zoomed ? sizes.zoom : sizes[this.size];

    this.width = selectedSize.width;
    this.height = selectedSize.height;
  }
}
