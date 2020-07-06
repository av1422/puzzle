import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { addToReadingList } from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private readonly actionBar: MatSnackBar,
  ) { }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const actionBarRef = this.actionBar.open('Book was Removed from List', 'Undo', {
      duration: 2000
    });

    actionBarRef.onAction().subscribe(() => {
      const book: Book = Object.assign({}, item);
      book.id = item.bookId;
      this.store.dispatch(addToReadingList({ book }));
    });
  }
}
