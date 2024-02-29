import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-unsecure-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './unsecure-layout.component.html',
  styleUrls: ['./unsecure-layout.component.scss']
})
export class UnsecureLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
