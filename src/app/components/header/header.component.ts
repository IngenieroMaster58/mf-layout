import { Component, OnDestroy, Renderer2, Inject, HostListener } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MenuItem, SubMenuItem, Notification, UserProfile } from '@models';

@Component({
    selector: 'mf-layout-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
    menuOpen = false;
    notificationsOpen = false;
    private readonly bodyClass = 'overflow-hidden';

    userProfile: UserProfile | null = null;

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

    notifications: Notification[] = [
        {
            id: 1,
            cliente: 'Carlos Mario',
            mensaje: 'ya ingresó la información de destino.',
            hora: 'Hoy 9:42 AM',
            unread: true,
        },
        { id: 2, cliente: 'Laura Gómez', mensaje: 'ha solicitado soporte.', hora: 'Hoy 9:50 AM', unread: true },
        { id: 3, cliente: 'Pedro Ramírez', mensaje: 'ha realizado un nuevo pago.', hora: 'Hoy 10:15 AM', unread: false },
    ];

    constructor(
        private renderer: Renderer2,
        private router: Router,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.loadUserProfile();
    }

    private loadUserProfile(): void {
        //Carga un cliente por defecto para pruebas
        this.userProfile = {
            id: 101,
            nombre: 'Juan',
            apellido: 'Martinez',
            email: 'juan.martinez@cliente.com',
            avatarUrl: 'assets/imagenes/Iniciales JM.svg'
        };
    }

    get userInitials(): string {
        //Obtienes las iniciales del usuario en caso que no tenga imagen para el avatar de perfil
        if (!this.userProfile) return '';
        const { nombre, apellido } = this.userProfile;
        return `${nombre[0] || ''}${apellido[0] || ''}`.toUpperCase();
    }

    get hasUnreadNotifications(): boolean {
        return this.notifications.some((n) => n.unread);
    }

    toggleMenu(): void {
        this.menuOpen = !this.menuOpen;
        this.menuOpen
            ? this.renderer.addClass(this.document.body, this.bodyClass)
            : this.renderer.removeClass(this.document.body, this.bodyClass);
    }

    toggleSubMenu(item: MenuItem): void {
        this.menuItems.forEach((i) => {
            if (i !== item) i.open = false;
        });
        item.open = !item.open;
    }

    selectMenu(item: MenuItem): void {
        this.clearSelections();

        if (item.subItems) {
            item.open = !item.open;
            item.selected = false;
        } else {
            item.selected = true;
            this.closeMenu();
            this.router.navigate([item.route]);
        }
    }

    selectSubMenu(parent: MenuItem, subItem: SubMenuItem): void {
        this.clearSelections();
        subItem.selected = true;
        parent.open = true;
        this.closeMenu();
        this.router.navigate([subItem.route]);
    }

    clearSelections(): void {
        this.menuItems.forEach((i) => {
            i.selected = false;
            if (i.subItems) i.subItems.forEach((s) => (s.selected = false));
        });
    }

    closeMenu(): void {
        this.menuOpen = false;
        this.renderer.removeClass(this.document.body, this.bodyClass);
    }

    toggleNotifications(): void {
        this.notificationsOpen = !this.notificationsOpen;
        if (this.menuOpen && this.notificationsOpen) this.closeMenu();
    }

    closeNotifications(): void {
        this.notificationsOpen = false;
    }

    handleAction(action: 'Cancelar' | 'Crear', id: number): void {
        const notif = this.notifications.find((n) => n.id === id);
        if (notif) notif.unread = false;
    }

    goToProfile(): void {
        if (this.userProfile) {
            this.closeMenu();
            this.closeNotifications();
            this.router.navigate(['/']);
        }
    }

    logout(): void {
        console.log('Cerrar sesión');
        this.closeMenu();
        this.closeNotifications();
        this.router.navigate(['/login']);
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
        this.renderer.removeClass(this.document.body, this.bodyClass);
    }
}
