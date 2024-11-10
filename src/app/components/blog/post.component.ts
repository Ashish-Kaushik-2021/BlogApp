import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/PostService';
import { IPost } from '../../interface/IPost';

@Component({
  selector: 'post-component',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit
{

  postForm: FormGroup;
  formAction: string;
  postText!: string;
  postUserName!: string;
  errorMessage: any;
  postId!: number;
  existingPost!: IPost;


  constructor(private postService: PostService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router)
  {
    const idParam = 'id';
    this.formAction = 'Add';
    this.postText = 'postText';
    this.postUserName = 'userName';
    this.postForm = this.formBuilder.group(
      {
        postId: 0,
        postText: ['', [Validators.required]],
        userName: ['', [Validators.required]],
      }
    );
    if (this.avRoute.snapshot.params[idParam])
    {
      this.postId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit()
  {

    if (this.postId > 0)
    {
      this.formAction = 'Edit';
      this.postService.getPost(this.postId)
        .subscribe(data => (
          this.existingPost = data,
          this.postForm.controls[this.postText].setValue(data.text),
          this.postForm.controls[this.postUserName].setValue(data.userName)
        ));
    }
  }

  save()
  {
    if (!this.postForm.valid)
    {
      return;
    }

    if (this.formAction === 'Add')
    {
      let post: IPost = {
        dateCreated: new Date(),
        userName: this.postForm.get(this.postUserName)?.value,
        text: this.postForm.get(this.postText)?.value,
        id: 0
      };
      this.postService.createPost(post)
        .subscribe((data) =>
        {
          this.router.navigate(['/']);
        });
    }

    if (this.formAction === 'Edit')
    {
      let post: IPost = {
        id: this.existingPost.id,
        dateCreated: this.existingPost.dateCreated,
        userName: this.postForm.get(this.postUserName)?.value,
        text: this.postForm.get(this.postText)?.value
      };
      this.postService.updatePost(post.id, post)
        .subscribe((data) =>
        {
          this.router.navigate(['/']);
        });
    }
  }

  cancel()
  {
    this.router.navigate(['/']);
  }

  get text()
  {
    return this.postForm.get('postText');
  }

  get userName()
  {
    return this.postForm.get('userName');
  }
}
