import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() pageNumber: number = 0;
  @Input() totalPage: number = 0;

  @Output() pageChanged = new EventEmitter<number>();

  getPage(page: number): void {
    this.pageChanged.emit(page);
  }

  getNextPage(): void {
    if (this.pageNumber < this.totalPage) {
      this.pageChanged.emit(this.pageNumber + 1);
    }
  }

  getPrevPage(): void {
    if (this.pageNumber > 1) {
      this.pageChanged.emit(this.pageNumber - 1);
    }
  }
}
