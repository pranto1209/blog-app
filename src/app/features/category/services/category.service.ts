import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category.request';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EditCategoryRequest } from '../models/edit-category.request';
import { environment } from '../../../../environments/environment.development';
import { FilteringRequest } from '../../../shared/models/filtering.request';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  
  getCategories(request: FilteringRequest): Observable<any> {
    let params = new HttpParams()
      .set('sortBy', request.sortBy)
      .set('sortDirection', request.sortDirection)
      .set('searchText', request.searchText)
      .set('isPaginated', request.isPaginated)
      .set('pageNumber', request.pageNumber)
      .set('pageSize', request.pageSize);

    return this.http.get<any>(`${environment.apiBaseUrl}/Categories/get-categories`, { params });
  }

  getCategoryById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/Categories/get-category-by-id/${id}`);
  }

  addCategory(model: AddCategoryRequest): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/Categories/add-category`, model);
  }

  editCategory(id: any, model: EditCategoryRequest): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/Categories/edit-category/${id}`, model);
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/Categories/delete-category/${id}`)
  }
}
