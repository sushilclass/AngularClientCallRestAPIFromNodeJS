import { Component, OnInit, NgZone } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerForm:FormGroup;
  customerArr:any = [];

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public customerService: CustomerService
  ) { }

  ngOnInit() {
    this.addCustomer()
  }

  addCustomer(){
    this.customerForm = this.fb.group({
      FirstName:[''],
      LastName:['']
    })
  }

  submitForm(){
    this.customerService.CreateCustomer(this.customerForm.value).subscribe(res=>{
      this.ngZone.run(()=>this.router.navigateByUrl('/customer-list'))
    });
  }

}
