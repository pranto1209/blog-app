import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { FilteringRequest } from '../../models/filtering.request';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-image-selector',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.scss'
})
export class ImageSelectorComponent implements OnInit {

  file?: File;
  fileName: string = '';
  title: string = '';
  images$?: Observable<any>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  request: FilteringRequest = {
    sortBy: '',
    sortDirection: '',
    searchText: '',
    isPaginated: true,
    pageNumber: 1,
    pageSize: 12
  };

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.onImages();
  }

  onImages(): void {
    this.images$ = this.imageService.getImagesByUser(this.request);
  }

  onFileUploadChange(event: any): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void {
    if (this.file && this.fileName?.trim()) {
      this.imageService.uploadImage(this.file, this.fileName).subscribe({
        next: (response) => {
          this.imageUploadForm?.resetForm();
          this.onImages();
        }
      });
    }
  }

  selectImage(image: any): void {
    this.imageService.selectImage(image);
  }

  onDelete(id: any): void {
    this.imageService.deleteImage(id).subscribe({
      next: (response) => {
        this.onImages();
      }
    });
  }

  getTotalPage(total: any): any {
    return Math.ceil(total / this.request.pageSize);
  }

  getPage(pageNumber: any): void {
    this.request.pageNumber = pageNumber;
    this.onImages();
  }
}
