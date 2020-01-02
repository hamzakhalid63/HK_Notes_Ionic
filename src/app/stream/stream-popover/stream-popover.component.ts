import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/sdk/core/auth.service';
import { AddnewmaterialComponent } from '../addnewmaterial/addnewmaterial.component';
import { ModalController, ToastController } from '@ionic/angular';
import { StreamPage } from '../stream.page';

@Component({
  selector: 'app-popover',
  templateUrl: './stream-popover.component.html',
  styleUrls: ['./stream-popover.component.scss'],
})
export class StreamPopoverComponent implements OnInit {

  @Input() homeRef: StreamPage;
  constructor(
    public popover: PopoverController,
    private authService: AuthService
    ) { }

  ngOnInit() {}

  createMaterial() {
    this.homeRef.openAddMaterialModal();
    this.close();
  }

  close() {
    this.popover.dismiss();
  }

  logout() {
    this.close();
    this.authService.logout();
    this.close();
  }
}
