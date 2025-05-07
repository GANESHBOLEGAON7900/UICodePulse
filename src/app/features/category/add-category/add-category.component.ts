import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Router, RouterLink } from '@angular/router';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {

model:AddCategoryRequest;
private addCategorySubscription?:Subscription

  constructor(private categoryService:CategoryService,private router:Router){
    this.model={
      name:'',
      urlHandle:''
    };
  }


  onFormSubmit(){
     
    this.categoryService.AddCategory(this.model).subscribe({
      next:(response)=>{
        console.log("category Added successfully!!!!!");
        this.router.navigateByUrl('/admin/categories');
        
      }
    });
  }
  ngOnDestroy(): void {
this.addCategorySubscription?.unsubscribe();
  }
}
