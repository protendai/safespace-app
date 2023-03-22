import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsPopPage } from './payments-pop.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsPopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsPopPageRoutingModule {}
