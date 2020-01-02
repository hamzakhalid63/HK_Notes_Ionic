import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { IsLoginGuard } from 'src/sdk/custom/guards/islogin.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'stream',
        canActivate: [IsLoginGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../stream/stream.module').then(m => m.StreamPageModule)
          }
        ]
      },
      {
        path: 'member',
        canActivate: [IsLoginGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../member/member.module').then(m => m.MemberPageModule)
          }
        ]
      },
      {
        path: 'profile',
        canActivate: [IsLoginGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        canActivate: [IsLoginGuard],
        redirectTo: '/tabs/stream',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    canActivate: [IsLoginGuard],
    redirectTo: '/tabs/stream',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
