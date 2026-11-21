import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header';
import { Icon } from './components/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Icon],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
