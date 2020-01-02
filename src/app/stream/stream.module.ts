import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamPage } from './stream.page';
import { AddnewmaterialComponent } from './addnewmaterial/addnewmaterial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: StreamPage }])
  ],
  declarations: [StreamPage]
})
export class StreamPageModule {}
