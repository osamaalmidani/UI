import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RegisterService } from 'src/services/register.service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public fb: FormBuilder, private registerService: RegisterService, private router: Router) { }


  caseExists = false;

  profileForm: FormGroup;

  firstName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)

  ]);

  lastName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);

  caseNumber = new FormControl('', [
    Validators.required,
    Validators.pattern("[0-9]{8}$")

  ]);

  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.pattern("^(07)[0-9]{8}$"),
  ]);

  emailAddress = new FormControl('', [
    Validators.email,
    Validators.maxLength(60)

  ]);


  matcher = new MyErrorStateMatcher();


  ngOnInit() {
    this.reactiveForm();
  }

  reactiveForm() {
    this.profileForm = this.fb.group({

      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)

      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      caseNumber: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]{8}$")

      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern("^(07)[0-9]{8}$"),
      ]),
      emailAddress: new FormControl('', [
        Validators.email,
        Validators.maxLength(60)

      ])
    })
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.registerService.RegisterCustomer(this.profileForm.value).subscribe((response) => {
        if (response == 'OK') {
          this.router.navigate(['/thankyou']);
        }
        if (response == 'exists') {
          this.caseExists = true;
        }
      });
    }
  }

}
