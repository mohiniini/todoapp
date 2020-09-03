import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private route: Router,private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }


  
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
 
    this.authService.login1(form.value.email, form.value.password);
    this.route.navigate(['/viewnotes'],
     {
      relativeTo: this.aRoute
    }
   )
  }


}
