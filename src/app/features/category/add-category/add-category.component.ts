import { Component } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category.request';
import { CategoryService } from '../services/category.service';
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
export class AddCategoryComponent {

  model: AddCategoryRequest = {
    name: ''
  };

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  onFormSubmit() {
    this.categoryService.addCategory(this.model).subscribe({
      next: (response) => {
        this.router.navigate(['/categories']);
      }
    });
  }
}
