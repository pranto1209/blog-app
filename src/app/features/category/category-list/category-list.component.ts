import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilteringRequest } from '../../../shared/models/filtering.request';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { User } from '../../../shared/models/user';
import { AuthService } from '../../auth/services/auth.service';
import { UserRoleEnum } from '../../../shared/models/user-role.enum';

@Component({
  selector: 'app-category-list',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {

  user?: User;
  userRole = UserRoleEnum;
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
    private authService: AuthService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.onAuthUser();

    this.onCategory();
  }

  onAuthUser(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();
  }

  onCategory(): void {
    this.categories$ = this.categoryService.getCategories(this.request);
  }

  onSearch(queryText: string): void {
    this.request.searchText = queryText;
    this.onCategory();
  }

  sort(sortBy: string, sortDirection: string): void {
    this.request.sortBy = sortBy;
    this.request.sortDirection = sortDirection;
    this.onCategory();
  }

  getTotalPage(total: any): any {
    return Math.ceil(total / this.request.pageSize);
  }

  getPage(pageNumber: any): void {
    this.request.pageNumber = pageNumber;
    this.onCategory();
  }
}
