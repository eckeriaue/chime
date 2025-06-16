import {
  Component,
  inject,
  resource,
  ChangeDetectionStrategy,
} from '@angular/core'

import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import {
  MatDialog
} from '@angular/material/dialog'
import { CreateRoomDialogComponent } from '../create-room-dialog/create-room-dialog'
import { hc } from ':shimmer'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-lobby',
  imports: [
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './lobby.html',
  styleUrl: './lobby.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyComponent {
  readonly createRoomDialog = inject(MatDialog)
  protected rooms = resource({
    loader: () => hc.rooms.$get().then(res => res.json())
  })

  openCreateRoomDialog() {
    this.rooms.value()
    this.createRoomDialog.open(CreateRoomDialogComponent, {
      width: '600px',
    })
  }
}
