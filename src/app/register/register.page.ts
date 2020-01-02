import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../sdk/custom/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  signUpFormGroup: FormGroup;
  loading = false;
  toastMessage = '';
  selection = false;
  @ViewChild('classKey', {static: false}) classKey: FormControl;

  constructor(
    // private toastController: ToastController,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertController: AlertController
  ) {}
  // async presentToast() {
  //   const toast = await this.toastController.create({
  //     message: 'Your settings have been saved.',
  //     duration: 2000
  //   });
  //   toast.present();
  // }
   ngOnInit() {
    this.formInitializer();
  }
  formInitializer() {
    this.signUpFormGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      conf_password: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          this.matchOtherValidator('password')
        ]
      ],
      role: [null, [Validators.required]]
    });
  }
  matchOtherValidator(otherControlName: string) {
    return (control: AbstractControl): { [key: string]: any } => {
      const otherControl: AbstractControl = control.root.get(otherControlName);

      if (otherControl) {
        const subscription: Subscription = otherControl.valueChanges.subscribe(
          () => {
            control.updateValueAndValidity();
            subscription.unsubscribe();
          }
        );
      }

      return otherControl && control.value !== otherControl.value
        ? { match: true }
        : null;
    };
  }

  adminSelected() {
    this.selection = false;
    this.signUpFormGroup.removeControl('key');
  }
  memberSelected() {
    this.selection = true;
    this.signUpFormGroup.addControl('key', this.formBuilder.control(this.classKey,
      ([Validators.required, Validators.minLength(6)])));
  }

  save() {
    this.loading = true;

    this.userService.userRegister(this.signUpFormGroup.value).subscribe(
      data => {
        console.log('got response from server', data);
        this.loading = false;
        this.resetForm();
        this.router.navigateByUrl('/login');
      },
      error => {
        this.loading = false;
        this.registerAlert(error.error.message);
      }
    );
  }

  async registerAlert(alertMessage) {

    const alert = await this.alertController.create({
      header: 'Signup',
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
    this.signUpFormGroup.reset();
  }
}
