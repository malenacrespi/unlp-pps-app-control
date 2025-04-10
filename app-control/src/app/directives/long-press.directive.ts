import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { interval, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[appLongPress]',
  standalone: true
})
export class LongPressDirective implements OnInit {

  @Output() longPress: EventEmitter<Event> = new EventEmitter<Event>();

  private mouseDown$ = new Subject<void>();
  private mouseUp$ = new Subject<void>();
  private appLongPressInterval: number = 100;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.mouseDown$.pipe(
      switchMap(() => {
        const buttonId = this.el.nativeElement.id;
        this.longPress.emit(buttonId);
        return interval(this.appLongPressInterval).pipe(
          tap(() => this.longPress.emit(buttonId)),
          takeUntil(this.mouseUp$)
        );
      })
    ).subscribe();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.mouseDown$.next();
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(): void {
    this.mouseUp$.next();
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(): void {
    this.mouseUp$.next();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    event.preventDefault();
    this.mouseDown$.next();
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(): void {
    this.mouseUp$.next();
  }

}
