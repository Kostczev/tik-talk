import { Profile } from './../../../../data/interfaces/profile.interface';
import { Component, input } from '@angular/core';
import { AvatarCircle } from "../../../../common-ui/avatar-circle/avatar-circle";

@Component({
  selector: 'app-chat-workspace-header',
  imports: [AvatarCircle],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss'
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>() 
}
