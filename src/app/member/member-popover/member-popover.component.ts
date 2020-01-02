import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/sdk/core/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './member-popover.component.html',
  styleUrls: ['./member-popover.component.scss'],
})
export class MemberPopoverComponent implements OnInit {

  constructor(public popover: PopoverController, private authService: AuthService) { }

  ngOnInit() {}

  close() {
    this.popover.dismiss();
  }

  logout() {
    this.authService.logout();
    this.close();
  }
}
