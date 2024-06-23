import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import Popper from 'popper.js';
import { User } from '../../model/user';

@Component({
  selector: 'app-mini-profile',
  standalone: true,
  imports: [],
  templateUrl: './mini-profile.component.html',
  styleUrl: './mini-profile.component.css',
})
export class MiniProfileComponent implements AfterViewInit {
  @Input() user!: User;
  @Input() triggerElementRef!: HTMLSpanElement;
  @ViewChild('miniProfile') miniProfile!: ElementRef;
  popperInstance: Popper | null = null;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.triggerElementRef && this.miniProfile) {
      this.setupPopper();
      this.setupEventListeners();
    }
  }

  private setupPopper(): void {
    if (this.triggerElementRef && this.miniProfile) {
      this.popperInstance = new Popper(
        this.triggerElementRef,
        this.miniProfile.nativeElement,
        {
          placement: 'right',
          modifiers: {
            offset: {
              offset: '0,10',
            },
          },
        }
      );
    }
  }

  private setupEventListeners(): void {
    if (this.triggerElementRef) {
      this.triggerElementRef.addEventListener('mouseenter', () => {
        this.showMiniProfile();
      });

      this.triggerElementRef.addEventListener('mouseleave', () => {
        this.hideMiniProfile();
      });
    }
  }

  private showMiniProfile(): void {
    if (this.miniProfile) {
      this.miniProfile.nativeElement.style.display = 'block';
    }
  }

  private hideMiniProfile(): void {
    if (this.miniProfile) {
      this.miniProfile.nativeElement.style.display = 'none';
    }
  }

  private updatePosition(x: number, y: number): void {
    if (this.miniProfile) {
      this.miniProfile.nativeElement.style.left = `${x}px`;
      this.miniProfile.nativeElement.style.top = `${y}px`;
    }
  }
}
