import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MemberPopoverComponent } from './member-popover/member-popover.component';
import { ClassService } from 'src/sdk/custom/class.service';
import { AuthService } from 'src/sdk/core/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-member',
  templateUrl: 'member.page.html',
  styleUrls: ['member.page.scss']
})
export class MemberPage implements OnInit {

  admin: User;
  members: User[] = [];
  users = [];
  loading = false;
  user: User;
  skeletonlist = [1, 2, 3, 4, 5];
  classKey;

  constructor(
    public popoverController: PopoverController,
    private classService: ClassService,
    private authService: AuthService,
    private alertController: AlertController) { }

  async ngOnInit() {
    this.getCurrentUser();
    this.getAllUsers();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MemberPopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async getCurrentUser() {
    const token = await this.authService.getTokenFromStorage();
    const decodedtoken = this.authService.getDecodedAccessToken(token);
    const userId = decodedtoken.data._id;

    this.user = decodedtoken.data;
  }

  async getAllUsers() {
    this.loading = true;

    const observable = await this.classService.getCurrentClass();
    observable.subscribe(
      (data: any) => {

        this.loading = false;
        this.classKey = data.data.key;
        this.users = [];
        this.members = [];
        this.users = data.data.users;
        this.users.forEach(user => {
          if (user.role === 'admin') {
            this.admin = user;
          } else if (user.role === 'member') {
            this.members.push(user);
          }
        });
      },
      err => {
        console.log('err', err);
      }
    );
  }

  async confirmation(member) {

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to remove ${member.name}?`,

      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Okay',
          handler: () => {
            this.deleteUser(member);
          }
        }
      ]
    });

    alert.present();
  }

  async deleteUser(user) {
    const observable = await this.classService.deleteUser(user);
    observable.subscribe(
      (data: any) => {
        this.getAllUsers();
      },
      err => {
        console.log('err', err);
      }
    );
  }

}
