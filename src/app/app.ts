import { Component, OnInit, HostListener, Inject, PLATFORM_ID, ChangeDetectorRef} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  userName = "Pablo Ibarra";
  currentDate = new Date();

  // Animación de Consola (Independiente del scroll, basada en tiempo)
  animatedText = "";
  fullText = "load --it-profile\n[STATUS] Ingeniero en TI BUAP detectado...\n[OK] Desplegando infraestructuras seguras.\n[OK] Analizando vectores de ataque...\nSistema listo para nuevos desafíos.";
  typingSpeed = 45;
  pauseDuration = 20000; // 20 Segundos de espera estática

  // Scroll Spy (Nuevo Orden)
  activeSection = 'home';
  isScrolled = false;
  sections = ['home', 'about', 'projects', 'certs'];

  selectedProject: any = null;

  projects = [
    {
      title: 'Plataforma HCI: Space Invaders',
      type: '',
      tags: ['ESP32', 'Python', 'Arduino IDE', 'C++', 'Node.js'],
      image:'space-invaders.png',
      purpose: 'Desarrollo integral de una plataforma de Interacción Humano-Computadora basada en el clásico Space Invaders. El proyecto integra la construcción de un mando físico personalizado mediante el microcontrolador ESP32 y la programación de una interfaz digital interactiva. Se implementaron protocolos de comunicación en tiempo real, sistemas de retroalimentación visual mediante LEDs RGB y una lógica de juego escalable para estudiar los principios de respuesta y usabilidad en ecosistemas digitales complejos.',
      github: 'https://github.com/IgniferDev/space-angular', // Actualiza con tu link real
      live: 'https://igniferdev.github.io/space-angular/' // Este al ser hardware/software combinado, puedes dejarlo como referencia a la documentación
    },
    {
      title: 'Softintel DSS: Tablero de Control Estratégico',
      type: '',
      tags: ['Python', 'SQL Server', 'ETL', 'JavaScript', 'Rayleigh Model'],
      image:'ssd.png',
      purpose: 'Desarrollo de un Decision Support System (DSS) integral para la gestión estratégica de una organización de software. Implementé la arquitectura de un Data Warehouse con esquema en estrella y procesos ETL automatizados para transformar datos operativos en KPIs accionables[cite: 227, 231, 351]. El proyecto incluye un cubo OLAP para análisis multidimensional y, como núcleo de analítica avanzada, un modelo predictivo basado en la distribución de Rayleigh para la estimación de defectos en proyectos futuros, integrando una arquitectura Serverless estática de alta disponibilidad[cite: 269, 271, 638].',
      github: 'https://github.com/IgniferDev/DB-Negocios/tree/main/Proyecto-Final',
      live: 'https://igniferdev.github.io/DashboardPF-Negocios-sinFlask/',
      customRepoLabel: 'Código fuente, scripts, modelo y variables ocupadas' // Nombre específico solicitado
    },
    {
      title: 'Sistema de Pedidos: Cafetería Universitaria',
      type: '',
      tags: ['Java Servlets', 'MySQL', 'UWE Methodology', 'Balsamiq', 'JavaScript'],
      image:'cafeteria.png',
      purpose: 'Desarrollo de una plataforma integral para modernizar el servicio de la cafetería universitaria, permitiendo la gestión de pedidos en tiempo real. Se implementó un proceso de diseño basado en prototipado con Balsamiq y modelado estructurado bajo la metodología UWE (UML-based Web Engineering) para definir la navegación y presentación. La arquitectura utiliza Servlets para la lógica de negocio y MySQL para la gestión de productos, carritos de compra y estados de pedidos, ofreciendo paneles diferenciados para usuarios y administradores.',
      github: 'https://github.com/PabloIbVa/Proyecto_cafeteria',
      live: '#' // Puedes colocar un enlace al video demostrativo si lo tienes en línea
    },
    {
      title: 'BugWeb: Enciclopedia Entomológica',
      type: '',
      tags: ['PHP', 'JavaScript', 'AJAX', 'jQuery', 'MySQL'],
      image:'bugweb.png',
      purpose: 'Desarrollo de una plataforma web interactiva dedicada a la divulgación e investigación de la diversidad entomológica en México y el mundo. El sistema funciona como una enciclopedia digital que integra recursos accesibles para fomentar la conciencia ecológica, alineándose con el Objetivo de Desarrollo Sostenible (ODS) 15 de la ONU. La arquitectura técnica emplea PHP y MySQL para la gestión robusta de datos, junto con AJAX y jQuery para garantizar una interfaz dinámica y una experiencia de usuario fluida en el análisis de fauna.',
      github: 'https://github.com/PabloIbVa/Proyecto_TecWeb',
      live: '#' // Puedes colocar el link si ya está desplegado
    }
  ];

  certifications = [
    { name: 'Base de Datos Relacionales: Diseño y Gestión', issuer: 'Edutin Academy', date: 'Enero 2025', status: 'Completado', link: 'https://app.edutin.com/verify/12035062' },
    { name: 'Google Cybersecurity Certificate', issuer: 'Google', date: 'Marzo 2026', status: 'Completado', link: 'https://coursera.org/share/721753c2d2a675ad2a4a159a26f4974d' },
    { name: 'Python Certification', issuer: 'freeCodeCamp', date: 'Julio 2026', status: 'Completado', link: 'https://www.freecodecamp.org/certification/fccb7c51b54-fb7a-4ff5-9a0a-5ad66ebeb440/python-v9' },
    { name: 'Google Project Management Professional Certificate', issuer: 'Google', status: 'Pendiente', link: '#' },
    { name: 'Google Cloud Engineering Certificate', issuer: 'Google', status: 'Pendiente', link: '#' }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.runTypingLoop();
    }
  }

// Reemplaza la función completa:
runTypingLoop() {
    let charIndex = 0;
    this.animatedText = "";
    this.cdr.detectChanges(); // Limpia la vista al reiniciar

    const typeChar = () => {
      if (charIndex < this.fullText.length) {
        this.animatedText += this.fullText.charAt(charIndex);
        charIndex++;
        this.cdr.detectChanges(); // Fuerza a Angular a pintar cada nuevo carácter
        setTimeout(typeChar, this.typingSpeed);
      } else {
        // Pausa de 20 segundos antes de reiniciar el bucle
        setTimeout(() => {
          this.runTypingLoop();
        }, this.pauseDuration);
      }
    };

    typeChar();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isScrolled = window.scrollY > 80;

    for (const section of this.sections) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => this.activeSection = id, 100);
  }

  openProject(p: any) { this.selectedProject = p; }
  goToCert(url: string) { if (url !== '#') window.open(url, "_blank"); }
}

