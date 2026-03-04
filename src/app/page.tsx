"use client";

import { useState, useRef, useCallback } from "react";

/* ─── Accordion Component ─── */
function Accordion({
  title,
  badge,
  children,
  defaultOpen = false,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-6 text-left cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {badge && (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue text-white text-sm font-semibold">
              {badge}
            </span>
          )}
          <span className="text-lg font-semibold text-heading">{title}</span>
        </div>
        <svg
          className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[5000px] pb-8" : "max-h-0"
        }`}
      >
        <div className="text-body leading-relaxed space-y-4">{children}</div>
      </div>
    </div>
  );
}

/* ─── Step Component ─── */
function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-base font-semibold text-heading">
        Paso {number} — {title}
      </h4>
      <div className="space-y-3 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

/* ─── Code Block ─── */
function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-xl bg-heading text-white/90 p-4 text-sm leading-relaxed overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

/* ─── Tip Block ─── */
function Tip({
  emoji,
  children,
}: {
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 rounded-xl bg-blue/5 p-4 text-sm">
      <span className="shrink-0 text-lg">{emoji}</span>
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

/* ─── Challenge Card ─── */
function ChallengeCard({
  number,
  title,
  context,
  challenge,
  criteria,
  exampleUrl,
  exampleLabel,
}: {
  number: string;
  title: string;
  context: string;
  challenge: string;
  criteria: string[];
  exampleUrl?: string;
  exampleLabel?: string;
}) {
  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 rounded-2xl border border-black/10 bg-white p-8 md:p-10 transition-shadow duration-300 hover:shadow-lg">
      {/* Left — number + title */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-blue">{number}</span>
        <h3 className="mt-2 text-2xl font-bold text-heading leading-tight">{title}</h3>
        <div className="mt-auto pt-6 hidden md:block">
          <span className="inline-block rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted">
            Stack libre
          </span>
        </div>
      </div>
      {/* Right — description + criteria */}
      <div className="flex flex-col">
        <p className="text-[15px] leading-relaxed text-body">{context}</p>
        <p className="mt-4 text-[15px] leading-relaxed font-medium text-heading">
          {challenge}
        </p>
        {exampleUrl && (
          <a
            href={exampleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:underline"
          >
            {exampleLabel || "Ver ejemplo"}
            <span aria-hidden="true">↗</span>
          </a>
        )}
        <div className="mt-6 pt-6 border-t border-black/5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            Criterios de éxito
          </p>
          <ul className="space-y-2">
            {criteria.map((c, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[15px] leading-relaxed"
              >
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 md:hidden">
          <span className="inline-block rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted">
            Stack libre
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Image Trail Config ─── */
const TRAIL_IMAGES = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=520&fit=crop", // code on screen
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=520&fit=crop", // circuit board
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=520&fit=crop", // laptop code
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=520&fit=crop", // matrix data
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=520&fit=crop", // cybersecurity
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=520&fit=crop", // AI abstract
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=520&fit=crop", // math formulas
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=520&fit=crop", // server room
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=520&fit=crop", // dashboard analytics
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=520&fit=crop", // AI robot
];

const MAX_TRAIL_IMAGES = 5;

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const imgIdx = useRef(0);
  const zIdx = useRef(10);
  const trailEls = useRef<HTMLImageElement[]>([]);

  const handleTrailMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = heroRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;

      if (Math.sqrt(dx * dx + dy * dy) < 90) return;
      lastPos.current = { x, y };

      const img = document.createElement("img");
      img.src = TRAIL_IMAGES[imgIdx.current % TRAIL_IMAGES.length];
      img.alt = "";
      imgIdx.current++;

      const rot = (Math.random() - 0.5) * 25;
      Object.assign(img.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: "220px",
        height: "280px",
        objectFit: "cover",
        borderRadius: "12px",
        transform: `translate(-50%, -50%) rotate(${rot}deg) scale(0.4)`,
        opacity: "0",
        transition:
          "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease",
        zIndex: String(zIdx.current++),
        pointerEvents: "none",
        boxShadow: "0 4px 30px rgba(0,0,0,0.08)",
      });

      el.appendChild(img);
      trailEls.current.push(img);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          img.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(1)`;
          img.style.opacity = "1";

          // Auto-fade after 0.5s
          setTimeout(() => {
            img.style.opacity = "0";
            img.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(0.85)`;
            setTimeout(() => { if (img.parentNode) img.remove(); }, 500);
            trailEls.current = trailEls.current.filter((el) => el !== img);
          }, 500);
        });
      });
    },
    []
  );

  return (
    <>
      {/* ─── Hero with image trail ─── */}
      <section
        ref={heroRef}
        onMouseMove={handleTrailMove}
        className="relative flex min-h-screen flex-col bg-white overflow-hidden"
      >
        {/* Header */}
        <header className="relative z-[60] mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <span className="text-lg font-bold tracking-tight text-heading">
            mendesaltaren
          </span>
          <nav className="flex items-center gap-8 text-sm font-medium">
            <a
              href="#guia"
              className="text-muted hover:text-heading transition-colors"
            >
              Guía
            </a>
            <a
              href="#retos"
              className="text-muted hover:text-heading transition-colors"
            >
              Retos
            </a>
          </nav>
        </header>

        {/* Hero content */}
        <div className="relative z-[50] flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-heading sm:text-[5.5rem]">
              Crea tu propia
              <br />
              app con IA
            </h1>
            <p className="mt-8 text-lg text-muted max-w-xl mx-auto leading-relaxed">
              Taller para principiantes absolutos usando Claude Code
            </p>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#guia"
                className="group inline-flex h-12 items-center rounded-full bg-heading px-8 text-sm font-semibold text-white transition-colors hover:bg-heading/80"
              >
                Ver la guía
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#retos"
                className="inline-flex h-12 items-center rounded-full border border-black/10 px-8 text-sm font-semibold text-heading transition-colors hover:bg-surface"
              >
                Elegir tu reto
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sticky Nav (appears after hero) ─── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight text-heading">
            mendesaltaren
          </span>
          <nav className="flex items-center gap-8 text-sm font-medium">
            <a
              href="#guia"
              className="text-body hover:text-heading transition-colors"
            >
              Guía
            </a>
            <a
              href="#retos"
              className="text-body hover:text-heading transition-colors"
            >
              Retos
            </a>
          </nav>
        </div>
      </header>

      {/* ─── Guía ─── */}
      <section id="guia" className="bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue mb-4">
            Paso a paso
          </p>
          <h2 className="text-3xl font-bold text-heading sm:text-4xl">
            Guía del taller
          </h2>
          <p className="mt-4 text-body leading-relaxed">
            Sigue estas fases en orden para montar tu entorno y crear tu primera
            app con IA. No necesitas saber programar.
          </p>

          <div className="mt-12">
            {/* Fase 1 */}
            <Accordion title="Preparar lo básico" badge="1" defaultOpen>
              <Step number="1" title="Crear tu cuenta de Claude (5 minutos)">
                <p>
                  Ve a{" "}
                  <a href="https://claude.ai" className="text-blue underline" target="_blank" rel="noopener noreferrer">
                    claude.ai
                  </a>
                  . Regístrate y contrata el plan <strong>Pro</strong> (20$/mes)
                  o <strong>Max</strong> (100$/mes). Claude Code no funciona con
                  la versión gratuita.
                </p>
              </Step>

              <Step number="2" title="Instalar Claude Code Desktop (5 minutos)">
                <p>
                  Ve a{" "}
                  <a href="https://claude.com/download" className="text-blue underline" target="_blank" rel="noopener noreferrer">
                    claude.com/download
                  </a>
                  . Descarga la versión Desktop. En Mac, arrastra el icono a
                  Aplicaciones. En Windows, ejecuta el instalador. Abre la app e
                  inicia sesión con tu cuenta de Claude.
                </p>
              </Step>
            </Accordion>

            {/* Fase 2 */}
            <Accordion title="Tu primer proyecto" badge="2">
              <Step number="3" title="Crear la carpeta del proyecto">
                <p>
                  Abre el Explorador de archivos (Windows) o Finder (Mac). Ve a
                  donde quieras guardar el proyecto (Escritorio, Documentos...).
                  Crea una carpeta nueva llamada{" "}
                  <code>mi-primera-app</code>. De momento está vacía — Claude
                  Code la llenará de archivos.
                </p>
              </Step>

              <Step number="4" title="Abrir en Claude Code Desktop">
                <p>
                  Abre Claude Code Desktop. Selecciona la carpeta{" "}
                  <code>mi-primera-app</code>. Ahora Claude Code está
                  &quot;mirando&quot; esa carpeta y listo para trabajar.
                </p>
              </Step>

              <Step number="5" title="Darle contexto a Claude sobre tu proyecto">
                <p>Escribe en Claude Code:</p>
                <Code>{`Crea un archivo llamado CLAUDE.md en la raíz del proyecto
con estas instrucciones:

# Mi proyecto
## Qué es
[Describe tu idea en 2-3 frases]

## Reglas importantes
- El diseño debe ser limpio y moderno
- Todos los textos de la interfaz en español
- Usa Next.js con Tailwind CSS`}</Code>
                <Tip emoji="🤔">
                  <strong>¿Qué es CLAUDE.md?</strong> Una &quot;nota de
                  instrucciones&quot; que Claude lee automáticamente cada vez que
                  trabaja en tu proyecto. Es tu forma de darle contexto
                  permanente.
                </Tip>
              </Step>
            </Accordion>

            {/* Fase 3 */}
            <Accordion title="Construir tu prototipo" badge="3">
              <Step number="6" title="Pedir a Claude que cree la app">
                <p>Escribe en Claude Code (adapta a tu reto):</p>
                <Code>{`Quiero crear una aplicación web. Inicializa el proyecto
con Next.js y Tailwind CSS. Prepara la estructura de
carpetas y crea las primeras páginas.

La idea es: [describe tu reto aquí]

Quiero que sea una app moderna con buen diseño.`}</Code>
                <p>
                  Claude creará los archivos, instalará las dependencias y
                  organizará todo. Te pedirá permiso antes de cada acción — di
                  que sí.
                </p>
                <Tip emoji="💡">
                  Si Claude te hace preguntas técnicas que no entiendes, dile:{" "}
                  <strong>
                    &quot;Elige tú la mejor opción para este proyecto&quot;
                  </strong>
                  .
                </Tip>
              </Step>

              <Step number="7" title="Iterar y mejorar">
                <p>
                  Esta es la parte divertida. Pídele cambios, mejoras, nuevas
                  funcionalidades:
                </p>
                <Code>{`Cambia el diseño del header para que sea más limpio

Añade una página de "acerca de" con información del proyecto

El botón de enviar no funciona, ¿puedes revisarlo?

Haz que el diseño se vea bien en móvil también`}</Code>
                <Tip emoji="🎯">
                  <strong>Sé específico.</strong> &quot;Ponlo bonito&quot; no
                  funciona. &quot;Cambia los colores a azul oscuro y blanco, con
                  bordes redondeados y más espacio entre secciones&quot; sí funciona.
                </Tip>
              </Step>

              <Step number="8" title="Ver tu app en acción">
                <Code>{`Arranca la aplicación para que pueda verla en mi navegador`}</Code>
                <p>
                  Claude ejecutará el comando y te dirá algo como: &quot;Tu app está
                  disponible en http://localhost:3000&quot;. Abre esa dirección en tu
                  navegador.
                </p>
                <Tip emoji="🤔">
                  <strong>¿Qué es localhost:3000?</strong> Es tu propio
                  ordenador haciendo de servidor. La app corre en tu máquina.
                  Todavía no está en internet para que otros la vean.
                </Tip>
              </Step>
            </Accordion>

            {/* Fase 4 */}
            <Accordion title="Subir a GitHub" badge="4">
              <Step number="9" title="Crear cuenta en GitHub (si no tienes)">
                <p>
                  Ve a{" "}
                  <a href="https://github.com" className="text-blue underline" target="_blank" rel="noopener noreferrer">
                    github.com
                  </a>
                  {" "}y crea una cuenta gratuita. GitHub es donde vive tu código
                  en la nube — como Google Drive pero para proyectos de
                  programación.
                </p>
              </Step>

              <Step number="10" title="Pedir a Claude que lo suba">
                <p>Escribe en Claude Code:</p>
                <Code>{`Inicializa un repositorio git en este proyecto, crea un
repositorio en mi cuenta de GitHub y sube todo el código.

Configura el .gitignore para excluir node_modules y
archivos sensibles.`}</Code>
                <p>
                  Claude te guiará para autenticarte con GitHub si es necesario
                  (te pedirá que abras un enlace en el navegador). Después subirá
                  todo el código automáticamente.
                </p>
                <Tip emoji="💡">
                  A partir de ahora, cada vez que hagas cambios puedes decirle a
                  Claude: <strong>&quot;Haz commit y sube los cambios a GitHub&quot;</strong>.
                </Tip>
              </Step>
            </Accordion>

            {/* Fase 5 */}
            <Accordion title="Publicar en internet (Vercel)" badge="5">
              <Step number="11" title="Crear cuenta en Vercel">
                <p>
                  Ve a{" "}
                  <a href="https://vercel.com" className="text-blue underline" target="_blank" rel="noopener noreferrer">
                    vercel.com
                  </a>
                  {" "}y regístrate <strong>con tu cuenta de GitHub</strong>.
                  El plan gratuito es más que suficiente.
                </p>
                <Tip emoji="🤔">
                  <strong>¿Qué es Vercel?</strong> Un servicio que coge tu
                  código de GitHub y lo publica en internet con una URL real.
                  Gratis para proyectos personales.
                </Tip>
              </Step>

              <Step number="12" title="Desplegar tu app">
                <p>
                  En Vercel, haz clic en <strong>Add New → Project</strong>.
                  Selecciona el repositorio de GitHub que acabas de crear. Haz
                  clic en <strong>Deploy</strong>. En 1-2 minutos tendrás tu app
                  en una URL pública tipo{" "}
                  <code>mi-primera-app.vercel.app</code>.
                </p>
                <p>
                  Cada vez que subas cambios a GitHub, Vercel actualiza tu app
                  automáticamente.
                </p>
                <Tip emoji="🎉">
                  ¡Tu app ya está en internet! Comparte la URL con quien
                  quieras.
                </Tip>
              </Step>
            </Accordion>

            {/* Fase 6 */}
            <Accordion title="Consejos de oro" badge="6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-semibold text-heading mb-2">
                    🎯 Habla claro y específico
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-black/10">
                          <th className="text-left py-2 pr-4 font-semibold text-heading">
                            ❌ Vago
                          </th>
                          <th className="text-left py-2 font-semibold text-heading">
                            ✅ Claro
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        <tr className="border-b border-black/5">
                          <td className="py-2 pr-4">&quot;Hazme una app&quot;</td>
                          <td className="py-2">
                            &quot;Hazme una app donde los usuarios puedan guardar
                            recetas y buscar por ingredientes&quot;
                          </td>
                        </tr>
                        <tr className="border-b border-black/5">
                          <td className="py-2 pr-4">&quot;Arréglalo&quot;</td>
                          <td className="py-2">
                            &quot;El botón de enviar no funciona. Cuando hago clic no
                            pasa nada. ¿Puedes revisarlo?&quot;
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">&quot;Ponlo bonito&quot;</td>
                          <td className="py-2">
                            &quot;Cambia el diseño para que use colores azul oscuro y
                            blanco, con bordes redondeados&quot;
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-heading mb-2">
                    🐢 Ve paso a paso
                  </h4>
                  <p>
                    No digas &quot;créame toda la app de principio a fin&quot;. Mejor trozo
                    a trozo: estructura → páginas principales → diseño → detalles
                    → retoques finales.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-heading mb-2">
                    🔄 Si algo falla, pega el error
                  </h4>
                  <Code>{`Me sale este error: [pega el error aquí].
¿Qué está pasando y cómo lo arreglamos?`}</Code>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-heading mb-2">
                    💾 El archivo CLAUDE.md es tu mejor amigo
                  </h4>
                  <p>
                    Si Claude se olvida de algo repetidamente, dile que lo añada
                    al archivo CLAUDE.md como regla.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-heading mb-2">
                    ✅ Aprueba los cambios con calma
                  </h4>
                  <p>
                    Si algo no te cuadra, pregúntale: &quot;Explícame qué estás
                    cambiando y por qué, en términos sencillos&quot;.
                  </p>
                </div>
              </div>
            </Accordion>

            {/* Checklist */}
            <Accordion title="Tu checklist completa">
              <div className="space-y-2 text-sm">
                {[
                  "Crear cuenta de Claude (de pago)",
                  "Instalar Claude Code Desktop",
                  "Crear carpeta del proyecto",
                  "Abrir carpeta en Claude Code Desktop",
                  "Crear archivo CLAUDE.md con instrucciones",
                  "Pedir a Claude que cree la estructura del proyecto",
                  "Iterar: pedir cambios, mejoras, arreglos...",
                  "Probar la app en el navegador (localhost)",
                  "Crear cuenta en GitHub",
                  "Subir el código a GitHub",
                  "Crear cuenta en Vercel",
                  "Desplegar la app en Vercel",
                ].map((item, i) => (
                  <label
                    key={i}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-black/20 accent-blue"
                    />
                    <span className="group-hover:text-heading transition-colors">
                      {i + 1}. {item}
                    </span>
                  </label>
                ))}
              </div>
            </Accordion>

            {/* Glosario */}
            <Accordion title="Glosario: palabras raras explicadas en simple">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-black/10">
                      <th className="text-left py-2 pr-4 font-semibold text-heading">
                        Palabra
                      </th>
                      <th className="text-left py-2 font-semibold text-heading">
                        Qué significa en simple
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-body">
                    {[
                      ["CLAUDE.md", "Un archivo de instrucciones que Claude lee automáticamente"],
                      ["Localhost", "Tu ordenador actuando como servidor — la app solo la ves tú"],
                      ["GitHub", "La nube donde vive tu código. Como Google Drive para programadores"],
                      ["Repositorio", "Una carpeta de proyecto en GitHub"],
                      ["Commit", "Guardar un punto de control de tu código (como \"guardar partida\")"],
                      ["Deploy", "Publicar tu app en internet para que otros la usen"],
                      ["Vercel", "Un servicio que publica tu app desde GitHub automáticamente"],
                      ["Dependencias", "Piezas de código ya hechas que tu app necesita para funcionar"],
                      ["Frontend", "La parte que el usuario ve: botones, diseño, textos"],
                      ["Backend", "La parte invisible que hace el trabajo pesado"],
                      ["Terminal", "La pantalla donde se escriben comandos. Claude lo usa por dentro"],
                      ["React / Next.js", "Herramientas para construir apps web. Claude las usa, tú no necesitas aprenderlas"],
                    ].map(([word, meaning], i) => (
                      <tr key={i} className="border-b border-black/5">
                        <td className="py-2 pr-4 font-medium text-heading whitespace-nowrap">
                          {word}
                        </td>
                        <td className="py-2">{meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Accordion>

            {/* Sección Avanzada */}
            <div className="mt-16 pt-12 border-t-2 border-blue/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue text-sm font-bold">⚡</span>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue">
                  Nivel avanzado
                </p>
              </div>
              <h3 className="text-2xl font-bold text-heading">
                Mejora tu producto con funcionalidad real
              </h3>
              <p className="mt-3 text-body leading-relaxed">
                ¿Tu prototipo ya funciona y quieres ir más allá? Añade una base
                de datos, autenticación de usuarios e inteligencia artificial
                conectando Supabase y OpenAI.
              </p>
            </div>

            <div className="mt-8">
              <Accordion title="Configurar Supabase (base de datos + auth)">
                <Step number="A1" title="Crear cuenta y proyecto en Supabase">
                  <p>
                    Ve a{" "}
                    <a href="https://supabase.com" className="text-blue underline" target="_blank" rel="noopener noreferrer">
                      supabase.com
                    </a>
                    . Crea una cuenta gratuita. Haz clic en <strong>New Project</strong>:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Name</strong>: p.ej. <code>mi-primera-app</code></li>
                    <li><strong>Database Password</strong>: genera una y <strong>guárdala</strong></li>
                    <li><strong>Region</strong>: West EU (Ireland)</li>
                  </ul>
                </Step>

                <Step number="A2" title="Copiar las llaves">
                  <p>
                    En Settings → API, copia la <strong>Project URL</strong> y la{" "}
                    <strong>API Key pública</strong> (anon/public). En Settings →
                    General, copia el <strong>Project ID</strong>. En tu perfil →
                    Access Tokens → <strong>Generate new token</strong> llamado{" "}
                    <code>Claude-Code</code>. Guarda todo en un documento:
                  </p>
                  <Code>{`MIS LLAVES (¡no compartir!)
===========================
Supabase URL: https://xxx.supabase.co
Supabase API Key: eyJhbGci...
Supabase Project ID: abcdefgh
Supabase Access Token: sbp_xxx...`}</Code>
                </Step>

                <Step number="A3" title="Conectar Supabase con Claude Code">
                  <p>Escribe en Claude Code:</p>
                  <Code>{`Crea un archivo .mcp.json en la raíz del proyecto para
conectar con Supabase MCP.

Mi Access Token: [PEGA TU TOKEN]
Mi Project ID: [PEGA TU PROJECT ID]

Usa @supabase/mcp-server-supabase@latest`}</Code>
                  <p>
                    Escribe <code>/mcp</code> para comprobar que aparece conectado.
                    Después pide que cree el archivo <code>.env</code>:
                  </p>
                  <Code>{`Crea un archivo .env con estas variables (y añádelo
al .gitignore):

SUPABASE_URL=[tu URL]
SUPABASE_ANON_KEY=[tu API Key]`}</Code>
                </Step>

                <Step number="A4" title="Crear tablas y autenticación">
                  <Code>{`Crea las tablas necesarias en Supabase para mi app
usando la conexión MCP. Necesito: [describe tus tablas]

Después crea un sistema de login con Supabase Auth
que permita registrarse e iniciar sesión. Diseño
limpio, textos en español.`}</Code>
                </Step>
              </Accordion>

              <Accordion title="Conectar OpenAI (inteligencia artificial)">
                <Step number="B1" title="Crear cuenta y conseguir API Key">
                  <p>
                    Ve a{" "}
                    <a href="https://platform.openai.com" className="text-blue underline" target="_blank" rel="noopener noreferrer">
                      platform.openai.com
                    </a>
                    . Regístrate, ve a Billing y carga un mínimo de 5$ de
                    crédito. Después ve a API Keys → <strong>Create new
                    secret key</strong>, cópiala y guárdala.
                  </p>
                </Step>

                <Step number="B2" title="Añadir la clave al proyecto">
                  <p>Escribe en Claude Code:</p>
                  <Code>{`Añade esta variable al archivo .env:

OPENAI_API_KEY=[tu clave de OpenAI]`}</Code>
                  <Tip emoji="⚠️">
                    Esta clave es como una contraseña. No la compartas, no la
                    publiques, no la subas a GitHub.
                  </Tip>
                </Step>

                <Step number="B3" title="Añadir IA a tu app">
                  <Code>{`Añade funcionalidad de IA a mi app. Quiero que:

- El usuario pueda escribir un mensaje
- Se envíe a OpenAI (GPT-4) desde el servidor
  (nunca desde el navegador)
- La respuesta se muestre en la interfaz

Usa la OPENAI_API_KEY del .env. La clave nunca
debe ser visible para el usuario.`}</Code>
                </Step>
              </Accordion>
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-white p-8 text-center">
            <p className="text-lg font-semibold text-heading">
              Recuerda
            </p>
            <p className="mt-2 text-body leading-relaxed max-w-lg mx-auto">
              No necesitas entender el código que Claude escribe. Tu trabajo es
              decirle <strong>qué</strong> quieres, probar que funcione, y pedir
              cambios si algo no te gusta.{" "}
              <strong>Claude es el programador. Tú eres el director del proyecto.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ─── Retos ─── */}
      <section id="retos" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue mb-4">
              Elige tu reto
            </p>
            <h2 className="text-3xl font-bold text-heading sm:text-4xl">
              3 retos para el taller
            </h2>
            <p className="mt-4 text-body leading-relaxed max-w-xl mx-auto">
              No se trata de terminar un producto perfecto, se trata de explorar
              hasta dónde podéis llegar con Claude Code en una sesión.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <ChallengeCard
              number="01"
              title="Visual Reference Manager"
              context="En el día a día de un estudio de diseño, la inspiración viene de todas partes: webs, Dribbble, Behance, Instagram, capturas de pantalla, PDFs de presentaciones, fotos de eventos... El problema es que todas esas referencias acaban dispersas en carpetas del ordenador, bookmarks del navegador, chats de Slack y tableros de Pinterest que nadie vuelve a abrir. No existe un sitio centralizado donde el equipo pueda guardar, etiquetar y explorar referencias de forma rápida y visual."
              challenge="Construir una aplicación web que funcione como un gestor de referencias visuales para el equipo de diseño. La app debe permitir subir o pegar imágenes/URLs, organizarlas en colecciones o etiquetas, visualizarlas en un formato tipo moodboard o galería, y encontrar rápidamente lo que buscas. Piensa en cómo un diseñador quiere consumir esto: masonry grids, arrastrar para organizar, previsualización rápida, filtros visuales... No tablas ni listas aburridas."
              criteria={[
                "Visual-first: la experiencia de explorar referencias debe sentirse como navegar Dribbble, no como buscar en un disco duro",
                "Más rápido que la solución actual — guardar una referencia nueva debe ser cuestión de segundos",
                "Organización flexible: colecciones, etiquetas, favoritos o lo que inventes para agrupar y filtrar",
                "Bonus: búsqueda inteligente por colores, estilos o categorías detectadas automáticamente",
              ]}
            />
            <ChallengeCard
              number="02"
              title="Reimaginar el Handbook"
              context="Mendesaltaren tiene un handbook interno que recoge toda la operativa del estudio: cómo se gestionan los proyectos, la cultura del equipo, herramientas que se usan, procesos de diseño, onboarding de nuevos miembros, políticas de vacaciones, y más. Actualmente es una web estática (tipo Notion publicado) que se consulta de forma tradicional: navegas por un índice, lees secciones, y esperas encontrar lo que buscas. El resultado es que nadie lo consulta porque es lento, aburrido y difícil de navegar."
              challenge="Reimaginar completamente cómo el equipo consume el contenido del handbook. En lugar de una web estática, piensa en formatos radicalmente diferentes: un agente conversacional al que preguntar dudas en lenguaje natural, una experiencia interactiva con tarjetas y flujos, un buscador inteligente que entienda lo que necesitas, un formato adaptativo que cambie según quién eres (diseñador nuevo vs. veterano), o incluso un agente de voz. El contenido es el mismo — la forma de acceder a él es lo que cambia."
              criteria={[
                "Radicalmente distinto a leer una web — si parece una wiki o un Notion, no vale",
                "El contenido debe ser más fácil y rápido de encontrar que con el formato actual",
                "La experiencia debe ser lo bastante buena para que el equipo quiera usarlo de verdad después del taller",
                "Bonus: personalización según el perfil del usuario o el contexto de la consulta",
              ]}
            />
            <ChallengeCard
              number="03"
              title="Generador de Case Studies"
              context="Mendesaltaren trabaja con grandes clientes (Inditex, Telefónica, startups top...) y entrega productos de diseño espectaculares. El problema: esos proyectos casi nunca llegan a la web del estudio porque crear un buen case study es un proyecto en sí mismo. Hay que escribir el copy, seleccionar y preparar los assets visuales (mockups, capturas, vídeos), diseñar la maquetación, desarrollar la página y publicarla. El resultado es una web del estudio que no refleja la calidad real de su trabajo."
              challenge="Construir una herramienta que acelere drásticamente la creación de case studies. La idea es que un diseñador pueda alimentar la herramienta con los datos del proyecto (nombre del cliente, descripción, imágenes, resultados...) y obtener un case study publicable: con copy bien escrito, layout atractivo, assets bien colocados, y una experiencia de navegación innovadora. Puede ser un generador con plantillas personalizables, un editor visual, o incluso algo que cree páginas únicas con diseño generativo."
              exampleUrl="https://reframeit.figma.site/"
              exampleLabel="Ver ejemplo de referencia"
              criteria={[
                "Reducir drásticamente el tiempo entre 'proyecto terminado' y 'case study publicado en la web'",
                "Calidad visual de estudio de diseño — no puede parecer una plantilla genérica de WordPress",
                "El output debe ser una página web real que se pueda compartir con una URL",
                "Bonus: que la propia experiencia de presentar el case study sea innovadora (scroll storytelling, transiciones, interactividad...)",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <p className="text-sm font-semibold text-heading">
            mendesaltaren © 2026
          </p>
          <p className="mt-2 text-sm text-muted">
            Pensad en grande, iterad rápido y sorprendednos.
          </p>
        </div>
      </footer>
    </>
  );
}
