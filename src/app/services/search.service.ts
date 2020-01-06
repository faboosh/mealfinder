import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchService {

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  private categorySource = new BehaviorSubject('');
  currenctCategory = this.categorySource.asObservable();

  constructor() {}

  changeMessage(message:string) {
    this.messageSource.next(message)
  }

  changeCategory(message:string) {
    this.categorySource.next(message);
  }
}