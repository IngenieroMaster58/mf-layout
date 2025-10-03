import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MenuLateralComponent, RouterModule],
  template: `
    <div class="flex flex-col overflow-hidden min-h-screen">

      <!-- HEADER -->
      <mf-layout-header class="flex-shrink-0"></mf-layout-header>

      <!-- CONTENIDO -->
      <div class="flex flex-1 overflow-y-auto">

        <!-- MENU LATERAL DESKTOP -->
        <div class="hidden md:flex flex-shrink-0">
          <mf-layout-menu-lateral></mf-layout-menu-lateral>
        </div>

        <!-- CONTENIDO PRINCIPAL -->
        <div class="flex-1 flex flex-col min-h-full">          
          <!-- MAIN CONTENT -->
          <main class="flex-1 p-6 bg-gray-50">
            <router-outlet></router-outlet>
            <div class="font-prospero font-bold text-[54px] h-[800px] leading-[100%] tracking-normal text-darktext">
              Portal Clientes
            </div>
          </main>

          <!-- FOOTER -->
          <mf-layout-footer class="flex-shrink-0"></mf-layout-footer>

        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
