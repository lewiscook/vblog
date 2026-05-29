import { useState, useEffect, useRef } from "react";

const titulo = "NECO";
const subtitulo = "Parte 3 — Sabroseada";
const copyright = "© L. Cook 2026";

const parrafos = [
  { tipo: "dialogo", texto: "—Creo que esta conversación va para largo; voy por otro café —dijo Matt." },
  { tipo: "dialogo", texto: "—Un plato de leche caliente, pero no tanto, gracias —contestó Neco." },
  { tipo: "dialogo", texto: "—¿Algo más que quiera el señor? —siguió Matt en tono sarcástico." },
  { tipo: "dialogo", texto: "—Unas dos generosas rebanadas de ese sabroso jamón ibérico que cuelgas en la cocina —respondió de nuevo Neco." },
  { tipo: "dialogo", texto: "—¿Tienes buenos gustos, ¿eh? —continuó en sorna Matt." },
  { tipo: "dialogo", texto: "—Eres lo que comes, Mathews. A ti te gusta consumir basura y a mí no. Ese jamoncillo tiene unos aromas espectaculares, colores preciosos, y esa grasa animal añejada y entreverada entre todas las fibras… ¡es una bomba sensorial! Pensándolo bien, agrega otra rebanada más, y no te midas; es más, agrega también una rebanada de queso Muenster, esa también es una delicia: intrincado aroma a semillas, añejo, con una textura cremosa. ¡Es como masticar un trozo de leche! ¡Y ese color, tan llamativo! ¡Hum! ¿No te demores, ¿eh?" },
  { tipo: "dialogo", texto: "—No lo puedo creer; me salió aristogático el animal que recogí de la calle. Creo que escogí mal —murmuró Matt a medio camino hacia la cocina, entre penumbras." },
  { tipo: "cuerpo",  texto: "La tarde había caído, y los ventanales ya no dejaban pasar la luz; pasos lentos pero seguros. Matt conocía bien su casa, pero decidió encender una pequeña lámpara de pared, no tan brillante, pero lo suficientemente fuerte para iluminar el camino en la penumbra." },
  { tipo: "dialogo", texto: "—Tú no me escogiste a mí, Mathews; yo te escogí a ti —habló Neco a la distancia—. Y toma toda esa comida deficiente que me diste, y que he tenido que sufrir los últimos meses como pago parcial por mis servicios de protección; tienes que aprender a ser agradecido, Mathews. Lo bueno es que el suplicio ha terminado; ahora ya sabes cuáles son mis preferencias, y por ahí te iré educando para evitarnos complicaciones." },
  { tipo: "cuerpo",  texto: "¿Estaré en uno de esos sueños lúcidos?, pensó Matt. Aún no procesaba del todo lo que estaba ocurriendo; pensó que a lo mejor se había quedado dormido y todo era producto de su imaginación. O quizás se había caído y dado un golpe en la cabeza; recordaba haber leído en algún lugar que este tipo de lesiones podían causar alucinaciones. Tenía que ser algo como eso; de otra manera no se podía explicar lo acontecido. Matt decidió cortar el jamón y el queso, calentar un poco de leche, pensando que, alucinación o no, era buena idea recetarse un plato como ese y tener la facilidad de hacerse un café cortado si se le antojaba. Se sirvió un nuevo café, tomó el plato de jamón y el cuenco de leche, y se dirigió directo a la sala." },
  { tipo: "cuerpo",  texto: "Neco ya le esperaba sentado en la mesa de centro, observándolo callado, moviendo la cola en espasmos cortos como si estuviera irritado. Matt dejó el plato y el café en la mesa e hizo un gesto con las manos, acompañado de un ruido labial, para indicarle al gato que se bajara de la mesa. Neco ni se inmutó." },
  { tipo: "dialogo", texto: "—Más respeto, Mathews, que no somos iguales. ¿Qué tan difícil puede ser cortar un poco de jamón y queso? Tardaste demasiado y yo muriendo de hambre." },
  { tipo: "cuerpo",  texto: "Ok, no lo soñé ni es una alucinación, pensó Matt." },
  { tipo: "dialogo", texto: "—Explícame en detalle cuáles son los servicios de protección que me provees; en esta casa son raros los roedores e insectos, ¿eh? —increpó Matt, dando un sorbo al café, haciendo una pausa y esperando una respuesta." },
  { tipo: "cuerpo",  texto: "Neco le miró, se despachó un poco del jamón, unos sorbitos de leche, y contestó:" },
  { tipo: "dialogo", texto: "—Tampoco eres bueno para seguir instrucciones; te indiqué que era un \"plato\" de leche, no un \"cuenco\" de leche. Lo angosto del cuenco lastima mis bigotes, ¿no te das cuenta? Debes poner más atención. En cuanto a los ratones e insectos, no los hay porque no estás infestado. Mis servicios de protección no son tan básicos; yo te protejo de lo que no ves, pero sí percibes. ¿Me explico?" },
  { tipo: "dialogo", texto: "—La verdad no; no entiendo de lo que hablas —respondió Matt." },
  { tipo: "dialogo", texto: "—¡Pfft! Lineal, cuadrado y limitado, como todos los humanos —prosiguió Neco—. Por un momento olvidé que los humanos solo son capaces de percibir una pequeña banda del espectro electromagnético; nada de infrarrojos ni otras frecuencias. También están limitados en el olfato, el tacto y la audición, la elasticidad, la composición muscular, el sistema óseo; son unas verdaderas joyas." },
  { tipo: "cuerpo",  texto: "Matt le miró medio confuso, haciendo una gesticulación circular con las manos en el aire y moviendo la cabeza." },
  { tipo: "dialogo", texto: "—Por favor, explica: ¿cómo limitados? —dijo en tono condescendiente." },
  { tipo: "dialogo", texto: "—Está bien. Por ejemplo, no puedes ver más allá del espectro de luz visible, y mucho menos interdimensionalmente. Si te dijera que hay algo detrás de ti justo en este momento, tratando de ver cómo atacarte, y tú pudieras verlo, de seguro sí te mueres de un infarto. No te ha atacado porque yo estoy aquí; de eso hablo: esos son los servicios de protección que yo te proveo." },
  { tipo: "cuerpo",  texto: "Neco levantó ligeramente la pata, contrayendo las pupilas, fijando su atención en el punto detrás de Matt, y guardó silencio. Matt sintió cómo se le erizaba la piel en la nuca, acompañado de un profundo escalofrío." },
  { tipo: "dialogo", texto: "—¿Ahora lo entiendes? Solo le permití darte una sabroseada, y tu amígdala cerebral te advierte del peligro. Si se lo permitiera, te haría pedazos de inmediato —agregó Neco." },
];

