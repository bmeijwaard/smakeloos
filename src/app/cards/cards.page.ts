import { CardsService } from './cards.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Card } from '../_core/models/card.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonHelper } from '../_core/helpers/button.helper';

@Component({
  selector: 'app-cards',
  templateUrl: 'cards.page.html',
  styleUrls: ['cards.page.scss']
})
export class CardsPage implements OnInit {
  card$: Observable<Array<Card>>;
  isLoading: boolean = null;
  loaderSub: Subscription;

  title = 'Spiritmonger';

  searchForm: FormGroup;
  namePart: FormControl;

  slideOpts = {
    mode: 'md',
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    preloadImages: true,
    lazy: {
      loadPrevNext: true
    },
    scrollbar: {
      el: '.swiper-scrollbar'
    }
  };

  constructor(private builder: FormBuilder, private cardService: CardsService, private zone: NgZone) {}

  ngOnInit() {
    this.createForm();
    this.card$ = this.cardService.cards;
    this.loaderSub = this.cardService.isLoading.subscribe(value => {
      this.isLoading = value;
      this.zone.run(() => {
        if (this.isLoading === false) {
          // ButtonHelper.toggleButtonById('searchBtn', 'GO');
        } else {
          // ButtonHelper.toggleButtonById('searchBtn');
        }
      });
    });
  }

  ngOnDestroy() {
    this.loaderSub.unsubscribe();
  }

  showMore = (): void => {
    this.cardService.nextPage();
  };

  createForm() {
    this.namePart = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.searchForm = this.builder.group({
      namePart: this.namePart
    });
  }

  updateName = () => {
    this.namePart.markAsTouched();
    if (!this.searchForm.valid || this.isLoading) {
      return;
    }
    this.cardService.startSearch(this.namePart.value);
    this.title = this.namePart.value;
  };
}
