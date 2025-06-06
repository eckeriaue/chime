import { Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { Clipboard } from '@angular/cdk/clipboard'
import { uid } from 'radashi'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-create-room',
  imports: [MatButtonModule],
  templateUrl: './create-room.html',
  styleUrl: './create-room.css'
})
export class CreateRoomComponent {
  constructor(
    private clipboard: Clipboard,
  ) {}

  private snackbar = inject(MatSnackBar)
  private inviteLink?: string

  protected createInviteLink(): string {
    if (!this.inviteLink) {
      const origin = window.location.origin
      this.inviteLink = `${origin}/invite/${uid(12)}`
    }
    if (this.clipboard.copy(this.inviteLink)) {
      this.snackbar.open(`Ссылка ${this.inviteLink} скопирована`, 'Закрыть', {
        duration: 3000,
      });
    }
    return this.inviteLink
  }
}
