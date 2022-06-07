import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, keyframes, style } from '@angular/animations';
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { fromEvent, interval, map, share, skipWhile, switchMap, take, takeUntil, takeWhile, tap } from 'rxjs';

@Directive({
  selector: '[longPress]'
})
export class LongPressDirective {
  private readonly INT_PRECISION = 100;
  private startTime?:Date;

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
  pressTime:number = 1250;
  constructor(
    private elementRef:ElementRef,
    private animBuilder:AnimationBuilder
  ) { 
    this.init();
    this.animPlayer = this.animBuilder.build(this.squeezeIn).create(elementRef.nativeElement);
  }

  init(){
    const { nativeElement } = this.elementRef;
    const start$ = fromEvent<TouchEvent>(nativeElement, 'touchstart');
    const end$ = fromEvent<TouchEvent>(nativeElement, 'touchend').pipe(
      share()
    )

    end$.subscribe(() => this.animPlayer.reset())
    start$.pipe(
      tap(e => e.preventDefault()),
      tap(() => {
        this.animPlayer.play();
        this.startTime = new Date();
      }),
      switchMap(() => 
        // start a "timer"
        interval(this.INT_PRECISION).pipe(
          // convert back to total time (from start)
          map(n => (n+1) * this.INT_PRECISION),
          // block if it's released
          takeUntil(end$),
          // emit only if press time has been reached
          skipWhile(time => time < this.pressTime),
          take(1)
        )
      ),
    ).subscribe(time => {
      const elapsed = (new Date().valueOf() - this.startTime!.valueOf());
      console.log('Elapsed ', elapsed);
      this.onLongPress.emit();
    })

  }


}
