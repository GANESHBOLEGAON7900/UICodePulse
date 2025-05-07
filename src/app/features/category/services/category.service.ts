import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import {  UpdateCategoryRequest } from '../models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  AddCategory(model:AddCategoryRequest):Observable<void>{
  
    return this.http.post<void>(`https://localhost:7112/api/Categories`,model);
  }

  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`https://localhost:7112/api/Categories`);
  }
  getCategoryById(id:string):Observable<Category>{
    return this.http.get<Category>(`https://localhost:7112/api/Categories/${id}`)
  }

  updateCategory(id:string,updateCategoryRequest:UpdateCategoryRequest):Observable<Category>{
      return this.http.put<Category>(`https://localhost:7112/api/Categories/${id}`,updateCategoryRequest)
  }

  deleteCategory(id:string):Observable<Category>{
    return this.http.delete<Category>(`https://localhost:7112/api/Categories/${id}`);
  }
}
