import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core'

import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import {
  MatDialog
} from '@angular/material/dialog'
import { CreateRoomDialogComponent } from '../create-room-dialog/create-room-dialog'

@Component({
  selector: 'app-lobby',
  imports: [
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './lobby.html',
  styleUrl: './lobby.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyComponent {
  readonly createRoomDialog = inject(MatDialog)


  openCreateRoomDialog() {
    this.createRoomDialog.open(CreateRoomDialogComponent, {
      width: '600px',
    })
  }
}
