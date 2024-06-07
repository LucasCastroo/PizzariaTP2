import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatTree, MatTreeNode} from "@angular/material/tree";
import {HeaderComponent} from "../../template/cliente/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbar,
    MatIconButton,
    MatTree,
    MatTreeNode,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
  @ViewChild('pizzaImage', { static: true }) pizzaImage!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.removeClass(this.pizzaImage.nativeElement, 'hidden');
        } else {
          this.renderer.addClass(this.pizzaImage.nativeElement, 'hidden');
        }
      });
    });

    observer.observe(this.pizzaImage.nativeElement);
  }

  scrollToSection(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

}
