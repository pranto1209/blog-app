import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { CategoryService } from '../../category/services/category.service';
import { UpdateBlogPostRequest } from '../models/update-blog-post.request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageService } from '../../../shared/services/image.service';
import { MarkdownModule } from 'ngx-markdown';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { FilteringRequest } from '../../../shared/models/filtering.request';

@Component({
  selector: 'app-edit-blogpost',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MarkdownModule,
    ImageSelectorComponent
  ],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.scss'
})
export class EditBlogpostComponent implements OnInit {

  id: number = 0;
  blogPost: any;
  categories$?: Observable<any>;
  selectedCategories?: string[];
  isImageSelectorVisible: boolean = false;

  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectSubscricption?: Subscription;

  request: FilteringRequest = {
    sortBy: '',
    sortDirection: '',
    searchText: '',
    isPaginated: true,
    pageNumber: 1,
    pageSize: 10
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') ?? '0');

    this.request.isPaginated = false;
    this.categories$ = this.categoryService.getCategories(this.request);

    this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
      next: (response) => {
        this.blogPost = response;
        this.selectedCategories = response.categories.map((x: any) => x.id);
      }
    });

    this.imageSelectSubscricption = this.imageService.onSelectImage()
      .subscribe({
        next: (response) => {
          if (this.blogPost) {
            this.blogPost.featuredImageUrl = response.url;
            this.isImageSelectorVisible = false;
          }
        }
      });
  }

  onFormSubmit(): void {
    if (this.blogPost && this.id) {
      var updateBlogPost: UpdateBlogPostRequest = {
        content: this.blogPost.content,
        shortDescription: this.blogPost.shortDescription,
        featuredImageUrl: this.blogPost.featuredImageUrl,
        isVisible: this.blogPost.isVisible,
        title: this.blogPost.title,
        urlHandle: this.blogPost.urlHandle,
        categories: this.selectedCategories ?? []
      };

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/blogposts');
          }
        });
    }

  }

  onDelete(): void {
    this.blogPostService.deleteBlogPost(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/blogposts');
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
