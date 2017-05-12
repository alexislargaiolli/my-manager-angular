import { Component, OnInit } from '@angular/core';
import { CurrentSession } from 'app/core/services/session.service';
import { RepositoriesService } from 'app/core/generics/repositories/repositories.service';
import { Project } from 'app/my-manager/model/project.model';
import { User } from 'app/core/models/user.model';
import { Client } from 'app/my-manager/model/client.model';
import { Address } from "app/my-manager/model/address.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private currentSession: CurrentSession, private repositoriesService: RepositoriesService) { }

  ngOnInit() {
    this.currentSession.initialize();
    this.repositoriesService.addManageClass(User.name, 'mmusers');
    this.repositoriesService.addManageClass(Project.name, 'projects');
    this.repositoriesService.addManageClass(Client.name, 'clients');
    this.repositoriesService.addManageClass(Address.name, 'addresses');
  }
}
