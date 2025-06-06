import { Routes } from '@angular/router'

export const routes: Routes = [

  { path: 'invite/:uid', loadComponent: () => import('./prepare-invite/prepare-invite').then(m => m.PrepareInviteComponent) },
]
