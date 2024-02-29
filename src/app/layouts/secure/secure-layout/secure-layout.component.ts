import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SideNavComponent } from '../../../shared/side-nav/side-nav.component';
import { NavComponent } from '../../../shared/nav/nav.component';

@Component({
  selector: 'app-secure-layout',
  templateUrl: './secure-layout.component.html',
  standalone: true,
  imports: [RouterOutlet, RouterLink,  CommonModule, NavComponent, SideNavComponent ],
  styleUrls: ['./secure-layout.component.scss']
})
export class SecureLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
