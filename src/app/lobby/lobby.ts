import { Component, signal } from '@angular/core'

import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'

@Component({
  selector: 'app-lobby',
  imports: [MatDividerModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './lobby.html',
  styleUrl: './lobby.css'
})
export class LobbyComponent {


}
