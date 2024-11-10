import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PostService } from './services/PostService';
import { of } from 'rxjs';
import { IPost } from './interface/IPost';

describe('AppComponent', () => {
  let _postService: PostService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    declarations: [AppComponent],
    providers: [PostService]
  })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call and get posts function', () => {
    const fakeData: IPost[] = [{ text: "sample test text", userName: "Alex", dateCreated: new Date(), id: 0 }]
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const service = TestBed.inject(PostService);
    const mySpy = spyOn(service, 'getPosts').and.returnValue(of(fakeData));
    expect(mySpy).toHaveBeenCalledTimes(1);

  });
});
