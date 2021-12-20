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

  ngOnInit(): void {
    this.bookService.getBookInfo().subscribe(payload => {
      console.log("This is the books payload: ", payload);
      this.books = payload;
    })
  }

  // delete functionality
  deleteBook(id: number){
    console.log("this is the book ID:", id)
    this.bookService.deleteBook(id).subscribe(() => {
     console.log('deletion successfull');
     this.ngOnInit();
    })
  }

  // create a new book
  createBook(data: string){
    console.log("this is the data:", data);
    this.bookService.createBook({title: data}).subscribe(() => {
      console.log('successfully added book');
      this.titleInput = '';
      this.ngOnInit();
    })
  }

  // update an existing book
  updateBook(id: number){
      this.showUpdate = true;
      this.bookService.getBookById(id).subscribe(payload=> {
        console.log("this is the single book:", payload)
        this.updateInput = payload;
      });

      this.bookService.updateBook(id, this.updateInput).subscribe(() => {
        console.log('successfully updated this title');
        this.ngOnInit();
        // this.showUpdate = false;
      })
    }
 

}
