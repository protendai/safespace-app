import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsPopPageRoutingModule } from './payments-pop-routing.module';

import { PaymentsPopPage } from './payments-pop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsPopPageRoutingModule
  ],
  declarations: [PaymentsPopPage]
})
export class PaymentsPopPageModule {}
