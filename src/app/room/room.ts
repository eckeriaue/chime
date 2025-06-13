import { Component, OnInit, signal, PLATFORM_ID, Inject } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import {
  MatProgressBarModule
} from '@angular/material/progress-bar'


@Component({
  selector: 'app-room',
  imports: [MatProgressBarModule],
  templateUrl: './room.html',
  styleUrl: './room.css'
})
export class RoomComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  protected pc: RTCPeerConnection | null = null
  public loading = signal(true)

  async ngOnInit(): Promise<void> {
    if (this.pc === null && isPlatformBrowser(this.platformId)) {
      const socket = new WebSocket('ws://localhost:4444')
      const persmissionMic = await navigator.permissions.query({ name: 'microphone' })
      const permissionCam = await navigator.permissions.query({ name: 'camera' })
      this.pc = new RTCPeerConnection()
      const stream = await navigator.mediaDevices.getUserMedia({
        video: permissionCam.state === 'granted',
        audio: persmissionMic.state === 'granted'
      })
      stream.getTracks().forEach(track => {
        this.pc!.addTrack(track, stream)
      })

      const offer = await this.pc!.createOffer()
      await this.pc!.setLocalDescription(offer)

      socket.addEventListener('open', function() {
        this.send(
          JSON.stringify({
          type: 'offer',
            sdp: offer.sdp
          })
        )
      }, { once: true })

      this.pc!.addEventListener('icecandidate', event => {
        if (event.candidate) {
          socket.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }))
        }
      })

    }


  }

}
