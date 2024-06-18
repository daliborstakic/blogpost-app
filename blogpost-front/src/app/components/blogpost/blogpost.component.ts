import { Component, Input } from '@angular/core';
import { Blogpost } from '../../model/blogpost';

@Component({
  selector: 'app-blogpost',
  standalone: true,
  imports: [],
  templateUrl: './blogpost.component.html',
  styleUrl: './blogpost.component.css',
})
export class BlogpostComponent {
  @Input() public blogpost!: Blogpost;
  public liked = false;

  toggleLike() {
    this.liked = !this.liked;
  }
}
