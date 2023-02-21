import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { SendEmailService } from './sendEmail.service.ts/sendEmail.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public uploadForm: any;

 

  constructor(public senEmailService:SendEmailService,public loadingService:LoadingService, private formBuilder:FormBuilder, 
    ){
      this.uploadForm=this.formBuilder.group({
        name:[null],
        phone:[null],
        email:[null,[Validators.required]],
        message:[null,[Validators.required]]
      });
  }

  
  ngOnInit(): void {
  }

  get f(){ return this.uploadForm.controls;}

  submitted=false;
  sendEmail(){
    this.submitted=true;
    if(this.uploadForm.invalid){
      return;
    }else{
      this.loadingService.setLoading(true);

        this.senEmailService.sendEmail(this.uploadForm.value).subscribe(
          result => {
            this.loadingService.setLoading(false);
            alert('ACCION EXITOSA');
         },
         error=>{
          alert('ERROR DE SERVIDOR');
          this.loadingService.setLoading(false);
         });         
    }
  }

}