import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', loadComponent: () => import('./create-room/create-room').then(m => m.CreateRoomComponent) },
  { title: 'Invite', path: 'invite/:uid', loadComponent: () => import('./prepare-invite/prepare-invite').then(m => m.PrepareInviteComponent) },
]
