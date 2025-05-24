import { Injectable } from '@angular/core';
import { AddBlogPostRequest } from '../models/add-blog-post.request';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UpdateBlogPostRequest } from '../models/update-blog-post.request';
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

    return this.http.get<any>(`${environment.apiBaseUrl}/BlogPosts/get-blog-posts`, { params });
  }

  getBlogPostsByUser(request: FilteringRequest): Observable<any> {
    let params = new HttpParams()
      .set('sortBy', request.sortBy)
      .set('sortDirection', request.sortDirection)
      .set('searchText', request.searchText)
      .set('isPaginated', request.isPaginated)
      .set('pageNumber', request.pageNumber)
      .set('pageSize', request.pageSize);

    return this.http.get<any>(`${environment.apiBaseUrl}/BlogPosts/get-blog-posts-by-user`, { params });
  }

  getBlogPostById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/BlogPosts/get-blog-post-by-id/${id}`);
  }

  getBlogPostByUrlHandle(urlHandle: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/BlogPosts/get-blog-post-by-url/${urlHandle}`);
  }

  createBlogPost(data: AddBlogPostRequest): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/BlogPosts/add-blog-post`, data);
  }

  updateBlogPost(id: any, updatedBlogPost: UpdateBlogPostRequest): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/BlogPosts/update-blog-post/${id}`, updatedBlogPost);
  }

  deleteBlogPost(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/BlogPosts/delete-blog-post/${id}`);
  }
}
