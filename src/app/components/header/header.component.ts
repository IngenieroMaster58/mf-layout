import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common'; 

// Definición de la interfaz para las notificaciones
interface Notification {
  id: number;
  title: string;
  time: string;
  unread: boolean; 
}

@Component({
  selector: 'mf-layout-header',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  notificationsOpen = false;

  // Datos de simulación (5 ítems para cumplir lsimular las notificaciones)
  notifications: Notification[] = [
    { id: 1, title: 'Tu cliente Carlos Mario ya ingresó la información de destino. Ahora continúa para finalizar el envío.', time: 'Hoy 9:42 AM', unread: true },
    { id: 2, title: 'Tu cliente Carlos Mario ya ingresó la información de destino. Ahora continúa para finalizar el envío.', time: 'Hoy 9:50 AM', unread: true },
    { id: 3, title: 'Tu cliente Carlos Mario ya ingresó la información de destino. Ahora continúa para finalizar el envío.', time: 'Hoy 10:01 AM', unread: true },
    { id: 4, title: 'Tu cliente Carlos Mario ya ingresó la información de destino. Ahora continúa para finalizar el envío.', time: 'Hoy 11:17 AM', unread: true },
    { id: 5, title: 'Tu cliente Carlos Mario ya ingresó la información de destino. Ahora continúa para finalizar el envío.', time: 'Hoy 11:55 AM', unread: true },
  ];

  //Propiedad calculada que verifica si existe al menos una notificación no leída.  
  get hasUnreadNotifications(): boolean {
      return this.notifications.some(n => n.unread);
  }

  // --- Funciones de Acción ---
  goToHome(): void {
    console.log('Navegando a la página de inicio');
  }

  toggleNotifications(): void {
    this.notificationsOpen = !this.notificationsOpen;
  }
  
  goToProfile(): void {
    console.log('Navegando a Mi Perfil');
  }

  logout(): void {
    console.log('Cerrando sesión');
  }

  handleAction(action: 'Cancelar' | 'Crear', notificationId: number): void {
      console.log(`Acción '${action}' realizada para la notificación ID: ${notificationId}`);
      const notification = this.notifications.find(n => n.id === notificationId);
      if (notification) {
          notification.unread = false;
      }
  }
}