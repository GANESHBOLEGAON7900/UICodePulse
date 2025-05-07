import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogPostListComponent } from './features/blog-post/blog-post-list/blog-post-list.component';
import { AddBolgPostComponent } from './features/blog-post/add-bolg-post/add-bolg-post.component';
import { EditBlogPostComponent } from './features/blog-post/edit-blog-post/edit-blog-post.component';

export const routes: Routes = [

    {
        path:"admin/categories",
        component:CategoryListComponent
    },
    {
        path:"admin/categories/add",
        component:AddCategoryComponent
    },
    {
        path:'admin/categories/:id',
        component:EditCategoryComponent
    },
    {
        path:"admin/blogposts",
        component:BlogPostListComponent
    },
    {
        path:"admin/blogposts/add",
        component:AddBolgPostComponent
    },
    {
        path:"admin/blogposts/:id",
        component:EditBlogPostComponent
    }
];
