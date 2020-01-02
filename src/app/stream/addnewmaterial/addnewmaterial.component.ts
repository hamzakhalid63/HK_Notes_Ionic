import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { MaterialService } from 'src/sdk/custom/material.service';

// import { BooksService } from './../../../sdk/custom/books.service';

@Component({
  selector: 'app-addnewmaterial',
  templateUrl: './addnewmaterial.component.html',
  styleUrls: ['./addnewmaterial.component.scss']
})
export class AddnewmaterialComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private materialService: MaterialService
    // private booksService: BooksService
  ) {}

  addNewMaterialForm: FormGroup;
  loading = false;
  // @Input() book;
  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.addNewMaterialForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
  }

  async addNew() {
    const observable = await this.materialService.addMaterial(
      this.addNewMaterialForm.value
    );
    observable.subscribe(
      async data => {
        console.log('got response from server', data);
        const name = this.addNewMaterialForm.controls['name'].value;
        const toast = await this.toastController.create({
          message: `${name} has been added successfully.`,
          duration: 3500
        });
        toast.present();
        this.loading = false;
        this.addNewMaterialForm.reset();
        // Optional

        this.modalCtrl.dismiss();
      },
      error => {
        this.loading = false;
        this.modalCtrl.dismiss();

        console.log('error', error);
      }
    );
  }

  save() {
    this.loading = true;
    this.addNew();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
