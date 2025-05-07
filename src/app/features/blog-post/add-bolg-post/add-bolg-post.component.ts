import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { pipe } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-bolg-post',
  standalone: true,
  imports: [FormsModule,DatePipe,MarkdownModule,CommonModule],
  templateUrl: './add-bolg-post.component.html',
  styleUrl: './add-bolg-post.component.css'
})
export class AddBolgPostComponent implements OnInit {
  model:AddBlogPost
  categories?:Category[]
  constructor(private service:BlogPostService,private roter:Router,
    private categoryService:CategoryService
  ){
    this.model={
      title:'',
      shortDescription:'',
      content:'',
      featuredImageUrl:'',
      urlHandle:'',
      author:'',
      publishedDate:new Date(),
      isVisible:true,
      categories:[]

    }
  }
  ngOnInit(): void {
   this.categoryService.getAllCategories().subscribe({
    next:(response)=>{
      this.categories=response
    }
   })
  }

  onSubmit(){
   this.service.createBlogPost(this.model).subscribe({
    next:(response)=>{
        this.roter.navigateByUrl('/admin/blogposts')
    }
   })
  }
}
