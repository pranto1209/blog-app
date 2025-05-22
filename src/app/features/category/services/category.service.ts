import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
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

    return this.http.get<any>(`${environment.apiBaseUrl}/api/Categories/get-categories`, { params });
  }

  getCategoryById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Categories/get-category/${id}`);
  }

  addCategory(model: AddCategoryRequest): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/Categories/create-category?addAuth=true`, model);
  }

  updateCategory(id: any, model: UpdateCategoryRequest): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/api/Categories/update-category/${id}?addAuth=true`, model);
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/Categories/delete-category/${id}?addAuth=true`)
  }
}
