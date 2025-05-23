import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilteringRequest } from '../../../shared/models/filtering.request';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-blogpost-list',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PaginationComponent
],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.scss'
})
export class BlogpostListComponent implements OnInit {

  blogPosts$?: Observable<any>;

  request: FilteringRequest = {
    sortBy: '',
    sortDirection: '',
    searchText: '',
    isPaginated: true,
    pageNumber: 1,
    pageSize: 10
  }

  constructor(
    private authService: AuthService,
    private blogPostService: BlogPostService
  ) { }

  ngOnInit(): void {
    this.onBlogPost();
  }

  onBlogPost(): void {
    this.blogPosts$ = this.blogPostService.getBlogPostsByUser(this.request);
  }

  onSearch(queryText: string): void {
    this.request.searchText = queryText;
    this.onBlogPost();
  }

  getTotalPage(total: any): any {
    return Math.ceil(total / this.request.pageSize);
  }

  getPage(pageNumber: any): void {
    this.request.pageNumber = pageNumber;
    this.onBlogPost();
  }
}
