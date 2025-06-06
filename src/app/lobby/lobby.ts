import { Component, signal } from '@angular/core'

import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-lobby',
  imports: [MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './lobby.html',
  styleUrl: './lobby.css'
})
export class Lobby {

  isMicrophoneEnabled = signal(false)
  isHeadphonesEnabled = signal(false)

  private microphoneStream: MediaStream | null = null

  toggleHeadphones() {
    this.isHeadphonesEnabled.set(!this.isHeadphonesEnabled())
  }

  async toggleMicrophone() {
    this.microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    this.isMicrophoneEnabled.set(!this.isMicrophoneEnabled())
    if (this.isMicrophoneEnabled()) {
     return
    } else if (this.microphoneStream) {
      this.microphoneStream.getAudioTracks().forEach(track => track.stop())
      this.microphoneStream.getTracks().forEach(track => track.stop())
    }
  }

}
