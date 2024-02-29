import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { User } from '../../models/user';
import { SpinnerService } from '../../services/spinner.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimeoutService } from '../../services/timeout.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  errorMsg!: string;
  destroyed = new Subject();

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService,
              private spinnerService: SpinnerService,
              private timeoutService: TimeoutService) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || '/home';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.spinnerService.showSpinner();
    console.log(this.loginForm);
    const user: User = this.loginForm.value;
    
   // this.authService.login(user)
   // for firebase use loginToDb method
    this.authService.login(user).pipe(
      takeUntil(this.destroyed)
    ).subscribe((data: any) => {
      if (data) {
      //  this.timeoutService.initTimeout();
        this.spinnerService.hideSpinner();
        this.router.navigate([this.returnUrl]);
      }
    }, (error: any) =>  {
      this.errorMsg = error;
      this.spinnerService.hideSpinner();
    });
  }

  ngOnDestroy() {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

}
