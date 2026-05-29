import { useState, useEffect, useRef } from "react";

const titulo = "NECO";
const subtitulo = "Parte 1 — El Fin de Semana";
const copyright = "© L. Cook 2026";

const parrafos = [
  { tipo: "cuerpo",   texto: "El fin de semana se aproximaba rápidamente. Después de un arduo día de trabajo, Matt se dirigió a la cocina de su casa, activó su cafetera y se preparó un sabroso café con chocolate, acompañado de una pieza de pan recién hecho que había adquirido de camino a casa. Tomó su charola, se dirigió a su sillón favorito, se quitó los zapatos, removió los calcetines, movió los dedos, inclinó el sillón, recogió sus gafas y el libro en turno, y se dispuso a leer." },
  { tipo: "cuerpo",   texto: "En una esquina de la sala, callado y observador, se encontraba Neco, un peludo negro al que Matt había recogido de la calle en un día lluvioso y frío, tal cual hoy; lo había bañado, despulgado, y ahora compartía su casa. Este gato era un contraste al canino que probablemente se encontraba hecho un ovillo junto a la secadora de ropa, echándose una siesta como siempre. Neco era limpio, sigiloso, bien portado, y a veces bien se podría pensar que desaparecía de la casa; nadie podía encontrarlo por horas. En contraste, Inu, el canino era un torbellino de energía: ruidoso, respondón, y con un odio inexplicable a chanclas, zapatos, y sobre todo a las patas de los muebles. Matt ya se había resignado a no poder tener una sala de lujo; entre pelos y mordidas, no era buena idea invertir en algo que valiera la pena." },
  { tipo: "cuerpo",   texto: "Matt le dedicó una mirada a Neco, suspiró y le dijo:" },
  { tipo: "dialogo",  texto: "—¿Qué, Neco? ¿Tú también gustas un café?" },
  { tipo: "cuerpo",   texto: "El gato seguía silencioso." },
  { tipo: "dialogo",  texto: "—Qué buena vida la tuya: no pagas alquiler, no pagas comida, no trabajas, y vives como rey —fustigó Matt—. La verdad no sé qué utilidad aportas a nuestra relación; no cazas ratones, me ignoras olímpicamente, y solo acudes a mí con exigencias. La verdad no sé para qué llegaste a mi vida —cerró Matt, dando por concluido su regaño." },
  { tipo: "cuerpo",   texto: "Neco, chupándose una de sus garras, le dio un par de mordidas leves, unos jaloncitos, movió levemente la cola, se puso en pose, y echó una mirada furtiva a su alrededor. Vio a los ojos a Matt y sonrió. Esa no era una mueca de gato; era una sonrisa casi humana. Matt brincó del susto y sintió que casi se le paraba el corazón. Neco lo vio y dijo:" },
  { tipo: "dialogo",  texto: "—Siéntate, hombre, que te vas a causar un infarto." },
  { tipo: "cuerpo",   texto: "Matt estaba petrificado; sus músculos se negaban a responder, la sorpresa lo había paralizado. Neco continuó:" },
  { tipo: "dialogo",  texto: "—¿En verdad quieres saber para qué llegué a tu vida? ¿Estás dispuesto a oír sin morir en el intento?" },
  { tipo: "cuerpo",   texto: "Matt no pudo responder; solo sintió que todo su mundo oscurecía y perdió el conocimiento." },
];

const DATOS_FELINOS = [
  "Los gatos duermen entre 12 y 16 horas al día — casi el 70% de su vida.",
  "Un gato puede emitir más de 100 sonidos vocales distintos; los perros, apenas 10.",
  "El ronroneo del gato vibra entre 25 y 150 Hz, la misma frecuencia que favorece la regeneración ósea.",
  "Los gatos tienen 32 músculos en cada oreja y pueden girarlas 180° de forma independiente.",
  "En el antiguo Egipto, los gatos eran considerados sagrados — matar uno era delito capital.",
  "Los gatos no perciben el sabor dulce; carecen del receptor genético correspondiente.",
  "La diosa nórdica Freyja conducía un carruaje tirado por dos grandes gatos.",
];

function HuellaGato({ estilo }) {
  return (
    <svg viewBox="0 0 60 60" style={{ width: 26, height: 26, opacity: 0.14, ...estilo }} fill="currentColor">
      <ellipse cx="30" cy="42" rx="13" ry="10" />
      <ellipse cx="14" cy="28" rx="6" ry="8" />
      <ellipse cx="46" cy="28" rx="6" ry="8" />
      <ellipse cx="20" cy="16" rx="5" ry="7" />
      <ellipse cx="40" cy="16" rx="5" ry="7" />
    </svg>
  );
}

