import { Component, inject } from '@angular/core';
import { ProfileCard } from '../../common-ui/profile-card/profile-card';
import { ProfileFilters } from "./profile-filters/profile-filters";
import { Store } from '@ngrx/store';
import { selectFilteredProfiles } from '../../data';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFilters],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
  store = inject(Store)
  profiles = this.store.selectSignal(selectFilteredProfiles)

  constructor() {
    
  }
}
