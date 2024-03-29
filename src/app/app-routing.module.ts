import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./views/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./views/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./views/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./views/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./layouts/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./views/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./views/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./views/payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./views/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'welcome/:status',
    loadChildren: () => import('./views/auth/welcome/welcome.module').then( m => m.WelcomePageModule)
  },  {
    path: 'payments-pop',
    loadChildren: () => import('./views/payments-pop/payments-pop.module').then( m => m.PaymentsPopPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./views/help/help.module').then( m => m.HelpPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
