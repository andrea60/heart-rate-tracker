import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ModalService } from 'src/app/modals/modal.service';

@Component({
  selector: 'hrt-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {

  mustShrink$ = this.modal.current$.pipe(map(status => status.open && status.type === 'card'));

  constructor(
    private modal:ModalService
  ) { }

  ngOnInit(): void {
  }

}
