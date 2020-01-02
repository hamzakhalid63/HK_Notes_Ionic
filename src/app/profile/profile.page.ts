import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from './profile-popover/profile-popover.component';
import { ClassService } from 'src/sdk/custom/class.service';
import { AuthService } from 'src/sdk/core/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  loading = false;
  user: User;

  constructor(
    public popoverController: PopoverController,
    private classService: ClassService,
    private authService: AuthService) {}

  async ngOnInit() {
    this.getCurrentUser();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
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
}
