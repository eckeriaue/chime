import { Component, OnInit, signal, PLATFORM_ID, Inject } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { hc } from ':shimmer'
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
    if (isPlatformBrowser(this.platformId)) {
    }
  }

}
