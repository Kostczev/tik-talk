import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Chat, LastMessageRes, Message } from '../interfaces/chats.interfaces';
import { ProfileService } from './profile.service';
import { map } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ChatsService {
    http = inject(HttpClient)
    me = inject(ProfileService).me

    activeChatMessages = signal<Message[]>([])

    baseApiUrl = 'https://icherniakov.ru/yt-course/'
    chatsApiUrl = `${this.baseApiUrl}chat/`
    messagesApiUrl = `${this.baseApiUrl}message/`

    createChat(userId: number) {
        return this.http.post<Chat>(`${this.chatsApiUrl}${userId}`, {})
    }
    
    getMyChats() {
        return this.http.get<LastMessageRes[]>(`${this.chatsApiUrl}get_my_chats/`)
    }

    getChatsById(chatId: number) {
        return this.http.get<Chat>(`${this.chatsApiUrl}${chatId}`)
            .pipe(
                map(chat => {
                    const patchedMessagas = chat.messages.map(message => {
                        return {
                            ...message,
                            user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
                            isMine: message.userFromId === this.me()!.id
                        }
                    })

                    this.activeChatMessages.set(patchedMessagas)
                    
                    return {
                        ...chat,
                        companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst,
                        messages: patchedMessagas
                    }
                })
            )
    }
    
    sendMessage(chatId: number, message: string) {
        return this.http.post<Message>(`${this.messagesApiUrl}send/${chatId}`, {}, {
            params: {
                message
            }
        })
    }


}