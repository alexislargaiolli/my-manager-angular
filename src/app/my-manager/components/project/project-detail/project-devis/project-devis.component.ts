import { Component, OnInit } from '@angular/core';
import { Devis } from 'app/my-manager/model/devis.model';
import { NavigationService } from 'app/my-manager/services/navigation.service';
import { DevisService } from 'app/my-manager/services/devis.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-devis',
  templateUrl: './project-devis.component.html',
  styleUrls: ['./project-devis.component.css']
})
export class ProjectDevisComponent implements OnInit {

  public devis = [];
  public loading = false;
  public projectId: number;

  constructor(
    private route: ActivatedRoute,
    private navitation: NavigationService,
    private devisService: DevisService
  ) {
    // this.devisService.activeDebug();
  }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.projectId = +params['projectId'];
      this.load();
    });
  }

  private load() {
    this.loading = true;
    this.devisService.getByProject(this.projectId).subscribe(devis => {
      this.devis = devis;
      this.loading = false;
    });
  }

}
