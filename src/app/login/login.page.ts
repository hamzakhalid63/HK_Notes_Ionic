import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../sdk/core/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../sdk/custom/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginFormGroup: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.loginFormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  save() {
    this.loading = true;
    const loginData = this.loginFormGroup.value;
    console.log(loginData);

    this.userService.userLogin(loginData).subscribe(
      data => {
        console.log('Get Response from Serve', data);
        this.loading = false;
        this.authService.saveTokenToStorage(data.token);

        this.resetForm();
        this.router.navigateByUrl('/tabs');
      },
      error => {
        this.loading = false;
        this.loginAlert(error.error.message);
      }
    );

  }

  async loginAlert(alertMessage) {

    const alert = await this.alertController.create({
      header: 'Login ',
      message: alertMessage,

      buttons: [
        {
          text: 'Close'
        }
      ]
    });

    alert.present();
  }

  resetForm() {
    this.loginFormGroup.reset();
  }
}
