import { trigger, state, style, animate, transition, query } from '@angular/animations';

export const anim = trigger('routerAnimation', [
  transition('* <=> *', [
    // Initial state of new route
    query(':enter',
      style({
        position: 'fixed',
        width: '100%',
        transform: 'scale(0.8)',
        opacity: 0,
      }),
      {optional: true}),
    // move page off screen right on leave
    query(':leave',
      animate('1500ms ease',
        style({
          position: 'fixed',
          width: '100%',
          transform: 'scale(1.2)',
          opacity: 0,
        })
      ),
    {optional: true}),
    // move page in screen from left to right
    query(':enter',
      animate('2000ms ease',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
    {optional: true}),
  ])
]);
