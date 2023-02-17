import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  form:FormGroup
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:["",[Validators.required,Validators.minLength(3)]],
      surname:["",[Validators.required,Validators.minLength(2)]],
      userName:["",[Validators.required,Validators.minLength(3)]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.minLength(8)]]
    })
  }

  get component(){
    return this.form.controls;
  }

  submitted:boolean = false;
  onSubmit(data : User){
    this.submitted = true  
    console.log(data);
      
  }
}
