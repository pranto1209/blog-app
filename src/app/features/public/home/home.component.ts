import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilteringRequest } from '../../../shared/models/filtering.request';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PaginationComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  blogs$?: Observable<any>;

  request: FilteringRequest = {
    sortBy: '',
    sortDirection: '',
    searchText: '',
    isPaginated: true,
    pageNumber: 1,
    pageSize: 9
  }

  constructor(private blogPostService: BlogPostService) { }

  ngOnInit(): void {
    this.blogs$ = this.blogPostService.getBlogPosts(this.request);
  }

  getTotalPage(total: any): any {
    return Math.ceil(total / this.request.pageSize);
  }

  getPage(pageNumber: any): void {
    this.request.pageNumber = pageNumber;
    this.ngOnInit();
  }
}
