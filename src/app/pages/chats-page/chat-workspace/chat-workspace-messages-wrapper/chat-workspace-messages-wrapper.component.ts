import { ChatsService } from './../../../../data/services/chats.services';
import { Component, inject, input, signal } from '@angular/core';
import { ChatWorkspaceMessageComponent } from "./chat-workspace-message/chat-workspace-message.component";
import { MessageInputComponent } from "../../../../common-ui/message-input/message-input.component";
import { Chat, Message } from '../../../../data/interfaces/chats.interfaces';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatsService)
  chat = input.required<Chat>()

  messages = this.chatsService.activeChatMessages

  async onSendMessage(messageText: string) {
    await firstValueFrom(this.chatsService.sendMessage(this.chat().id, messageText))

    await firstValueFrom(this.chatsService.getChatsById(this.chat().id))
  }
}
