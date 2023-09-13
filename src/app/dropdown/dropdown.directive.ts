import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  constructor() { }

  ngOnInit() { }

  @HostBinding("class.open") isOpen: boolean = false;

  @HostListener("click") click() {
    this.isOpen = !this.isOpen;
  }
}
