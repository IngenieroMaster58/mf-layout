import { Component, OnDestroy, Renderer2, Inject, HostListener, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Notification {
    id: number;
    cliente: string;
    mensaje: string;
    hora: string;
    unread: boolean;
}

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
    selector: 'mf-layout-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    menuOpen = false;
    notificationsOpen = false;
    private readonly bodyClass = 'overflow-hidden';

    // Menú principal temporal
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
            ],
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
            ],
        },
        {
            name: 'Reportes',
            route: '/reportes',
            selected: false,
            open: false,
            subItems: [
                { name: 'Descuento personalizado', route: '/reportes/descuento', selected: false },
                { name: 'Recargar', route: '/reportes/recargar', selected: false },
                { name: 'Transferir', route: '/reportes/transferir', selected: false },
            ],
        },
        {
            name: 'Soporte',
            route: '/soporte',
            selected: false,
            open: false,
            subItems: [
                { name: 'Servicio al cliente', route: '/soporte/descuento', selected: false },
                { name: 'Soporte técnico', route: '/soporte/recargar', selected: false },
                { name: 'PQR', route: '/soporte/transferir', selected: false },
            ],
        },
        { name: 'Oficinas cercanas', route: '/oficinas', selected: false, open: false },
        { name: 'Configuración', route: '/configuracion', selected: false, open: false },
    ];

    // Notificaciones de prueba
    notifications: Notification[] = [
        {
            id: 1,
            cliente: 'Carlos Mario',
            mensaje: 'ya ingresó la información de destino. Ahora continúa para finalizar el envío.',
            hora: 'Hoy 9:42 AM',
            unread: true,
        },
        {
            id: 2,
            cliente: 'Laura Gómez',
            mensaje: 'ha solicitado soporte en tu envío pendiente.',
            hora: 'Hoy 9:50 AM',
            unread: true,
        },
        {
            id: 3,
            cliente: 'Pedro Ramírez',
            mensaje: 'ha realizado un nuevo pago en Inter Pay.',
            hora: 'Hoy 10:15 AM',
            unread: false,
        },
        {
            id: 4,
            cliente: 'Andrea Torres',
            mensaje: 'ha creado una nueva solicitud de recogida.',
            hora: 'Hoy 10:30 AM',
            unread: true,
        },
        {
            id: 5,
            cliente: 'María Fernanda',
            mensaje: 'ha finalizado un envío exitosamente.',
            hora: 'Hoy 10:45 AM',
            unread: false,
        },
    ];

    constructor(
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                this.markActiveMenu(event.urlAfterRedirects);
            });

        this.markActiveMenu(this.router.url);
    }

    get hasUnreadNotifications(): boolean {
        return this.notifications.some((n) => n.unread);
    }

    toggleMenu(): void {
        this.menuOpen = !this.menuOpen;
        if (this.menuOpen) {
            this.renderer.addClass(this.document.body, this.bodyClass);
        } else {
            this.renderer.removeClass(this.document.body, this.bodyClass);
            this.menuItems.forEach((item) => (item.open = false));
        }
    }

    toggleSubMenu(item: MenuItem): void {
        this.menuItems.forEach((i) => {
            if (i !== item) i.open = false;
        });
        item.open = !item.open;
    }

    toggleNotifications(): void {
        this.notificationsOpen = !this.notificationsOpen;

        if (this.notificationsOpen && this.menuOpen) {
            this.toggleMenu();
        }
    }

    closeNotifications(): void {
        this.notificationsOpen = false;
    }

    handleAction(action: 'Cancelar' | 'Crear', notificationId: number): void {
        console.log(`Acción '${action}' en notificación ID: ${notificationId}`);
        const notif = this.notifications.find((n) => n.id === notificationId);
        if (notif) notif.unread = false;

        if (this.menuOpen) {
            this.toggleMenu();
        }
    }

    selectMenu(item: MenuItem): void {
        this.menuItems.forEach((i) => {
            i.selected = false;
            i.subItems?.forEach((s) => (s.selected = false));
        });
        item.selected = true;
        this.menuOpen = false;
        this.router.navigate([item.route]);
    }

    selectSubMenu(item: MenuItem, subItem: SubMenuItem): void {
        this.menuItems.forEach((i) => {
            i.selected = false;
            i.subItems?.forEach((s) => (s.selected = false));
        });
        item.selected = true;
        subItem.selected = true;
        this.menuOpen = false;
        this.router.navigate([subItem.route]);
    }

    private markActiveMenu(currentUrl: string): void {
        this.menuItems.forEach((item) => {
            item.selected = currentUrl.startsWith(item.route);
            item.subItems?.forEach((sub) => {
                sub.selected = currentUrl.startsWith(sub.route);
                if (sub.selected) {
                    item.selected = true;
                }
            });
        });
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event): void {
        const target = event.target as HTMLElement;
        if (
            this.notificationsOpen &&
            !target.closest('.notification-panel') &&
            !target.closest('.notification-toggle')
        ) {
            this.closeNotifications();
        }
    }

    ngOnDestroy(): void {
        if (this.menuOpen) {
            this.renderer.removeClass(this.document.body, this.bodyClass);
        }
    }
}
