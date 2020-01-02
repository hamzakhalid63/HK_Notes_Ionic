import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/sdk/core/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit {

  constructor(public popover: PopoverController, private authService: AuthService) { }

  ngOnInit() {}

  close() {
    this.popover.dismiss();
  }

  logout() {
    this.authService.logout();
  }
}
