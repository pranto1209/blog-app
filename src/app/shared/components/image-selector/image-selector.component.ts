import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { BlogImage } from '../../models/blog-image';

@Component({
  selector: 'app-image-selector',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.scss'
})
export class ImageSelectorComponent implements OnInit {

  private file?: File;
  fileName: string = '';
  title: string = '';
  images$?: Observable<any>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getImages();
  }

  getImages(): void {
    this.images$ = this.imageService.getAllImages();
  }

  onFileUploadChange(event: any): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void {
    if (this.file && this.fileName?.trim()) {
      this.imageService.uploadImage(this.file, this.fileName)
        .subscribe({
          next: (response) => {
            this.imageUploadForm?.resetForm();
            this.getImages();
          }
        });
    }
  }

  selectImage(image: any): void {
    this.imageService.selectImage(image);
  }

  onDelete(id: any): void {
    this.imageService.deleteImage(id)
      .subscribe({
        next: (response) => {
          this.getImages();
        }
      });
  }
}
