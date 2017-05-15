import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Devis, DevisState } from 'app/models';
import { NotificationService, DialogsService } from 'app/modules/core';
import { DevisService } from 'app/my-manager/services/devis.service';

@Component({
  selector: 'app-project-devis-edition',
  templateUrl: './project-devis-edition.component.html',
  styleUrls: ['./project-devis-edition.component.css']
})
export class ProjectDevisEditionComponent implements OnInit {
  private devisState = DevisState;
  private projectId: number;
  private loading = false;
  public devis: Devis;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private devisService: DevisService,
    private dialog: DialogsService,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.projectId = +params['projectId'];
    });
    this.route.params.subscribe(params => {
      const devisId = params['devisId'];
      this.loadDevis(devisId);
    });
  }

  public loadDevis(devisId) {
    if (devisId === 'create') {
      this.createDevis();
    } else {
      this.loading = true;
      this.devisService.getOneByProject(this.projectId, devisId).subscribe(d => {
        this.devis = d;
        this.devis.createDate = new Date(this.devis.createDate);
      });
    }
  }

  public createDevis() {
    this.devis = new Devis();
    this.devis.createDate = new Date();
    this.devis.devisId = '1';
  }

  public submitForm(form: NgForm) {
    this.devisService.saveByProject(this.projectId, this.devis).subscribe(d => {
      this.notification.addInfo('Sauvegardé.');
    });
  }

  public onStateChange() {
    if (this.devis.state === DevisState.ACCEPTED && this.devis.acceptedDate == null) {
      this.devis.acceptedDate = new Date();
    }
  }

  public remove() {
    this.dialog.confirm('Supprimé ?', '').subscribe(confirmed => {
      this.devisService.deleteByProject(this.projectId, this.devis.id).subscribe(() => {
        this.notification.addInfo('Devis supprimé.');
        this.goBack();
      });
    });
  }

  goBack(): void {
    this.location.back();
  }
}
