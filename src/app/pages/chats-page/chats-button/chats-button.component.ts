import { Component, input } from '@angular/core';
import { AvatarCircle } from "../../../common-ui/avatar-circle/avatar-circle";
import { LastMessageRes } from '../../../data/interfaces/chats.interfaces';

@Component({
  selector: 'button[chats]',
  imports: [AvatarCircle],
  templateUrl: './chats-button.component.html',
  styleUrl: './chats-button.component.scss'
})
export class ChatsButtonComponent {
  chat = input<LastMessageRes>()


}
