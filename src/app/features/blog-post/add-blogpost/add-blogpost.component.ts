import { Component, OnInit } from '@angular/core';
import { AddBlogPostRequest } from '../models/add-blog-post.request';
import { BlogPostService } from '../services/blog-post.service';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageService } from '../../../shared/services/image.service';
import { MarkdownModule } from 'ngx-markdown';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { FilteringRequest } from '../../../shared/models/filtering.request';

@Component({
  selector: 'app-add-blogpost',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MarkdownModule,
    ImageSelectorComponent
  ],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.scss'
})
export class AddBlogpostComponent implements OnInit {

  model: AddBlogPostRequest = {
    title: '',
    shortDescription: '',
    urlHandle: '',
    content: '',
    featuredImageUrl: '',
    isVisible: true,
    categories: []
  };

  isImageSelectorVisible: boolean = false;
  categories$?: Observable<any>;

  request: FilteringRequest = {
    sortBy: '',
    sortDirection: '',
    searchText: '',
    isPaginated: true,
    pageNumber: 1,
    pageSize: 10
  };

  constructor(
    private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.request.isPaginated = false;
    this.categories$ = this.categoryService.getCategories(this.request);

    this.imageService.onSelectImage().subscribe({
      next: (selectedImage) => {
        this.model.featuredImageUrl = selectedImage.url;
        this.closeImageSelector();
      }
    });
  }

  onFormSubmit(): void {
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model).subscribe({
      next: (response) => {
        this.router.navigate(['/blogposts']);
      }
    });
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }
}
