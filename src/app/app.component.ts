import { Component, OnInit } from '@angular/core';
import { CurrentSession } from 'app/core/services/session.service';
import { RepositoriesService } from 'app/core/services/repositories/repositories.service';
import { Project } from 'app/models';
import { User } from 'app/core/models/user.model';
import { Client } from 'app/models';
import { Address } from 'app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private currentSession: CurrentSession, private repositoriesService: RepositoriesService) { }

  ngOnInit() {
    this.repositoriesService.addManageClass(User.name, 'mmusers');
    this.repositoriesService.addManageClass(Project.name, 'projects');
    this.repositoriesService.addManageClass(Client.name, 'clients');
    this.repositoriesService.addManageClass(Address.name, 'addresses');
    this.currentSession.initialize();
  }
}
