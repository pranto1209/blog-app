import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { EditCategoryRequest } from '../models/edit-category.request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements OnInit {

  id: number = 0;
  category: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') ?? '0');

    this.categoryService.getCategoryById(this.id).subscribe({
      next: (response) => {
        this.category = response;
      }
    });
  }

  onFormSubmit(): void {
    const model: EditCategoryRequest = {
      name: this.category.name,
    };

    this.categoryService.editCategory(this.id, model).subscribe({
      next: (response) => {
        this.router.navigate(['/categories']);
      }
    });
  }

  onDelete(): void {
    this.categoryService.deleteCategory(this.id).subscribe({
      next: (response) => {
        this.router.navigate(['/categories']);
      }
    });
  }
}
