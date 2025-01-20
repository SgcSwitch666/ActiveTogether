import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Validators, FormBuilder } from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';      
import { ReactiveFormsModule } from '@angular/forms';  
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
declare var bootstrap: any;

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,   
    MatNativeDateModule,  
    ReactiveFormsModule, 
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    
  ],  
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})

export class AddDataComponent implements OnInit {
  constructor(
    private formbuilder: FormBuilder, 
    public storeService: StoreService, 
    private backendService: BackendService
  ) {}
  
  public registrationForm: any;
  public submitted = false;

  ngOnInit(): void {


    this.registrationForm = this.formbuilder.group({
      vorname: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      courseId: ['', [Validators.required]],
      birthdate: [null, [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.valid) {
      this.backendService.addRegistration(this.registrationForm.value, this.storeService.currentPage);
      const toastElement = document.getElementById('successToast');
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
      }
    else{
      console.log(this.registrationForm.errors);
      alert("Fehler");
    }
  }
  
}

