import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { authGuard } from './core/guards/auth.guard';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'blog/:url',
        component: BlogDetailsComponent
    },
    {
        path: 'categories',
        component: CategoryListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'categories/add',
        component: AddCategoryComponent,
        canActivate: [authGuard]
    },
    {
        path: 'categories/:id',
        component: EditCategoryComponent,
        canActivate: [authGuard]
    },
    {
        path: 'blogposts',
        component: BlogpostListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'blogposts/add',
        component: AddBlogpostComponent,
        canActivate: [authGuard]
    },
    {
        path: 'blogposts/:id',
        component: EditBlogpostComponent,
        canActivate: [authGuard]
    },
];
