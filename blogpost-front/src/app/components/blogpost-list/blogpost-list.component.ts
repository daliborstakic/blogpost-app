import { Component, Input } from '@angular/core';
import { BlogpostComponent } from '../blogpost/blogpost.component';
import { Blogpost } from '../../model/blogpost';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  imports: [BlogpostComponent, CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css',
})
export class BlogpostListComponent {
  @Input() public blogPosts!: Observable<Blogpost[]>;
}
