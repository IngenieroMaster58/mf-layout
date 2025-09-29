import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MenuLateralComponent],
  template: `
    <div class="flex flex-col h-screen overflow-hidden">

      <mf-layout-header class="flex-shrink-0"></mf-layout-header>

      <div class="flex flex-1 overflow-y-auto">

        <mf-layout-menu-lateral class="flex-shrink-0"></mf-layout-menu-lateral>

        <div class="flex-1 flex flex-col min-h-full">
          <main class="flex-1 p-6 bg-gray-50"> <router-outlet></router-outlet>
            <div class="font-prospero font-bold text-[54px] h-[800px] leading-[100%] tracking-normal align-middle text-darktext">
              Portal Clientes
            </div>
          </main>
          <mf-layout-footer class="flex-shrink-0"></mf-layout-footer>
        </div>
      </div>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent { }
