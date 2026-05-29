import { useState, useEffect, useRef } from "react";

const titulo = "NECO";
const subtitulo = "Parte 2 — Nueve Vidas";
const copyright = "© L. Cook 2026";

const parrafos = [
  { tipo: "cuerpo",  texto: "Los ojos se abrieron poco a poco y se había perdido la noción del tiempo transcurrido." },
  { tipo: "dialogo", texto: "—¿Puedes hablar? —dijo Neco—. Por un momento pensé que te perdía." },
  { tipo: "cuerpo",  texto: "Matt se frotó los ojos, se incorporó lentamente y quedó sentado en el piso — Neco brincó rápidamente al reposabrazos del sillón quedando al nivel de Matt. Ahora se podían ver directamente." },
  { tipo: "dialogo", texto: "—¿Cómo es esto posible? ¡Los animales no hablan! —susurró Matt." },
  { tipo: "dialogo", texto: "—Claro que sí hablamos; no seas ridículo ni antropocentrista —increpó Neco." },
  { tipo: "dialogo", texto: "—Pero tú nunca habías hablado; ¿por qué ahora?" },
  { tipo: "dialogo", texto: "—Tú me preguntaste algo, Mathews —¿recuerdas? —. Creo que quieres saber para qué llegué a tu vida —agregó Neco." },
  { tipo: "cuerpo",  texto: "Matt lo vio con menos miedo y un poco más de curiosidad valiente." },
  { tipo: "dialogo", texto: "—Matt; el nombre es Matt, no Mathews." },
  { tipo: "dialogo", texto: "—Como quieras, Mathews —prosiguió Neco, dándose una acicalada de cola." },
  { tipo: "dialogo", texto: "—No lo puedo creer; hasta hablando tienes esa arrogante actitud —acusó Matt." },
  { tipo: "dialogo", texto: "—¡Pfft! Mira quién habla de actitud: el señor Simpatía en persona —respondió Neco, mordiéndose de nuevo una garra y haciendo sonidos guturales." },
  { tipo: "dialogo", texto: "—Debes dejar de hacer eso; es sucio. ¿Quién sabe dónde metes las patas para luego chupártelas? —dijo Matt con una mueca desagradable." },
  { tipo: "dialogo", texto: "—Las patas van a donde van, y darles mantenimiento es muy agradable. Además, no lo puedo evitar, Mathews: soy un gato, esa es mi naturaleza, de la misma forma en que tú te pedorreas cuando piensas que nadie te ve, y eso, Mathews, sí es verdaderamente desagradable —contestó Neco sonriendo." },
  { tipo: "cuerpo",  texto: "El gran susto ya se le había pasado a Matt; ahora era la curiosidad lo que lo movía. ¿Cómo que todos los animales hablan? ¿Por qué nunca los oímos? ¿Desde cuándo hablan? ¿Hablan en todos los idiomas? ¿Cómo hablan entre ellos? Su cabeza se llenaba de cientos de preguntas de forma acelerada." },
  { tipo: "dialogo", texto: "—Tengo tantas preguntas que hacerte: desde por qué decidiste hablarme, hasta dónde te metes cuando no te encuentro, incluyendo por qué, al parecer, los de tu especie tienen tantas vidas —dijo Matt." },
  { tipo: "dialogo", texto: "—Mathews, Mathews, decidí hablarte para corregir el rumbo de tu vida, porque al parecer estás atrapado, sin progreso, sin beneficio, y tienes una función que cumplir. La pregunta debe ser \"¿cuándo me meto?\" y no \"dónde estoy cuando me buscas\". En cuanto a mis multividas, los humanos nos sobrepasan, así es que no lo tendrías ni que preguntar —respondió Neco." },
  { tipo: "cuerpo",  texto: "Matt parecía confundido, y no por acabar de volver en sí." },
  { tipo: "dialogo", texto: "—¿Cómo multividas? ¿Qué quieres decir con eso? Te puedo asegurar que cuando un humano se muere, pues se muere y ya está; hasta allí llegó, no sigue." },
  { tipo: "dialogo", texto: "—¡Pfft! ¡Qué mente tan cuadrada, tan lineal, tan limitada! No solo les falta imaginación; les faltan oídos más grandes para oír mejor, y tiempo de silencio para poder pensar y absorber conocimiento. Deja que te lo ponga más sencillo de manera que me puedas seguir —sonrió Neco—. ¿Eres acaso la misma persona que eras hace cuarenta años? ¿Piensas igual? ¿Resuelves igual? En otras palabras, ¿eres la misma persona de esa vida que llevabas? ¿Cuántas veces has cambiado desde hace cuarenta años? ¿Cuántas vidas llevas?" },
  { tipo: "cuerpo",  texto: "Matt lo miró perplejo. Neco tenía la razón: necesitaba pensar más, reflexionar más, crecer más. Pero pensar más generaba más preguntas de las que contestaba. Neco solo había dado explicación a una de sus propuestas; aún le faltaba explicar qué quería decir con «lineal, cuadrado y limitado». Esta iba a ser una noche muy larga, pero Matt aún no sabía cuánto." },
];

