import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { FilteringRequest } from '../models/filtering.request';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  selectedImage: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getImagesByUser(request: FilteringRequest): Observable<any> {
    let params = new HttpParams()
      .set('sortBy', request.sortBy)
      .set('sortDirection', request.sortDirection)
      .set('searchText', request.searchText)
      .set('isPaginated', request.isPaginated)
      .set('pageNumber', request.pageNumber)
      .set('pageSize', request.pageSize);
      
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Images/get-images-by-user`, { params });
  }

  uploadImage(file: File, fileName: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    return this.http.post<any>(`${environment.apiBaseUrl}/api/Images/upload-image`, formData);
  }

  deleteImage(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/Images/delete-image/${id}`);
  }

  selectImage(image: any): void {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<any> {
    return this.selectedImage.asObservable()
  }
}
