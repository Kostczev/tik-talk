import { ChatsService } from './../../data/services/chats.services';
import { Component, inject, signal } from '@angular/core';
import { ProfileHeader } from "../../common-ui/profile-header/profile-header";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { ImgUrlPipe } from '../../helpers/pipes/img-url-pipe';
import { PostFeed } from "./post-feed/post-feed";

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, AsyncPipe, RouterLink, SvgIconComponent, ImgUrlPipe, PostFeed],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss'
})
export class ProfilePage {
  profileService = inject(ProfileService)
  chatsService = inject(ChatsService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  me$ = toObservable(this.profileService.me)
  subscribers$ = this.profileService.getSubscribersShortList(5)

  isMyPages = signal(false)

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        this.isMyPages.set(id === 'me' || id === this.profileService.me()?.id)
        if (id === 'me') return this.me$

        return this.profileService.getAccount(id)
      })
    )

  async sendMessage(userId: number) {
    firstValueFrom(this.chatsService.createChat(userId))
      .then((res) => {
        this.router.navigate(['/chats', res.id])
      })
  }
}
