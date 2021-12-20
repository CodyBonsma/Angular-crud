import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBookInfo(){
    return this.http.get('http://localhost:8082/api/books');
  };

  deleteBook(id: number){
   return this.http.delete(`http://localhost:8082/api/books/${id}`);
  }

  createBook(data: Object){
    console.log("BACK END DATA", data)
    return this.http.post('http://localhost:8082/api/books', data);
  }
  getBookById(id: number){
    return this.http.get(`http://localhost:8082/api/books/${id}`);
  }

  updateBook(id: number, data: Object){ 
    return this.http.put(`http://localhost:8082/api/books/${id}`, data ); 
  }

}
