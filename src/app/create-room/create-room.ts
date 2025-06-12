import { Component, inject, computed, signal, type OnInit, type OnDestroy } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { Clipboard } from '@angular/cdk/clipboard'
import { uid, noop } from 'radashi'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-room',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './create-room.html',
  styleUrl: './create-room.css'
})
export class CreateRoomComponent implements OnInit, OnDestroy {
  constructor(
    private clipboard: Clipboard,
  ) {}

  private snackbar = inject(MatSnackBar)
  private router = inject(Router)
  protected inviteHash = signal<string>('')
  private inviteLink = computed(() => {
    if (this.inviteHash()) {
      return `${globalThis.location.origin}/rooms/${this.inviteHash()}/prepare`
    }
    return ''
  })

  protected createInviteLink() {
    if (!this.inviteHash()) {
      this.inviteHash.set(uid(12))
    }
    if (this.clipboard.copy(this.inviteLink())) {
      this.snackbar.open(`Ссылка скопирована`, 'Закрыть', {
        duration: 3000,
      })

      this.router.navigate(['/rooms', this.inviteHash(), 'prepare'])
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
