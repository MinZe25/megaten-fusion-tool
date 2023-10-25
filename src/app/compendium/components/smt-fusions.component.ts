import { Component, ChangeDetectionStrategy, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { PositionEdgesService } from '../../shared/position-edges.service';
import { PositionStickyDirective } from '../../shared/position-sticky.directive';

@Component({
  selector: 'app-smt-fusions',
  providers: [ PositionEdgesService ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <table #stickyTable appPositionSticky class="list-table">
        <thead>
          <tr>
            <th *ngFor="let option of fusionOptions"
              class="nav"
              routerLinkActive="active"
              [routerLink]="option.link"
              [style.width.%]="100 / fusionOptions.length"
              [routerLinkActiveOptions]="{ exact: true }">
              <a [routerLink]="option.link">{{ option.title }}</a>
            </th>
          </tr>
          <tr *ngIf="excludedDlc">
            <th [attr.colspan]="fusionOptions.length" class="title">
              {{ langEn ? 'DLC marked as excluded in fusion settings, results may be inaccurate!' : 'DLCなし' }}
            </th>
          <tr>
          <tr *ngIf="showFusionAlert">
            <th [attr.colspan]="fusionOptions.length" class="title"><ng-content></ng-content></th>
          <tr>
        </thead>
      </table>
      <router-outlet></router-outlet>
    </div>
  `
})
export class SmtFusionsComponent implements OnInit, OnChanges {
  static readonly NORMAL_FUSIONS_EN = [
    { title: 'Reverse Fusions', link: 'fissions' },
    { title: 'Forward Fusions', link: 'fusions' }
  ];

  static readonly NORMAL_FUSIONS_JA = [
    { title: '逆引き合体', link: 'fissions' },
    { title: '2身合体', link: 'fusions' }
  ];

  static readonly TRIPLE_FUSIONS = [
    { title: 'Normal Reverse Fusions', link: 'fissions' },
    { title: 'Triple Reverse Fusions', link: 'fissions/triple' },
    { title: 'Triple Forward Fusions', link: 'fusions/triple' },
    { title: 'Normal Forward Fusions', link: 'fusions' }
  ];

  @ViewChild(PositionStickyDirective) stickyTable: PositionStickyDirective;
  @Input() hasTripleFusion = false;
  @Input() showFusionAlert = false;
  @Input() excludedDlc = false;
  @Input() langEn = true;
  fusionOptions = SmtFusionsComponent.NORMAL_FUSIONS_EN;

  ngOnInit() {
    this.fusionOptions = this.hasTripleFusion ?
      SmtFusionsComponent.TRIPLE_FUSIONS :
      this.langEn ? SmtFusionsComponent.NORMAL_FUSIONS_EN :
        SmtFusionsComponent.NORMAL_FUSIONS_JA;
  }

  ngOnChanges() {
    setTimeout(() => this.stickyTable.nextEdges());
  }
}
