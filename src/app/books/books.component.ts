import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(private bookService: BooksService) { }

  books: any = [];
  selectedBook: any = '';
  titleInput: string = '';
  showUpdate: boolean = false;
  updateInput: any = '';

  // function to close the update window
  closeWindow(){
    this.showUpdate = false;
  }

  // run this code when the line starts
  ngOnInit(): void {
    this.bookService.getBookInfo().subscribe(payload => {
      this.books = payload;
    })
  }

  // delete functionality
  deleteBook(id: number){
    this.bookService.deleteBook(id).subscribe(() => {
     this.ngOnInit();
    })
  }

  // create a new book
  createBook(data: string){
    this.bookService.createBook({title: data}).subscribe(() => {
      this.titleInput = '';
      this.ngOnInit();
    })
  }

  // update an existing book
  updateBook(id: number){
      this.showUpdate = true;
      this.bookService.getBookById(id).subscribe(payload=> {
        this.updateInput = payload;
      });

      this.bookService.updateBook(id, this.updateInput).subscribe(() => {
        this.ngOnInit();
        // this.showUpdate = false;
      });
    }
 

}
