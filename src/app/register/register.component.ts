import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router,
              private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    if (this.registerForm.valid) {
      const userFromForm = Object.assign({}, this.registerForm.value);
      const userForRegister =  {username: userFromForm.username, email: userFromForm.email, password: userFromForm.password};
      this.authService.register(userForRegister).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error.message);
      }, () => {
        this.authService.login({email: userFromForm.email, password: userFromForm.password}).subscribe(() => {
          this.router.navigate(['/articles']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
