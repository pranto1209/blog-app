import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { environment } from '../../../../environments/environment.development';
import { FilteringRequest } from '../../../shared/models/filtering.request';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  getBlogPosts(request: FilteringRequest): Observable<any> {
    let params = new HttpParams()
      .set('sortBy', request.sortBy)
      .set('sortDirection', request.sortDirection)
      .set('searchText', request.searchText)
      .set('isPaginated', request.isPaginated)
      .set('pageNumber', request.pageNumber)
      .set('pageSize', request.pageSize);

    return this.http.get<any>(`${environment.apiBaseUrl}/api/BlogPosts/get-blog-posts`, { params });
  }

  getBlogPostsByUser(request: FilteringRequest): Observable<any> {
    let params = new HttpParams()
      .set('sortBy', request.sortBy)
      .set('sortDirection', request.sortDirection)
      .set('searchText', request.searchText)
      .set('isPaginated', request.isPaginated)
      .set('pageNumber', request.pageNumber)
      .set('pageSize', request.pageSize);

    return this.http.get<any>(`${environment.apiBaseUrl}/api/BlogPosts/get-blog-posts-by-user`, { params });
  }

  getBlogPostById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/BlogPosts/get-blog-post-by-id/${id}`);
  }

  getBlogPostByUrlHandle(urlHandle: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/BlogPosts/get-blog-post-by-url/${urlHandle}`);
  }

  createBlogPost(data: AddBlogPost): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/BlogPosts/add-blog-post`, data);
  }

  updateBlogPost(id: any, updatedBlogPost: UpdateBlogPost): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/api/BlogPosts/update-blog-post/${id}`, updatedBlogPost);
  }

  deleteBlogPost(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/BlogPosts/delete-blog-post/${id}`);
  }
}
