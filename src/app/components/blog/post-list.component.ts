import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../../services/PostService';
import { IPost } from '../../interface/IPost';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit
{
  public posts: IPost[] = [];
  public paginatedPosts: IPost[] = [];
  public currentPage = 1;
  public itemsPerPage = 5;
  public totalItems = 0;
  constructor(private postService: PostService)
  {
  }

  ngOnInit()
  {
    this.loadPosts();
  }

  loadPosts(searchTerm?: string)
  {
    this.postService.getPosts(searchTerm).subscribe((data) =>
    {
      this.posts = data;
      this.totalItems = this.posts.length;
      this.onPageChange();
    });
  }

  onPageChange(page: number = 1)
  {
    this.currentPage = page;
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.paginatedPosts = this.posts.slice(startItem, endItem);
  }

  search(event: KeyboardEvent)
  {
    this.loadPosts((event.target as HTMLTextAreaElement).value);
  }

  remove(id: number)
  {
    const result = confirm('Do you want to delete blog post');
    if (result)
    {
      this.postService.removePost(id).subscribe((data) =>
      {
        this.loadPosts();
      });
    }
  }
}
