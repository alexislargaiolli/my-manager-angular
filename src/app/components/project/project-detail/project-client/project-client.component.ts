import { ClientService } from './../../../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'project-client',
  templateUrl: './project-client.component.html',
  styleUrls: ['./project-client.component.css']
})
export class ProjectClientComponent implements OnInit {

  constructor(private clientService:ClientService) { }

  ngOnInit() {
  }

}