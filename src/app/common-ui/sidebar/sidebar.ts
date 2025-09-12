import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { AsyncPipe } from '@angular/common';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIconComponent, SubscriberCard, RouterLink, AsyncPipe, ImgUrlPipe, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  profileService = inject(ProfileService)
  subscribers$ = this.profileService.getSubscribersShortList()
  me = this.profileService.me

  menuItems = [
    {
      lable: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      lable: 'Чаты',
      icon: 'chat',
      link: 'chats'
    },
    {
      lable: 'Поиск',
      icon: 'search',
      link: 'search'
    }
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