function NecoSVG() {
  return (
    <svg viewBox="0 0 120 120" width="110" height="110" style={{ display: "block", margin: "0 auto" }}>
      <ellipse cx="60" cy="80" rx="34" ry="28" fill="#1a1a1a" />
      <ellipse cx="60" cy="48" rx="26" ry="24" fill="#1a1a1a" />
      <polygon points="38,30 30,10 50,26" fill="#1a1a1a" />
      <polygon points="82,30 90,10 70,26" fill="#1a1a1a" />
      <polygon points="40,28 34,14 50,26" fill="#5a2a2a" />
      <polygon points="80,28 86,14 70,26" fill="#5a2a2a" />
      {/* Warm amber eyes */}
      <ellipse cx="50" cy="46" rx="5" ry="6" fill="#c8902a" />
      <ellipse cx="70" cy="46" rx="5" ry="6" fill="#c8902a" />
      <ellipse cx="50" cy="47" rx="2" ry="5" fill="#111" />
      <ellipse cx="70" cy="47" rx="2" ry="5" fill="#111" />
      <circle cx="52" cy="44" r="1.2" fill="white" />
      <circle cx="72" cy="44" r="1.2" fill="white" />
      <polygon points="60,55 57,52 63,52" fill="#c06080" />
      {/* The almost-human smile */}
      <path d="M57,56 Q60,61 63,56" stroke="#c06080" strokeWidth="1.3" fill="none" />
      <line x1="34" y1="52" x2="54" y2="54" stroke="#888" strokeWidth="0.8" />
      <line x1="34" y1="55" x2="54" y2="56" stroke="#888" strokeWidth="0.8" />
      <line x1="34" y1="58" x2="54" y2="57" stroke="#888" strokeWidth="0.8" />
      <line x1="86" y1="52" x2="66" y2="54" stroke="#888" strokeWidth="0.8" />
      <line x1="86" y1="55" x2="66" y2="56" stroke="#888" strokeWidth="0.8" />
      <line x1="86" y1="58" x2="66" y2="57" stroke="#888" strokeWidth="0.8" />
      <path d="M90,90 Q115,75 108,55" stroke="#1a1a1a" strokeWidth="9" fill="none" strokeLinecap="round" />
      <ellipse cx="42" cy="103" rx="10" ry="6" fill="#1a1a1a" />
      <ellipse cx="78" cy="103" rx="10" ry="6" fill="#1a1a1a" />
    </svg>
  );
}

function Divisor() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "32px 0" }}>
      <div style={{ width: 80, height: 1, background: "linear-gradient(to right, transparent, #c8a84b)" }} />
      <span style={{ color: "#c8a84b", fontSize: 18 }}>✦</span>
      <div style={{ width: 80, height: 1, background: "linear-gradient(to left, transparent, #c8a84b)" }} />
    </div>
  );
}

