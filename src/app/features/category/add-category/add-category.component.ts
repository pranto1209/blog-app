import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest = {
    name: ''
  };
  
  private addCategorySubscribtion?: Subscription;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  onFormSubmit() {
    this.addCategorySubscribtion = this.categoryService.addCategory(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      })
  }

  ngOnDestroy(): void {
    this.addCategorySubscribtion?.unsubscribe();
  }
}
