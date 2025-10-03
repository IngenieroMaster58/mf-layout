import { Component } from '@angular/core';
import { CommonModule, NgClass, NgIf, NgFor } from '@angular/common';

interface SubMenuItem {
  name: string;
  route: string;
  selected: boolean;
}

interface MenuItem {
  name: string;
  route: string;
  selected: boolean;
  open: boolean;
  subItems?: SubMenuItem[];
}

@Component({
  selector: 'mf-layout-menu-lateral',
  standalone: true,
  imports: [CommonModule, NgIf, NgClass, NgFor],
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  //Items y Subitems del menu
  menuItems: MenuItem[] = [
    { name: 'Inicio', route: '/inicio', selected: true, open: false },
    {
      name: 'Gestión de envíos',
      route: '/gestion',
      selected: false,
      open: false,
      subItems: [
        { name: 'Mis envíos', route: '/gestion/mis-envios', selected: false },
        { name: 'Sigue tu envío', route: '/gestion/sigue', selected: false },
        { name: 'Crear / Admisión', route: '/gestion/crear', selected: false },
        { name: 'Cotizador', route: '/gestion/cotizador', selected: false },
        { name: 'Recogidas', route: '/gestion/recogidas', selected: false },
      ]
    },
    {
      name: 'Inter Pay',
      route: '/inter-pay',
      selected: false,
      open: false,
      subItems: [
        { name: 'Descuento personalizado', route: '/inter-pay/descuento', selected: false },
        { name: 'Recargar', route: '/inter-pay/recargar', selected: false },
        { name: 'Transferir', route: '/inter-pay/transferir', selected: false },
      ]
    },
    {
      name: 'Reportes', route: '/reportes', selected: false, open: false, subItems: [
        { name: 'Descuento personalizado', route: '/reportes/descuento', selected: false },
        { name: 'Recargar', route: '/reportes/recargar', selected: false },
        { name: 'Transferir', route: '/reportes/transferir', selected: false },
      ]
    },
    {
      name: 'Soporte', route: '/soporte', selected: false, open: false, subItems: [
        { name: 'Servicio al cliente', route: '/Soporte/descuento', selected: false },
        { name: 'Soporte técnico', route: '/Soporte/recargar', selected: false },
        { name: 'PQR', route: '/Soporte/transferir', selected: false },
      ]
    },
    { name: 'Oficinas cercanas', route: '/oficinas', selected: false, open: false },
    { name: 'Configuración', route: '/configuracion', selected: false, open: false },
  ];

  //Limpia el estado 'selected' de todos los elementos (principal y submenús).   
  clearAllSelections(): void {
    this.menuItems.forEach(i => {
      i.selected = false;
      if (i.subItems) {
        i.subItems.forEach(sub => sub.selected = false);
      }
    });
  }

  //Cierra todos los submenús.
  collapseAllDropdowns(): void {
    this.menuItems.forEach(i => i.open = false);
  }

  /**
   * Gestiona el clic en un elemento de Menú Principal.
   * @param item El elemento de menú principal.
   */
  toggleDropdown(item: MenuItem): void {

    // Limpiamos todas las selecciones.
    this.clearAllSelections();

    // Si el ítem actual tiene submenús, manejamos el despliegue/plegado.
    if (item.subItems) {

      // ACORDEÓN PARCIAL: Cierra todos los demás menús antes de alternar el actual.
      this.menuItems.forEach(i => {
        // Solo cerramos los demás si no son el elemento actual.
        if (i !== item) {
          i.open = false;
        }
      });

      // Alternamos el estado de despliegue del actual.
      item.open = !item.open;

    } else {
      // Colapsa TODOS los submenús abiertos.
      this.collapseAllDropdowns();

      // Aquí iría el Router.navigate(item.route) para cada una de las opciones del menú principal sin submenús.
    }

    // Establecemos la selección en el ítem principal.
    item.selected = true;
  }

  /**
   * Gestiona el clic en un Submenú.
   * @param parentItem El elemento principal padre.
   * @param subItem El subelemento seleccionado.
   */
  selectSubItem(parentItem: MenuItem, subItem: SubMenuItem): void {

    // Limpiamos todas las selecciones.
    this.clearAllSelections();

    // Lógica del Submenú (mantener desplegado el padre):
    this.menuItems.forEach(i => {
      if (i !== parentItem) {
        i.open = false;
      }
    });

    // Marcamos el subelemento como seleccionado.
    subItem.selected = true;

    // Marcamos el padre como seleccionado y FUERZA que se mantenga desplegado.
    parentItem.selected = true;
    parentItem.open = true;

    // Aquí iría el Router.navigate(subItem.route) para cada una de las rutas del submenú.
  }
}


