import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mf-layout-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  // Estado para controlar la visibilidad del modal
  policyDrawerOpen: boolean = false;

  // Propiedad para almacenar el texto de la política
  policyText: string = this.generatePolicyText();

  openPolicyDrawer(): void {
    this.policyDrawerOpen = true;
  }

  closePolicyDrawer(): void {
    this.policyDrawerOpen = false;
  }

  private socialLinks: { [key: string]: string } = {
    facebook: 'https://www.facebook.com/interrapidisimo',
    twitter: 'https://twitter.com/interrapidisimo',
    instagram: 'https://www.instagram.com/interrapidisimo_co/',
    linkedin: 'https://www.linkedin.com/company/inter-rapidisimo-s-a/',
    youtube: 'https://www.youtube.com/user/interrapidisimo'
  };

  goToSocial(platform: string): void {
    const url = this.socialLinks[platform.toLowerCase()];
    if (url) {
      window.open(url, '_blank', 'noopener noreferrer');
    } else {
      console.error(`La plataforma social '${platform}' no fue encontrada.`);
    }
  }

  private generatePolicyText(): string {
    //Texto largo simulado para la política de datos
    const section1 = `1. Identificación y Contacto

Interrapidísimo S.A.S., identificada con NIT 800.000.000-1, con domicilio principal en Bogotá D.C., es la responsable del tratamiento de los datos personales. Para consultas o reclamos, puede escribir a: datos.personales@interrapidisimo.com`;

    const section2 = `2. Tratamiento de Datos y Finalidad

Los datos personales recolectados serán utilizados para las siguientes finalidades: a) Ejecución y desarrollo de las relaciones contractuales y comerciales, b) Envío de comunicaciones relacionadas con el estado de sus envíos, c) Fines de marketing, publicidad y prospección comercial, d) Prevención de fraude y lavado de activos, e) Cumplimiento de requerimientos legales.`;

    const section3 = `3. Derechos del Titular

El titular de los datos tiene derecho a: a) Conocer, actualizar y rectificar sus datos personales frente a los responsables o encargados del tratamiento, b) Solicitar prueba de la autorización otorgada, c) Ser informado, previa solicitud, sobre el uso dado a sus datos, d) Presentar quejas ante la Superintendencia de Industria y Comercio (SIC), e) Revocar la autorización o solicitar la supresión del dato cuando no exista un deber legal o contractual que impida su eliminación.`;

    const section4 = `4. Mecanismos para Ejercer los Derechos

Para ejercer sus derechos, el titular debe presentar una solicitud formal, clara y precisa, a través del correo electrónico mencionado en el punto 1 o en la dirección física de nuestra sede principal. La respuesta a las consultas será dada en un término máximo de diez (10) días hábiles. Si la solicitud es un reclamo, el término es de quince (15) días hábiles.`;

    const longContent = `${section1}\n\n${section2}\n\n${section3}\n\n${section4}`;

    return longContent;
  }
}