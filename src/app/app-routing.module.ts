import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './components/blog/post-list.component';
import { PostComponent } from './components/blog/post.component';

const routes: Routes = [
  { path: '', component: PostListComponent, pathMatch: 'full' },
  { path: 'add', component: PostComponent },
  { path: 'post/edit/:id', component: PostComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
