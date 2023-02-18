import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Add_User } from 'src/app/contracts/users/add_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService: CustomToastrService
    ) { }

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
  async onSubmit(user : User){
    this.submitted = true  
    if(this.form.invalid)
      return
    const result : Add_User = await this.userService.add(user); 
    
    if(result.succeded)
      this.toastrService.message(result.message,"Kullanıcı kaydı başarılı",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.BottomRight
      })
    
      else
      this.toastrService.message(result.message,"Hata",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.BottomRight
  })
  }
}