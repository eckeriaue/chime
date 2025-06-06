import { Component } from '@angular/core'
import { StreamVideoAndMicSelfMonitoringComponent } from '../stream-video-and-mic-self-monitoring-component/stream-video-and-mic-self-monitoring-component'

@Component({
  selector: 'app-health-check',
  imports: [StreamVideoAndMicSelfMonitoringComponent],
  templateUrl: './health-check.html',
  styleUrl: './health-check.css'
})
export class HealthCheckComponent {

}
