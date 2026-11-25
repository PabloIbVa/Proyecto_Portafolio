# Portafolio — Pablo Ibarra  
  
> Portafolio personal de **Pablo Ivan Ibarra Valencia**, estudiante de Ingeniería en TI (BUAP).  
> Es una Single Page Application construida con **Angular 21** (standalone components + SSR con Express) que muestra mi trayectoria, stack técnico, proyectos destacados y certificaciones.  
> Incluye una consola animada con efecto typing, scroll-spy en el navbar y un modal de detalle por proyecto. El sitio se despliega en **GitHub Pages**.  

## Requisitos

- Node.js + npm 11.6.2 (ver `packageManager` en `package.json`)
- Angular CLI 21 (los scripts npm ya usan el CLI local; instalarlo global es opcional)

## Inicializar el proyecto

```bash
git clone https://github.com/PabloIbVa/Proyecto_Portafolio.git
cd Proyecto_Portafolio
npm install
npm start          # ng serve → http://localhost:4200/
```

## Comandos útiles

| Comando | Qué hace |
| :--- | :--- |
| `npm start` | Servidor de desarrollo en `http://localhost:4200/` |
| `npm run build` | Build de producción → `dist/portafolio/browser` |
| `npm run watch` | Build en modo watch (development) |
| `npm test` | Tests unitarios con Vitest |
| `npm run serve:ssr:portafolio` | Corre el servidor SSR compilado (`node dist/portafolio/server/server.mjs`) |
| `npm run deploy` | Build de producción + publicación a GitHub Pages |

## Estructura del proyecto

```
├── src/
│   ├── main.ts            # Entry point del browser
│   ├── server.ts          # Entry point SSR (Express)
│   ├── styles.css         # Estilos globales
│   └── app/
│       ├── app.ts         # Componente raíz `App` (standalone): datos de proyectos,
│       │                  #   certificaciones, scroll-spy y animación de typing
│       ├── app.html       # Template del portafolio
│       └── app.css        # Estilos del componente
├── public/                # Assets estáticos (imágenes de proyectos, favicon)
├── angular.json           # Config de build/serve/test/deploy
└── package.json           # Scripts npm y dependencias
```

## Deploy a GitHub Pages

El sitio vive en `https://<usuario>.github.io/Proyecto_Portafolio/`, por eso el build usa `--base-href /Proyecto_Portafolio/`.

```bash
npm run deploy
```

### Importante: carpeta duplicada en el script deploy

El script `deploy` en `package.json` apunta a `dist/portafolio/browser/browser`, pero el `outputPath` real configurado en `angular.json` es `dist/portafolio/browser`. El `browser` extra está de más.

```bash
ng build --configuration production --base-href /Proyecto_Portafolio/ && npx angular-cli-ghpages --dir=dist/portafolio/browser --no-silent
```


**File:** angular.json (L20-20)
```json
            "outputPath": "dist/portafolio/browser",
```
