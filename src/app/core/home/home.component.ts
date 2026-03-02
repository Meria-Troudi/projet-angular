import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
name = 'hello 4arctic 4';

  status = false;

  search='hello'

  add() {
    console.log('added !!!!');
  }
}
