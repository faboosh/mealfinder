import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchService {

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  private categorySource = new BehaviorSubject('');
  currenctCategory = this.categorySource.asObservable();
  private enabledSource = new BehaviorSubject(true);
  enabled = this.enabledSource.asObservable();

  constructor() {}

  changeMessage(message:string) {
    this.messageSource.next(message)
  }

  changeCategory(message:string) {
    this.categorySource.next(message);
  }

  toggle(value:boolean) {
    this.enabledSource.next(value);
  }
}