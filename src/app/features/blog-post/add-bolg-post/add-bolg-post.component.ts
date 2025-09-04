import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { pipe, Subscription } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-bolg-post',
  standalone: true,
  imports: [FormsModule, DatePipe, MarkdownModule, CommonModule, ImageSelectorComponent],
  templateUrl: './add-bolg-post.component.html',
  styleUrl: './add-bolg-post.component.css'
})
export class AddBolgPostComponent implements OnInit,OnDestroy {
  model:AddBlogPost
  isImageSelectorVisible:boolean=false;
  categories?:Category[]

  imageSelectorSubscription?:Subscription;


  constructor(private service:BlogPostService,private roter:Router,
    private categoryService:CategoryService,
    private imageService:ImageService
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

   this.imageSelectorSubscription= this.imageService.onSelectImage().
   subscribe({
    next:(selectedImage)=>{
        this.model.featuredImageUrl=selectedImage.url
        this.closeImageSelector()
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

  openImageSelector(){
    this.isImageSelectorVisible=true;
  }

  closeImageSelector(){
    this.isImageSelectorVisible=false;
  }
  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
}
