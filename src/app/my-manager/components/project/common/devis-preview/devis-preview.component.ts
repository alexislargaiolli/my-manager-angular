import { Component, OnInit, Input } from '@angular/core';
import { DevisService } from 'app/my-manager/services/devis.service';
import { Devis } from 'app/models';

@Component({
  selector: 'app-devis-preview',
  templateUrl: './devis-preview.component.html',
  styleUrls: ['./devis-preview.component.scss']
})
export class DevisPreviewComponent implements OnInit {
  @Input()
  public projectId: number;

  public devis: Devis[] = [];

  constructor(private devisService: DevisService) { }

  ngOnInit() {
    this.devisService.getByProject(this.projectId).subscribe(devis => {
      this.devis = devis;
    });
  }

}
