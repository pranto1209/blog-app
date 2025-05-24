import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MarkdownModule
  ],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent implements OnInit {

  url: string = '';
  blogPost$?: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogPostService: BlogPostService
  ) { }

  ngOnInit(): void {
    this.url = this.activatedRoute.snapshot.paramMap.get('url') ?? '';

    this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
  }
}
