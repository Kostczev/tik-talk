import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
// import { ImgUrlPipe } from './helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet], //JsonPipe
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tik-talk');
}
