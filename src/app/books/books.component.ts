import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
// import { Book } from '../books.model'

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
  authorInput: string = '';
  descriptionInput: string = '';
  showUpdate: boolean = false;
  updateInput: any = '';

  // function to close the update window
  closeWindow(){
    this.showUpdate = false;
  }

  // run this code when the line starts
  ngOnInit(): void {
    this.bookService.getBookInfo().subscribe(payload => {
      console.log("This is the construct", payload)
      this.books = payload;
      // this.showUpdate = false;
    })
  }

  // delete functionality
  deleteBook(id: number){
    this.bookService.deleteBook(id).subscribe(() => {
     this.ngOnInit();
    })
  }

  // create a new book
  createBook(data: any){
    console.log("DATA:", data)
    if(data.title === '' || data.author === '' || data.description ===''){
      alert('Please fill out all fields before adding your book')
    } else {
      this.bookService.createBook(
        {
          title: data.title, 
          author: data.author, 
          description: data.description
        }
        ).subscribe(() => {
           console.log("success in creating new book")
        this.titleInput = '';
        this.authorInput = '';
        this.descriptionInput = '';
        this.ngOnInit();
      })
    }
    
  }

  // update an existing book
  updateBook(id: number){
      this.showUpdate = true;
      this.bookService.getBookById(id).subscribe(payload=> {
        console.log("THA PAYLOAD", payload)
        this.updateInput = payload;
      });

      this.bookService.updateBook(id, this.updateInput).subscribe(() => {
        this.ngOnInit();
      });
    }
 
}
