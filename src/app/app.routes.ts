import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./lobby/lobby').then(m => m.LobbyComponent),
  },
  {
    title: 'Room',
    path: 'rooms/:uid',
    loadComponent: () => import('./room/room').then(m => m.RoomComponent),
  },
  {
    title: 'Invite',
    path: 'rooms/:uid/prepare',
    loadComponent: () => import('./prepare-invite/prepare-invite').then(m => m.PrepareInviteComponent),
  },
]
