import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../auth.service";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService,private route: Router,private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
  
   this.authService.createUser(form.value.email, form.value.password);
   console.log(this.authService.createUser)
   this.route.navigate(['/login'],
   {
    relativeTo: this.aRoute
  }
 )
  }

}
