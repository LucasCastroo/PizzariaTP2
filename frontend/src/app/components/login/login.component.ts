import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit{
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const container = this.elementRef.nativeElement.querySelector('.container');
    const cadastrarBtn = this.elementRef.nativeElement.querySelector('#cadastrar');
    const loginBtn = this.elementRef.nativeElement.querySelector('#login');

    if (container && cadastrarBtn && loginBtn) {
      cadastrarBtn.addEventListener('click', () => {
        container.classList.add("active");
      });

      loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
      });
    }
  }
}
