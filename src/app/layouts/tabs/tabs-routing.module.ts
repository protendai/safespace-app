import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'Home',
        loadChildren: () => import('../../views/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'Profile',
        loadChildren: () => import('../../views/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'Notifications',
        loadChildren: () => import('../../views/notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
      {
        path:'',
        redirectTo: '/tabs/Home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
