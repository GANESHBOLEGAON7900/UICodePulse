import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { AddBlogPost } from '../models/add-blog-post.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http:HttpClient) { }

  createBlogPost(data:AddBlogPost):Observable<BlogPost>{
    return this.http.post<BlogPost>("https://localhost:7112/api/BlogPost",data)
  }

  getAllBlogPosts():Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>('https://localhost:7112/api/BlogPost')
  }

  getBlogPostById(id:string):Observable<BlogPost>{
    return this.http.get<BlogPost>(`https://localhost:7112/api/BlogPost/${id}`)
  }

  getBlogPostByUrlHandle(urlHandle:string):Observable<BlogPost>{
    return this.http.get<BlogPost>(`https://localhost:7112/api/BlogPost/${urlHandle}`)
  }

  updateBlogPost(id:string,updateBlogPost:UpdateBlogPost):Observable<BlogPost>{
    return this.http.put<BlogPost>(`https://localhost:7112/api/BlogPost/${id}`,updateBlogPost);
  }

  deleteBlogPost(id:string):Observable<BlogPost>{
    return this.http.delete<BlogPost>(`https://localhost:7112/api/BlogPost/${id}`)
  }
}
