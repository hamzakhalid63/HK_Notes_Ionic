import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { StreamPopoverComponent } from './stream-popover/stream-popover.component';
import { AddnewmaterialComponent } from './addnewmaterial/addnewmaterial.component';
import { ModalController, ToastController } from '@ionic/angular';
import { MaterialService } from 'src/sdk/custom/material.service';
import { ClassService } from 'src/sdk/custom/class.service';

@Component({
  selector: 'app-stream',
  templateUrl: 'stream.page.html',
  styleUrls: ['stream.page.scss']
})
export class StreamPage implements OnInit {

  materials = [];
  loading = false;

  constructor(
    public popoverController: PopoverController,
    private modalController: ModalController,
    private classService: ClassService,
    private materialService: MaterialService
  ) { }

  async ngOnInit() {
    this.getAllMaterials();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: StreamPopoverComponent,
      event: ev,
      translucent: true,
      componentProps: { homeRef: this }
    });
    return await popover.present();
  }

  async openAddMaterialModal() {
    const modal = await this.modalController.create({
      component: AddnewmaterialComponent,
    });
    modal.onDidDismiss().then(data => {
      console.log('dismissed', data);
      this.getAllMaterials();
    });
    await modal.present();
  }

  async getAllMaterials() {
    this.loading = true;

    const observable = await this.classService.getCurrentClass();
    observable.subscribe(
      (data: any) => {
        this.materials = data.data.materials;
      },
      err => {
        console.log('err', err);
      }
    );
  }
}
