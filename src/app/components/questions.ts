import { Component } from '@angular/core';
import { Icon } from './icon';
import { FAQ } from '../data/site-content';

@Component({
  selector: 'nexo-questions',
  imports: [Icon],
  templateUrl: './questions.html',
  styleUrl: './questions.scss',
})
export class Questions {
  readonly faq = FAQ;
}
