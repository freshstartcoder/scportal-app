import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
//import countryData from './server/Countries.json';

@Component({
  selector: 'app-customs',
  templateUrl: './customs.component.html',
  styleUrls: ['./customs.component.css']
})
export class CustomsComponent /*implements OnInit*/ {
 // email = new FormControl('', [Validators.required, Validators.email]);
  trlno = new FormControl('', [Validators.required]);
  movType = new FormControl('', [Validators.required]);
  despatchdate =new FormControl('', [Validators.required]);
  transID =new FormControl('', [Validators.required]);
  convRef =new FormControl('', [Validators.required]);s
  arrivaldatetime =new FormControl('', [Validators.required]);
  placeLoading=new FormControl('', [Validators.required]);
  sealNo =new FormControl('', []);
  placeunLoading=new FormControl('', [Validators.required]);


  getErrorMessage() {
    if (/*this.email.hasError('required') || */this.trlno.hasError('required') || this.despatchdate.hasError('required')|| this.movType.hasError('required')
    || this.transID.hasError('required')|| this.convRef.hasError('required')|| this.arrivaldatetime.hasError('required')|| this.placeLoading.hasError('required')
    || this.placeunLoading.hasError('required')) {
      return 'You must enter a valid value' ;
    }

   // return this.email.hasError('email') ? 'Not a valid email' : '';
  }

 /* constructor() { }

  ngOnInit(): void {
  }
*/
}
