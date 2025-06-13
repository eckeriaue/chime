import {
  Component,
  model,
  inject
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

  protected roomName = model('Комната Комната')
  protected roomPassword = model<string | undefined>()
  protected staticUid = uid(12)
  private router = inject(Router)
  private dialogRef = inject(MatDialogRef<CreateRoomDialogComponent>)

  async createRoom(event: SubmitEvent) {
    // create room here
    this.dialogRef.close()
    this.router.navigate(['/rooms', this.staticUid, 'prepare'])
  }
}
