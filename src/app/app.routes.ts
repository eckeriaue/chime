import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./create-room/create-room').then(m => m.CreateRoomComponent),
  },
  {
    title: 'Room',
    path: 'room/:uid',
    loadComponent: () => import('./room/room').then(m => m.RoomComponent),
  },
  {
    title: 'Invite',
    path: 'room/:uid/prepare',
    loadComponent: () => import('./prepare-invite/prepare-invite').then(m => m.PrepareInviteComponent),
  },
]
