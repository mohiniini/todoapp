import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { BioserviceService} from '../bioservice.service'
import { Profile } from '../biodata';


@Component({
  selector: 'app-updatedeletenotes',
  templateUrl: './updatedeletenotes.component.html',
  styleUrls: ['./updatedeletenotes.component.css']
})
export class UpdatedeletenotesComponent implements OnInit {
id: any;
_id:any;
// res:any
// public id: number;
// title:string;
// description:string;
 notes:any;
// profile= new Profile();
form:any;
title;
description;
completedetails;
updatedata;


  constructor(private route: ActivatedRoute,private bioservice : BioserviceService,private routeq: Router) { }

  ngOnInit(): void {
  //this.id= console.log(this.route.snapshot.params.id)
  this.route.params.subscribe((params) => {
    this.id = params['id'];
    console.log(this.id)
    this.getData1(); 
});
  }
  

  

  getData1()
  {
    // this.request.title = this.Title;
    // this.request.description = this.Description;
    this.bioservice.getOneEmployee(this.id).subscribe(res=>
      {
      console.log(res);
      this.completedetails = res;
      console.log(this.completedetails,"mohini");
      console.log(this.completedetails.notes.title);
      // this.notes=res;
      // console.log(this.id)
      // console.log(this.notes)
     // this.profile=this.notes;
      //console.log(this.profile)
      })

  }

  updateData1(f)
  {
    this.bioservice.updateData(this.id,this.completedetails).subscribe(res=>
      {
         this.completedetails=res;
         console.log(this.completedetails)
         console.log(this.completedetails.notes.title)
         console.log(this.completedetails.notes.description)
         this.routeq.navigate(['/viewnotes']);
      })
  }

  deleteData(f)
  {
    console.log(this.id);
  this.bioservice.deleteData(this.id).subscribe((data)=>{
    this.form = data;
    console.log(this.form)
    this.routeq.navigate(['/viewnotes'])

  })
  }
 


}