export default function NecoSParte1() {
  const [revelados, setRevelados] = useState([]);
  const [iniciado, setIniciado] = useState(false);
  const [terminado, setTerminado] = useState(false);
  const [idxDato, setIdxDato] = useState(0);
  const finRef = useRef(null);

  // Revelado escalonado de párrafos
  useEffect(() => {
    if (!iniciado) return;
    if (revelados.length >= parrafos.length) { setTerminado(true); return; }
    const t = setTimeout(
      () => setRevelados(r => [...r, r.length]),
      revelados.length === 0 ? 300 : 900
    );
    return () => clearTimeout(t);
  }, [iniciado, revelados]);

  // Desplazamiento al final
  useEffect(() => {
    if (terminado) setTimeout(() => finRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
  }, [terminado]);

  // Rotación de datos felinos
  useEffect(() => {
    const id = setInterval(() => setIdxDato(i => (i + 1) % DATOS_FELINOS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const progreso = Math.round((revelados.length / parrafos.length) * 100);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0e0e12 0%, #141420 50%, #0e0e0e 100%)",
      color: "#e8dfc8",
      fontFamily: "Georgia, 'Times New Roman', serif",
      paddingBottom: 80,
      position: "relative",
      overflowX: "hidden",
    }}>

      {/* Huellas decorativas */}
      {[...Array(7)].map((_, i) => (
        <div key={i} style={{
          position: "fixed",
          top: `${8 + i * 14}%`,
          left: i % 2 === 0 ? "1.5%" : "95%",
          color: "#c8a84b",
          pointerEvents: "none",
          zIndex: 0,
        }}>
          <HuellaGato />
        </div>
      ))}

      {/* Barra de progreso */}
      {iniciado && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "#1a1a26", zIndex: 100 }}>
          <div style={{
            height: "100%",
            width: `${progreso}%`,
            background: "linear-gradient(to right, #c8a84b, #e8c870)",
            transition: "width 0.8s ease",
            boxShadow: "0 0 8px rgba(200,168,75,0.5)",
          }} />
        </div>
      )}

      {/* Cabecera */}
      <div style={{ textAlign: "center", padding: "60px 20px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: 20 }}>
          <NecoSVG />
        </div>

        <h1 style={{
          fontFamily: "'Calibri', 'Segoe UI', sans-serif",
          fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
          fontWeight: 700,
          color: "#c8a84b",
          letterSpacing: "0.08em",
          margin: "0 0 8px",
          textShadow: "0 2px 20px rgba(200,168,75,0.3)",
        }}>
          {titulo}
        </h1>

        <div style={{
          fontFamily: "'Calibri', 'Segoe UI', sans-serif",
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          color: "#9a8860",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 32,
        }}>
          {subtitulo}
        </div>

        <Divisor />

        {!iniciado && (
          <button
            onClick={() => setIniciado(true)}
            style={{
              background: "linear-gradient(135deg, #c8a84b, #a07830)",
              color: "#0e0e12",
              border: "none",
              borderRadius: 4,
              padding: "14px 40px",
              fontFamily: "'Calibri', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(200,168,75,0.25)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseOver={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 6px 32px rgba(200,168,75,0.4)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(200,168,75,0.25)"; }}
          >
            Comenzar a Leer
          </button>
        )}
      </div>

      {/* Cuerpo del relato */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
        {parrafos.map((parrafo, i) => (
          <div
            key={i}
            style={{
              opacity: revelados.includes(i) ? 1 : 0,
              transform: revelados.includes(i) ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              marginBottom: "1.6em",
              paddingLeft: parrafo.tipo === "dialogo" ? 28 : 0,
              borderLeft: parrafo.tipo === "dialogo" ? "2px solid #3a3020" : "none",
            }}
          >
            <p style={{
              fontSize: "var(--story-font-size, 1.1rem)",
              lineHeight: 2,
              color: parrafo.tipo === "dialogo" ? "#d8cdb0" : "#c8bfa8",
              margin: 0,
              fontStyle: parrafo.tipo === "dialogo" ? "italic" : "normal",
              textAlign: "justify",
            }}>
              {parrafo.texto}
            </p>
          </div>
        ))}

        {/* Tarjeta final */}
        {terminado && (
          <div ref={finRef} style={{ marginTop: 60, textAlign: "center" }}>
            <Divisor />

            <p style={{
              fontFamily: "'Calibri', 'Segoe UI', sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6a6050",
              marginBottom: 8,
            }}>
              Fin de la Parte 1 — El Fin de Semana
            </p>
            <p style={{
              fontFamily: "'Calibri', 'Segoe UI', sans-serif",
              fontSize: "0.8rem",
              color: "#4a4035",
              letterSpacing: "0.1em",
              marginBottom: 48,
            }}>
              {copyright}
            </p>

            {/* Contador de vidas — guiño a la Parte 2 */}
            <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
              {[...Array(9)].map((_, i) => (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: "50%",
                  border: "1px solid #3a3020",
                  background: "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, color: "#5a4a30",
                }}>
                  ◦
                </div>
              ))}
            </div>
            <p style={{
              fontFamily: "'Calibri', sans-serif",
              fontSize: "0.7rem",
              color: "#4a4035",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 40,
            }}>
              Nueve vidas
            </p>

            {/* Dato felino */}
            <div style={{
              background: "#16161e",
              border: "1px solid #2a2418",
              borderRadius: 8,
              padding: "20px 28px",
              maxWidth: 420,
              margin: "0 auto",
            }}>
              <p style={{
                fontFamily: "'Calibri', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c8a84b",
                margin: "0 0 10px",
              }}>
                Dato felino
              </p>
              <p style={{
                fontSize: "0.95rem",
                color: "#9a9080",
                margin: 0,
                lineHeight: 1.7,
                fontStyle: "italic",
              }}>
                «{DATOS_FELINOS[idxDato]}»
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
