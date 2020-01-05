import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customerList:any=[];
  products=[];

  constructor(
    public customerService: CustomerService
  ) { }

  ngOnInit() {
    this.loadCustomers();
  }

  // Customer List
  loadCustomers(){ 
    return this.customerService.GetCustomers().subscribe((data:{})=>{         
    this.customerList = data;
    })
  }
  
  // WS Socket method
  _loadProducts(){
    this.customerService._GetCustomers().subscribe(data=>{
      this.products = data;
      console.log(JSON.stringify(data));
    },
    error=>{
      console.log(error)
    })
  }

  // Delete customer
  deletecustomer(data){
    var index = index = this.customerList.map(x=> { return x.FirstName}).indexOf(data.FirstName);
    return this.customerService.DeleteCustomer(data._id).subscribe(res=>{
      this.customerList.splice(index, 1)
      console.log('Customer Deleted');
    })
  }

}
