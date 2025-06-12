
import { Component, computed, ElementRef, inject, signal, ViewChild, type WritableSignal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import {MatSnackBar} from '@angular/material/snack-bar'
import { RouterLink, Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-self-monitoring',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './self-monitoring.html',
  styleUrl: './self-monitoring.css'
})
export class StreamVideoAndMicSelfMonitoringComponent {

  constructor(
    private route: ActivatedRoute
  ) {}

  @ViewChild('videoElement')
  protected videoElement: ElementRef<HTMLVideoElement> | undefined
  protected videoStream: WritableSignal<MediaStream | null> = signal(null)
  protected videoLoading = signal(false)
  private snackbar = inject(MatSnackBar)

  protected hash = computed(() => {
    return this.route.snapshot.paramMap.get('uid')
  })

  protected micStream: WritableSignal<MediaStream | null> = signal(null)
  protected micLoading = signal(false)

  async toggleVideo() {
    this.videoLoading.set(true)
    if (this.videoStream()) {
      this.videoStream()!.getTracks().forEach(track => track.stop())
      this.videoStream()!.getVideoTracks().forEach(track => track.stop())
      this.videoStream.set(null)
      if (this.videoElement) {
        this.videoElement.nativeElement.srcObject = null
      }
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        .catch(error => {
          console.error('Error accessing camera:', error)
          this.snackbar.open('Ошибка доступа к камере', 'Закрыть', {
            duration: 3000
          })
          return null
        })
      if (stream) {
        this.videoStream.set(stream)
        if (this.videoElement) {
          this.videoElement.nativeElement.srcObject = stream
        }
      }
    }
    this.videoLoading.set(false)
  }

  async toggleMic() {
    this.micLoading.set(true)
    if (this.micStream()) {
      this.micStream()!.getTracks().forEach(track => track.stop())
      this.micStream.set(null)
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        .catch(error => {
          console.error('Error accessing microphone:', error)
          this.snackbar.open('Ошибка доступа к микрофону', 'Закрыть', {
            duration: 3000
          })
          return null
        })
      if (stream) {
        this.micStream.set(stream)
      }
    }
    this.micLoading.set(false)
  }
}
