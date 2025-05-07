import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blog-post',
  standalone: true,
  imports: [CommonModule ,FormsModule,MarkdownModule,ImageSelectorComponent],
  templateUrl: './edit-blog-post.component.html',
  styleUrl: './edit-blog-post.component.css'
})
export class EditBlogPostComponent implements OnInit ,OnDestroy {
 
  id:string| null=null;
  model?:BlogPost;
  categories?:Category[];
  selectedCategories?:string[];
  routeSubscription?:Subscription;
  getBlogPostSubscription?:Subscription;
  updateBlogPostSubscription?:Subscription;
  deleteBlogPostSubscription?:Subscription;
  imageSelectSubscription?:Subscription;

  isImageSelectorVisible:boolean=false;


  constructor(private route:ActivatedRoute,
    private blogPostService:BlogPostService,
    private categoryService:CategoryService,
    private router:Router,
    private imageService:ImageService
  ){

  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data)=>this.categories=data)
   this.routeSubscription= this.route.paramMap.subscribe({
      next:(params)=>{
        this.id=params.get('id')
        if (this.id) {
         this.getBlogPostSubscription= this.blogPostService.getBlogPostById(this.id).subscribe({
            next:(response)=>{
              this.model=response;
              this.selectedCategories=response.categories.map(x=>x.id);
            }
          });
        }

       this.imageSelectSubscription= this.imageService.onSelectImage().subscribe({
          next:(response)=>{
              if (this.model) {
                this.model.featuredImageUrl=response.url;
              }
          }
        })
      }
    })
  }

  openImageSelector(){
    this.isImageSelectorVisible=true;
  }

  closeImageSelector(){
    this.isImageSelectorVisible=false;
  }
  onSubmit(){
    if (this.model && this.id) {
      var updateBlogPost:UpdateBlogPost={
        author:this.model.author,
        content:this.model.content,
        shortDescription:this.model.shortDescription,
        featuredImageUrl:this.model.featuredImageUrl,
        isVisible:this.model.isVisible,
        publishedDate:this.model.publishedDate,
        title:this.model.title,
        urlHandle:this.model.urlHandle,
        categories:this.selectedCategories??[]
      }
    this.updateBlogPostSubscription=  this.blogPostService.updateBlogPost(this.id,updateBlogPost).subscribe({
        next:(response)=>{
            this.router.navigateByUrl('/admin/blogposts')
        }
      })
    }
  }

  onDelete(){
    if (this.id) {
     this.deleteBlogPostSubscription= this.blogPostService.deleteBlogPost(this.id).subscribe({
        next:(response)=>{
          this.router.navigateByUrl('/admin/blogposts');
        }
      })
    }

  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
