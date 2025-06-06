import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', loadComponent: () => import('./create-invite/create-invite').then(m => m.CreateInviteComponent) },
  { path: 'invite/:uid', loadComponent: () => import('./prepare-invite/prepare-invite').then(m => m.PrepareInviteComponent) },
]