const DATOS_PERCEPCION = [
  "Los gatos pueden ver en la oscuridad casi total — sus ojos necesitan solo un sexto de la luz que requieren los humanos.",
  "El campo visual del gato abarca 200°, frente a los 180° del humano.",
  "Los gatos tienen una capa reflectante llamada tapetum lucidum que amplifica la luz disponible.",
  "Un gato puede escuchar frecuencias de hasta 64 kHz; el oído humano llega a los 20 kHz.",
  "El olfato del gato es 14 veces más potente que el del humano.",
  "Los gatos tienen unos 244 huesos — los humanos, 206.",
  "Los gatos pueden rotar sus orejas 180° de forma independiente para localizar sonidos con precisión milimétrica.",
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

// Alert pose — pupils narrowed, paw raised
function NecoSVG() {
  return (
    <svg viewBox="0 0 120 120" width="110" height="110" style={{ display: "block", margin: "0 auto" }}>
      <ellipse cx="60" cy="80" rx="34" ry="28" fill="#1a1a1a" />
      <ellipse cx="60" cy="48" rx="26" ry="24" fill="#1a1a1a" />
      <polygon points="38,30 30,10 50,26" fill="#1a1a1a" />
      <polygon points="82,30 90,10 70,26" fill="#1a1a1a" />
      <polygon points="40,28 34,14 50,26" fill="#5a2a2a" />
      <polygon points="80,28 86,14 70,26" fill="#5a2a2a" />
      {/* Narrowed alert pupils */}
      <ellipse cx="50" cy="46" rx="5" ry="5" fill="#c8902a" />
      <ellipse cx="70" cy="46" rx="5" ry="5" fill="#c8902a" />
      <ellipse cx="50" cy="46" rx="1.2" ry="4.5" fill="#111" />
      <ellipse cx="70" cy="46" rx="1.2" ry="4.5" fill="#111" />
      <circle cx="52" cy="44" r="1" fill="white" />
      <circle cx="72" cy="44" r="1" fill="white" />
      <polygon points="60,55 57,52 63,52" fill="#c06080" />
      <path d="M57,56 Q60,60 63,56" stroke="#c06080" strokeWidth="1.2" fill="none" />
      <line x1="34" y1="52" x2="54" y2="54" stroke="#888" strokeWidth="0.8" />
      <line x1="34" y1="55" x2="54" y2="56" stroke="#888" strokeWidth="0.8" />
      <line x1="34" y1="58" x2="54" y2="57" stroke="#888" strokeWidth="0.8" />
      <line x1="86" y1="52" x2="66" y2="54" stroke="#888" strokeWidth="0.8" />
      <line x1="86" y1="55" x2="66" y2="56" stroke="#888" strokeWidth="0.8" />
      <line x1="86" y1="58" x2="66" y2="57" stroke="#888" strokeWidth="0.8" />
      <path d="M90,90 Q115,75 108,55" stroke="#1a1a1a" strokeWidth="9" fill="none" strokeLinecap="round" />
      <ellipse cx="78" cy="103" rx="10" ry="6" fill="#1a1a1a" />
      {/* Raised paw — alert */}
      <ellipse cx="42" cy="88" rx="8" ry="5" fill="#1a1a1a" transform="rotate(-22,42,88)" />
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

function EspectroBar() {
  const bandas = [
    { etiqueta: "Radio",    color: "#1a1a3a", ancho: "12%" },
    { etiqueta: "Micro",    color: "#1a2a3a", ancho: "10%" },
    { etiqueta: "IR",       color: "#3a1a1a", ancho: "10%" },
    { etiqueta: "Visible",  color: "linear-gradient(to right,#8b00ff,#4444ff,#00aaff,#00cc44,#cccc00,#ff8800,#ff2200)", ancho: "16%" },
    { etiqueta: "UV",       color: "#2a1a3a", ancho: "10%" },
    { etiqueta: "Rayos X",  color: "#1a2a1a", ancho: "10%" },
    { etiqueta: "Gamma",    color: "#2a2a1a", ancho: "10%" },
    { etiqueta: "Más allá", color: "#0e0e0e", ancho: "22%" },
  ];
  return (
    <div style={{ maxWidth: 420, margin: "0 auto 8px" }}>
      <p style={{
        fontFamily: "'Calibri', sans-serif",
        fontSize: "0.72rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#c8a84b",
        margin: "0 0 10px",
        textAlign: "center",
      }}>
        El Espectro Electromagnético
      </p>
      <div style={{ display: "flex", height: 18, borderRadius: 4, overflow: "hidden", border: "1px solid #2a2418" }}>
        {bandas.map((b, i) => (
          <div key={i} title={b.etiqueta} style={{ width: b.ancho, background: b.color, flexShrink: 0 }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: "0.6rem", color: "#4a4035", fontFamily: "'Calibri', sans-serif" }}>← Percepción humana</span>
        <span style={{ fontSize: "0.6rem", color: "#c8a84b88", fontFamily: "'Calibri', sans-serif" }}>Percepción felina →</span>
      </div>
    </div>
  );
}

function EstadoProteccion() {
  const [pulso, setPulso] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPulso(p => !p), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{
      background: "#0e0e14",
      border: "1px solid #2a2418",
      borderRadius: 8,
      padding: "16px 24px",
      maxWidth: 280,
      margin: "24px auto 0",
      textAlign: "center",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: pulso ? "#c8a84b" : "#6a5a30",
          boxShadow: pulso ? "0 0 8px #c8a84b" : "none",
          transition: "all 0.6s ease",
        }} />
        <span style={{ fontFamily: "'Calibri', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a84b" }}>
          Neco en Guardia
        </span>
      </div>
      <p style={{ fontFamily: "'Calibri', sans-serif", fontSize: "0.65rem", color: "#4a4035", margin: 0, letterSpacing: "0.1em" }}>
        SERVICIOS DE PROTECCIÓN ACTIVOS
      </p>
    </div>
  );
}

export default function NecoSParte3() {
  const [revelados, setRevelados] = useState([]);
  const [iniciado, setIniciado] = useState(false);
  const [terminado, setTerminado] = useState(false);
  const [idxDato, setIdxDato] = useState(0);
  const finRef = useRef(null);

  useEffect(() => {
    if (!iniciado) return;
    if (revelados.length >= parrafos.length) { setTerminado(true); return; }
    const t = setTimeout(
      () => setRevelados(r => [...r, r.length]),
      revelados.length === 0 ? 300 : 900
    );
    return () => clearTimeout(t);
  }, [iniciado, revelados]);

  useEffect(() => {
    if (terminado) setTimeout(() => finRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
  }, [terminado]);

  useEffect(() => {
    const id = setInterval(() => setIdxDato(i => (i + 1) % DATOS_PERCEPCION.length), 5000);
    return () => clearInterval(id);
  }, []);

  const progreso = Math.round((revelados.length / parrafos.length) * 100);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a0a10 0%, #111120 50%, #0a0a0e 100%)",
      color: "#e8dfc8",
      fontFamily: "Georgia, 'Times New Roman', serif",
      paddingBottom: 80,
      position: "relative",
      overflowX: "hidden",
    }}>

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
              Fin de la Parte 3 — Sabroseada
            </p>
            <p style={{
              fontFamily: "'Calibri', 'Segoe UI', sans-serif",
              fontSize: "0.8rem",
              color: "#4a4035",
              letterSpacing: "0.1em",
              marginBottom: 40,
            }}>
              {copyright}
            </p>

            <EspectroBar />
            <EstadoProteccion />

            {/* Dato de percepción */}
            <div style={{
              background: "#16161e",
              border: "1px solid #2a2418",
              borderRadius: 8,
              padding: "20px 28px",
              maxWidth: 420,
              margin: "24px auto 0",
            }}>
              <p style={{
                fontFamily: "'Calibri', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c8a84b",
                margin: "0 0 10px",
              }}>
                Dato — Percepción Felina
              </p>
              <p style={{
                fontSize: "0.95rem",
                color: "#9a9080",
                margin: 0,
                lineHeight: 1.7,
                fontStyle: "italic",
              }}>
                «{DATOS_PERCEPCION[idxDato]}»
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
