import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostService } from './PostService';
import { IPost } from '../interface/IPost';
import { of } from 'rxjs';

describe('PostService', () => {
  let _postServiceSpy: jasmine.SpyObj<PostService>;
    beforeEach(() => {
      const spy = jasmine.createSpyObj('PostService', ['getPosts']);
        TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
          providers: [{ provide: PostService, useValue: spy }]
      });
      _postServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>; 
    });

    it('getAllStories should return data', (done) => {
        const expectedData: IPost[] = [
            {   id: 1,
                userName: "Alex",
                dateCreated: new Date(),
                text:"sample text 1" 
            },
            {
                id: 2,
                userName: "ashish",
                dateCreated: new Date(),
                text: "sample text some other data" 
            }
        ];

      _postServiceSpy.getPosts.and.returnValue(of(expectedData));
      _postServiceSpy.getPosts("").subscribe(data => {
            expect(data).toEqual(expectedData);
            done();
          });
      });
    });
