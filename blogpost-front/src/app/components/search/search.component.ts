import { Component, Input, OnInit } from '@angular/core';
import { BlogpostListComponent } from '../blogpost-list/blogpost-list.component';
import { Observable } from 'rxjs';
import { Blogpost } from '../../model/blogpost';
import { BlogpostService } from '../../services/blogpost.service';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [BlogpostListComponent, RouterModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  public searchQuery!: string | null;
  public blogposts$: Observable<Blogpost[]> = new Observable<Blogpost[]>();

  constructor(
    private route: ActivatedRoute,
    private blogpostService: BlogpostService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.searchQuery = params.get('q');

      if (this.searchQuery !== null)
        this.blogposts$ = this.blogpostService.searchBlogposts(
          this.searchQuery
        );
    });
  }
}
