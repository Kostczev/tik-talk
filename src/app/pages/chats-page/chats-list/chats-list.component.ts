import { LastMessageRes } from './../../../data/interfaces/chats.interfaces';
import { AsyncPipe } from '@angular/common';
import { ChatsService } from './../../../data/services/chats.services';
import { Component, inject, input } from '@angular/core';
import { ChatsButtonComponent } from '../chats-button/chats-button.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-chats-list',
  imports: [ChatsButtonComponent, AsyncPipe, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {
  chatsService = inject(ChatsService)

  filterChatsControl = new FormControl('')

  chats$ = this.chatsService.getMyChats()
    .pipe(
      switchMap(chats => {
        return this.filterChatsControl.valueChanges
          .pipe(
            startWith(''),
            debounceTime(300),
            map(inputValue => {
              return chats.filter(chat => {
                const fullName = `${chat.userFrom.lastName} ${chat.userFrom.firstName}`.toLowerCase();
                return fullName.includes(inputValue?.toLowerCase() || '');
              })
            })
          )
      })
    )
}
