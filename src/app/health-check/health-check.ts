import { Component } from '@angular/core'
import { StreamVideoAndMicSelfMonitoringComponent } from '../self-monitoring/self-monitoring'

@Component({
  selector: 'app-health-check',
  imports: [StreamVideoAndMicSelfMonitoringComponent],
  templateUrl: './health-check.html',
  styleUrl: './health-check.css'
})
export class HealthCheckComponent {

}
