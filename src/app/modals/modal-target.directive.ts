import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[hrtModalTarget]'
})
export class ModalTargetDirective {
    constructor(
        public viewContainerRef:ViewContainerRef
    ) {}

}