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
    <div class="mf-header-footer-flex mf-header-footer-flex-col mf-header-footer-overflow-hidden mf-header-footer-min-h-screen">

      <!-- HEADER -->
      <mf-layout-header class="mf-header-footer-flex-shrink-0"></mf-layout-header>

      <!-- CONTENIDO -->
      <div class="mf-header-footer-flex mf-header-footer-flex-1 mf-header-footer-overflow-y-auto">

        <!-- MENU LATERAL DESKTOP -->
        <div class="mf-header-footer-hidden md:mf-header-footer-flex mf-header-footer-flex-shrink-0">
          <mf-layout-menu-lateral></mf-layout-menu-lateral>
        </div>

        <!-- CONTENIDO PRINCIPAL -->
        <div class="mf-header-footer-flex-1 mf-header-footer-flex mf-header-footer-flex-col mf-header-footer-min-h-full">          
          <!-- MAIN CONTENT -->
          <main class="mf-header-footer-flex-1 mf-header-footer-p-6 mf-header-footer-bg-gray-50">
            <router-outlet></router-outlet>
            <div class="mf-header-footer-font-prospero mf-header-footer-font-bold mf-header-footer-text-[50px] mf-header-footer-h-[800px] mf-header-footer-leading-[100%] mf-header-footer-tracking-normal mf-header-footer-text-darktext">
              Portal Clientes
            </div>
          </main>

          <!-- FOOTER -->
          <mf-layout-footer class="mf-header-footer-flex-shrink-0"></mf-layout-footer>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
