import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { PostService } from '../../services/PostService';

describe('PaginationComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    declarations: [PaginationComponent],
    providers: [PostService]
  })
  );

  it('should create the pagination component', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
