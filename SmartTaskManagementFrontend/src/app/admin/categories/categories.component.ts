import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/Categories/category.service';
import { Category } from '../../Models/category';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  providers: [CategoryService],
})
export class CategoriesComponent implements OnInit {
  categoryForm!: FormGroup;
  newCategoryName = '';
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  addCategory(): void {
    if (this.categoryForm.valid) {
      const newCategory: Category = {
        name: this.categoryForm.value.categoryName,
      };
      this.categoryService.addCategory(newCategory).subscribe(() => {
        this.fetchCategories();

        this.categoryForm.reset();
      });
    }
  }

  deleteCategory(id?: number): void {
    if (!id) return;
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.fetchCategories();
    });
  }
}
