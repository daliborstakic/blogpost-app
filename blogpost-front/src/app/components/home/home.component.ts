import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../services/blogpost.service';
import { Blogpost } from '../../model/blogpost';
import { Observable } from 'rxjs';
import { BlogpostListComponent } from '../blogpost-list/blogpost-list.component';
import { BlogpostComponent } from '../blogpost/blogpost.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlogpostListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public blogposts!: Observable<Blogpost[]>;

  constructor(private blogpostService: BlogpostService) {}

  ngOnInit(): void {
    this.blogposts = this.blogpostService.getBlogpostsObservable();
  }
}
