import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, keyframes, style } from '@angular/animations';
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { delay, fromEvent, interval, map, merge, Observable, share, skipUntil, skipWhile, Subject, switchMap, take, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { log } from 'src/app/lib/log';

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

  private start$!:Observable<TouchEvent>;
  private end$!: Observable<TouchEvent>;
  private complete$ = new Subject();
  constructor(
    private elementRef:ElementRef,
    private animBuilder:AnimationBuilder
  ) { 
    this.init();
    this.animPlayer = this.animBuilder.build(this.squeezeIn).create(elementRef.nativeElement);
  }

  init(){
    const { nativeElement } = this.elementRef;
    this.start$ = fromEvent<TouchEvent>(nativeElement, 'touchstart').pipe(share());
    this.end$ = fromEvent<TouchEvent>(nativeElement, 'touchend').pipe(share());

    this.start$.pipe(
      switchMap(() => 
        timer(this.clickThreshold).pipe(takeUntil(this.end$))
      )).subscribe(() => this.animPlayer.play());

    this.end$.subscribe(() => this.animPlayer.reset());
    
    this.start$.pipe(
      tap(e => e.preventDefault()),
      switchMap(() => 
        // start a "timer"
        interval(this.INT_PRECISION).pipe(
          // convert back to total time (from start)
          map(n => (n+1) * this.INT_PRECISION),
          tap(time => {
            if (time >= this.pressThreshold) 
              this.complete$.next(null);
          }),
          // block if it's released
          skipUntil(merge(this.end$, this.complete$)),
          // emit only if press time has been reached
          take(1)
        )
      ),
    ).subscribe((time) => {
      if (time >= this.pressThreshold)
        this.onLongPress.emit();
      else if (time <= this.clickThreshold)
        this.click.emit();
      this.animPlayer.reset();
    })

  }


}
