import { debounceTime, startWith, Subscription, switchMap } from 'rxjs';
import { ProfileService } from './../../../data/services/profile.service';
import { SearchPage } from './../search-page';
import { Component, inject, input, OnDestroy } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { profileActions } from '../../../data';


@Component({
  selector: 'app-profile-filters',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile-filters.html',
  styleUrl: './profile-filters.scss'
})
export class ProfileFilters implements OnDestroy {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)
  store = inject(Store)

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
        //takeUntilDestroyed() //убить ради избежания утечек памяти, ниже альтернатива
      )
      .subscribe(formValue => {
        this.store.dispatch(profileActions.filterEvents({filters: formValue}))
      }) //пустой просто чтоб была подпска ??? 
  }

  ngOnDestroy(): void {
    this.searchFormSub.unsubscribe()
  }
}

