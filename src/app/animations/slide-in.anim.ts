import { animate, animation, style } from "@angular/animations";

export const slideIn = animation([
    style({
        transform:'translateY(-1000px)',
        opacity:0
    }),
    animate('0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)', style({
        transform:'*',
        opacity: '*'
    }))
])