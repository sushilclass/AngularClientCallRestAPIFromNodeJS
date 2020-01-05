import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from './customer';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // BaseUrl
  baseurl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  // Error Handling
  errorHandl(error){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      // Get client-side error
      errorMessage = error.error.message;
    }else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;      
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  // POST
  CreateCustomer(data): Observable<Customer>{
    return this.http.post<Customer>(this.baseurl + '/customers/',JSON.stringify(data), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl))
  }

  // GET
  GetCustomer(_id):Observable<Customer>{
    return this.http.get<Customer>(this.baseurl + '/customers/' + _id)
    .pipe(retry(1), catchError(this.errorHandl))
  }

  // GET
  GetCustomers():Observable<Customer>{
    return this.http.get<Customer>(this.baseurl + '/customers/')
    .pipe(retry(1), catchError(this.errorHandl))
  }

  // PUT
  UpdateCustomer(_id, data):Observable<Customer>{
    return this.http.put<Customer>(this.baseurl + '/customers/' + _id, JSON.stringify(data), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl))
  }

  // DELETE
  DeleteCustomer(_id){
    return this.http.delete<Customer>(this.baseurl + '/customers/' + _id, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl))
  }
  
   // GET Customers using WebSocket
  _GetCustomers():Observable<any>{    
    if(this._webSocket)
    {
      console.log("connected");
       this.context.action = "getAll";
      this._webSocket.next(this.context);
    }
    return this._webSocket.asObservable();
  }
  
}
