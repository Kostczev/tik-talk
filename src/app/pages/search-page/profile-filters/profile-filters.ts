import { debounceTime, startWith, Subscription, switchMap } from 'rxjs';
import { ProfileService } from './../../../data/services/profile.service';
import { SearchPage } from './../search-page';
import { Component, inject, input, OnDestroy } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-profile-filters',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile-filters.html',
  styleUrl: './profile-filters.scss'
})
export class ProfileFilters implements OnDestroy {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  })

  searchFormSub!: Subscription

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),  //на каждом вводе данных ожидаем по 300мс если приходят новые данные ничего не отправляем и запускаем таймер по новой
        switchMap(formValue => {
          return this.profileService.filterProfiles(formValue)
        }),
        //takeUntilDestroyed() //убить ради избежания утечек памяти, ниже альтернатива
      )
      .subscribe() //пустой просто чтоб была подпска ??? 
  }

  ngOnDestroy(): void {
    this.searchFormSub.unsubscribe()
  }
}