const DATOS_FELINOS = [
  "Los gatos tienen cinco dedos en las patas delanteras, pero solo cuatro en las traseras.",
  "El cerebro de un gato es biológicamente más similar al cerebro humano que el de un perro.",
  "Los gatos pueden emitir más de 100 sonidos vocales distintos; los perros apenas 10.",
  "Un grupo de gatos se llama «colonia» — o «clowder» en inglés.",
  "Los gatos duermen el 70% de su vida — eso es una habilidad, no una debilidad.",
  "El ronroneo del gato vibra entre 25 y 150 Hz — la misma frecuencia que favorece la regeneración ósea.",
  "Los gatos tienen una tercera membrana ocular llamada membrana nictitante.",
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
      {/* Warm amber eyes — curious, alert */}
      <ellipse cx="50" cy="46" rx="5" ry="6" fill="#c8902a" />
      <ellipse cx="70" cy="46" rx="5" ry="6" fill="#c8902a" />
      <ellipse cx="50" cy="47" rx="2" ry="5" fill="#111" />
      <ellipse cx="70" cy="47" rx="2" ry="5" fill="#111" />
      <circle cx="52" cy="44" r="1.2" fill="white" />
      <circle cx="72" cy="44" r="1.2" fill="white" />
      <polygon points="60,55 57,52 63,52" fill="#c06080" />
      <path d="M57,56 Q60,60 63,56" stroke="#c06080" strokeWidth="1.2" fill="none" />
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

function ContadorVidas() {
  const [activa, setActiva] = useState(null);
  return (
    <div style={{ marginBottom: 40 }}>
      <p style={{
        fontFamily: "'Calibri', sans-serif",
        fontSize: "0.72rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#c8a84b",
        margin: "0 0 14px",
      }}>
        Nueve Vidas
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            onClick={() => setActiva(activa === i ? null : i)}
            title={`Vida ${i + 1}`}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `1px solid ${activa === i ? "#c8a84b" : "#3a3020"}`,
              background: activa === i ? "#c8a84b18" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              color: activa === i ? "#c8a84b" : "#5a4a30",
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: activa === i ? "0 0 8px rgba(200,168,75,0.3)" : "none",
            }}
          >
            {activa === i ? "✦" : "◦"}
          </div>
        ))}
      </div>
      {activa !== null && (
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: "0.82rem",
          fontStyle: "italic",
          color: "#8a7860",
          margin: "10px auto 0",
          maxWidth: 340,
          lineHeight: 1.7,
        }}>
          «¿Cuántas veces has cambiado desde hace cuarenta años? ¿Cuántas vidas llevas?»
        </p>
      )}
    </div>
  );
}

export default function NecoSParte2() {
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
              fontSize: "clamp(1rem, 2vw, 1.13rem)",
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
              Fin de la Parte 2 — Nueve Vidas
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

            <ContadorVidas />

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
