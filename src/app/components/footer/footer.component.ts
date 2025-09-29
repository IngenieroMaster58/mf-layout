// // src/app/components/footer/footer.component.ts (Código completo y corregido)

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'mf-layout-footer',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './footer.component.html',
//   styleUrls: ['./footer.component.css']
// })
// export class FooterComponent {
//   modalOpen = false;

  
//   toggleModal() {
//     this.modalOpen = !this.modalOpen;
//     console.log('Modal abierto:', this.modalOpen);
//   }
// }
import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'mf-layout-footer',
  standalone: true,
  imports: [CommonModule, NgIf], 
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  
  // Estado para controlar la visibilidad del panel/modal
  policyDrawerOpen: boolean = false;
  
  // Propiedad para almacenar el texto de la política
  policyText: string = this.generatePolicyText();

  openPolicyDrawer(): void {
    this.policyDrawerOpen = true;
    console.log('Abriendo panel/modal de Política de datos.');
  }

  closePolicyDrawer(): void {
    this.policyDrawerOpen = false;
    console.log('Cerrando panel/modal de Política de datos.');
  }

  goToSocial(platform: string): void {
      console.log(`Navegando a ${platform}`);
  }
  
  private generatePolicyText(): string {
    //Texto largo simulado para la política de datos
    const section1 = `### 1. Identificación y Contacto

Interrapidísimo S.A.S., identificada con NIT 800.222.957-7, con domicilio principal en Bogotá D.C., es la responsable del tratamiento de los datos personales. Para consultas o reclamos, puede escribir a: datos.personales@interrapidisimo.com`;
    
    const section2 = `### 2. Tratamiento de Datos y Finalidad

Los datos personales recolectados serán utilizados para las siguientes finalidades: a) Ejecución y desarrollo de las relaciones contractuales y comerciales, b) Envío de comunicaciones relacionadas con el estado de sus envíos, c) Fines de marketing, publicidad y prospección comercial, d) Prevención de fraude y lavado de activos, e) Cumplimiento de requerimientos legales.`;
    
    const section3 = `### 3. Derechos del Titular

El titular de los datos tiene derecho a: a) Conocer, actualizar y rectificar sus datos personales frente a los responsables o encargados del tratamiento, b) Solicitar prueba de la autorización otorgada, c) Ser informado, previa solicitud, sobre el uso dado a sus datos, d) Presentar quejas ante la Superintendencia de Industria y Comercio (SIC), e) Revocar la autorización o solicitar la supresión del dato cuando no exista un deber legal o contractual que impida su eliminación.`;
    
    const section4 = `### 4. Mecanismos para Ejercer los Derechos

Para ejercer sus derechos, el titular debe presentar una solicitud formal, clara y precisa, a través del correo electrónico mencionado en el punto 1 o en la dirección física de nuestra sede principal. La respuesta a las consultas será dada en un término máximo de diez (10) días hábiles. Si la solicitud es un reclamo, el término es de quince (15) días hábiles.`;

    const longContent = `${section1}\n\n${section2}\n\n${section3}\n\n${section4}\n\n${section1}\n\n${section2}\n\n${section3}\n\n${section4}\n\n${section1}\n\n${section2}\n\n${section3}\n\n${section4}\n\n${section1}\n\n${section2}\n\n${section3}\n\n${section4}`;
    
    return longContent;
  }
}