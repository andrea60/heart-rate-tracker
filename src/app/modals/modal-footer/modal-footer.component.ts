import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modal-footer',
  templateUrl: './modal-footer.component.html',
  styles: [`
    ::ng-deep modal-button {
        @apply border-r-1 text-center flex-grow border-main-300;
    }
    ::ng-deep modal-button:last-child {
      border-right:none;
    }
  `]
})
export class ModalFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
