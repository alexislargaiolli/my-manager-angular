import { Component, OnInit } from '@angular/core';
import { RepositoriesService } from 'app/core/generics/repositories/repositories.service';
import { Project } from 'app/my-manager/model/project.model';
import { User } from 'app/core/models/user.model';
import { CurrentSession } from 'app/core/services/session.service';
import { Client } from 'app/my-manager/model/client.model';
import { Address } from 'app/my-manager/model/address.model';

@Component({
  selector: 'project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.css']
})
export class ProjectHomeComponent implements OnInit {

  constructor(private repositoriesService: RepositoriesService, private currentSession: CurrentSession) { }

  public ngOnInit() {

  }

  public test() {
    const userId = this.currentSession.userId;
    const token = this.currentSession.token;
    // this.repositoriesService.get(Project.name, 1).by(User.name, userId).auth(token).exec().subscribe(projects => {
    //   console.table(projects);
    // });

    // this.repositoriesService.get(User.name, userId).auth(token).exec().subscribe(user => {
    //   console.log(user);
    // });

    this.repositoriesService.get(Address.name, null).by(Client.name, 4).exec().subscribe(client => {
      console.table(client);
    });
  }

}
