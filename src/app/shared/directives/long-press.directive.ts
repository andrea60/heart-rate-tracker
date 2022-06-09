import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, keyframes, style } from '@angular/animations';
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { delay, fromEvent, interval, map, share, skipUntil, skipWhile, switchMap, take, takeUntil, takeWhile, tap } from 'rxjs';

@Directive({
  selector: '[longPress]'
})
export class LongPressDirective {
  private readonly INT_PRECISION = 100;

  private squeezeIn:AnimationMetadata[] = [
    style({ transform: '*'}),
    animate('.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)', keyframes([
      style({ transform:'scale(1)'}),
      style({ transform:'scale(0.95)'}),
      style({ transform:'scale(1.05)'})
    ]))
  ]
  protected animPlayer:AnimationPlayer;

  @Output()
  onLongPress = new EventEmitter();
  @Output()
  click = new EventEmitter<Event>()
  @Input()
  pressThreshold:number = 1250;
  @Input()
  clickThreshold:number = 400;
  constructor(
    private elementRef:ElementRef,
    private animBuilder:AnimationBuilder
  ) { 
    this.init();
    this.animPlayer = this.animBuilder.build(this.squeezeIn).create(elementRef.nativeElement);
  }

  init(){
    const { nativeElement } = this.elementRef;
    const start$ = fromEvent<TouchEvent>(nativeElement, 'touchstart').pipe(share());
    const end$ = fromEvent<TouchEvent>(nativeElement, 'touchend').pipe(share());

    start$.pipe(delay(this.clickThreshold)).subscribe(() => this.animPlayer.play());

    end$.subscribe(() => this.animPlayer.reset());
    
    start$.pipe(
      tap(e => e.preventDefault()),
      switchMap(() => 
        // start a "timer"
        interval(this.INT_PRECISION).pipe(
          // convert back to total time (from start)
          map(n => (n+1) * this.INT_PRECISION),
          // block if it's released
          skipUntil(end$),
          // emit only if press time has been reached
          //skipWhile(time => time < this.pressTime),
          take(1)
        )
      ),
    ).subscribe((time) => {
      if (time >= this.pressThreshold)
        this.onLongPress.emit();
      else if (time <= this.clickThreshold)
        this.click.emit();
    })

  }


}
