import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor() { }
  
  logout() { 
    sessionStorage.setItem('isLogged', 'false');
    window.location.reload();
  }

}
