import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { BioserviceService} from '../bioservice.service'
import { Profile } from '../biodata';
@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.css']
})
export class AddnotesComponent implements OnInit {

  constructor(private route: ActivatedRoute,private bioservice : BioserviceService,private routew: Router) { }

  
  Title: string = '';
  Description: string = '';

  request: any = {
    title : "",
  description : "",
     
  };
  // profile= new Profile();
  // data:any;
  ngOnInit(): void {
  }

  FormSubmit(f)
  {
    console.log(f);

    this.request.title = this.Title;
    this.request.description = this.Description;
    // this.bioservice.postNewEmployee(this.profile).subscribe(res=>
    //   {
    //  // console.log(res);
    //   this.data=res;
    //   this.profile=this.data;
    //   console.log(this.profile)
    //   })

  
    console.log("Form Submit");
     this.bioservice.postNewEmployee(this.request).subscribe(data => {
       console.log("save form"); 
       console.log(this.request)
       this.routew.navigate(['/viewnotes']
      
      );

  },error=>
  {
    console.log("this a error")
  }
  
 );
}

}
