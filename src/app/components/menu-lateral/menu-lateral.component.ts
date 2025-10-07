import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MenuItem, SubMenuItem } from '@models';

@Component({
  selector: 'mf-layout-menu-lateral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  @Output() onLogout = new EventEmitter<void>();

  constructor(private router: Router) { }

  menuItems: MenuItem[] = [
    { name: 'Home', route: '/inicio', selected: true, open: false },
    {
      name: 'Gestión de envíos',
      route: '/gestion',
      selected: false,
      open: false,
      subItems: [
        { name: 'Mis envíos', route: '/gestion/mis-envios', selected: false },
        { name: 'Crear envío', route: '/gestion/crear-envio', selected: false },
        { name: 'Cotizador', route: '/gestion/cotizador', selected: false },
        { name: 'Histórico de recogidas', route: '/gestion/recogidas', selected: false },
      ],
    },
    { name: 'Inter Pay', route: '/inter-pay', selected: false, open: false },
    { name: 'Pago en Casa', route: '/pago-en-casa', selected: false, open: false },
    { name: 'Reportes', route: '/reportes', selected: false, open: false },
    { name: 'Soporte', route: '/soporte', selected: false, open: false },
    { name: 'Donde encontrarnos', route: '/oficinas', selected: false, open: false },
    {
      name: 'Configuraciones',
      route: '/configuraciones',
      selected: false,
      open: false,
      subItems: [
        { name: 'Direcciones y sucursales', route: '/configuraciones/misdirecciones', selected: false },
        { name: 'Mis clientes', route: '/configuraciones/misclientes', selected: false },
        { name: 'Administrar', route: '/configuraciones/administrar', selected: false },
        { name: 'Facturación', route: '/configuraciones/facturacion', selected: false },
        { name: 'Método de pago', route: '/configuraciones/metodopago', selected: false },
      ],
    },
  ];

  clearAllSelections(): void {
    this.menuItems.forEach(i => {
      i.selected = false;
      if (i.subItems) i.subItems.forEach(sub => sub.selected = false);
    });
  }

  collapseAllDropdowns(): void {
    this.menuItems.forEach(i => (i.open = false));
  }

  toggleDropdown(item: MenuItem): void {
    this.clearAllSelections();

    if (item.subItems) {
      this.menuItems.forEach(i => {
        if (i !== item) i.open = false;
      });
      item.open = !item.open;
    } else {
      this.collapseAllDropdowns();
      this.router.navigate([item.route]);
    }

    item.selected = true;
  }

  selectSubItem(parentItem: MenuItem, subItem: SubMenuItem): void {
    this.clearAllSelections();

    this.menuItems.forEach(i => {
      if (i !== parentItem) i.open = false;
    });

    subItem.selected = true;
    parentItem.selected = true;
    parentItem.open = true;

    this.router.navigate([subItem.route]);
  }

  logout(): void {
    console.log('Logout desde menú lateral');
    this.onLogout.emit();
    this.router.navigate(['/login']);
  }
}
