import {
  Component,
  model,
  inject,
  DOCUMENT,
  Inject,
} from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { uid } from 'radashi'
import { hc } from ':shimmer'

@Component({
  selector: 'app-create-room-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './create-room-dialog.html',
  styleUrl: './create-room-dialog.css'
})
export class CreateRoomDialogComponent {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  protected roomName = model('Комната Комната')
  protected roomPassword = model<string | undefined>()
  protected roomUid = uid(12)
  private router = inject(Router)
  private dialogRef = inject(MatDialogRef<CreateRoomDialogComponent>)

  private get json() {
    return {
      roomName: this.roomName(),
      roomPassword: this.roomPassword() || null,
      roomUid: this.roomUid,
    }
  }

  async createRoom() {

    const { ok } = await hc.rooms.create.$post({ json: this.json })

    if (ok) {
      this.dialogRef.close()
      this.router.navigate(['/rooms', this.roomUid, 'prepare'])
    }
  }
}
