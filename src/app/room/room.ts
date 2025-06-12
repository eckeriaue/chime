import { Component, OnInit, resource, signal, PLATFORM_ID, Inject } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import {
  MatProgressBarModule
} from '@angular/material/progress-bar'
import { constrainedMemory } from 'node:process'


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
      let cameraStream
      let audioStream
      if (permissionCam.state === 'granted') {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: true })
      }
      if (persmissionMic.state === 'granted') {
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      }
      ;[
        ...(cameraStream ? cameraStream.getTracks() : []),
        ...(audioStream ? audioStream.getTracks() : []),
      ].forEach(track => {
        this.pc!.addTrack(track)
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
