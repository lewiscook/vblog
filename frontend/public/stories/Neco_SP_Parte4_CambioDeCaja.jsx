import { useState, useEffect, useRef } from "react";

const titulo = "NECO";
const subtitulo = "Parte 4 — Cambio de Caja";
const copyright = "© L. Cook 2026";

const parrafos = [
  { tipo: "dialogo", texto: "—¿Qué demonios fue eso? —dijo Matt." },
  { tipo: "dialogo", texto: "—Exacto —contestó Neco." },
  { tipo: "dialogo", texto: "—¿Cómo que exacto? ¿Qué quieres decir con eso? —añadió Matt." },
  { tipo: "dialogo", texto: "—Medio lento el muchacho. Solo confirmé tu conjetura, Mathews: lo que te sabroseó fue un demonio menor, un espíritu bajo, una especie de parásito que se alimenta de sentimientos negativos humanos, como el miedo, la ira, los celos… creo que entiendes." },
  { tipo: "cuerpo",  texto: "Matt le miró asombrado; siempre había desechado las historias de demonios, fantasmas y todas esas cosas como productos de la superstición e ignorancia. Para Matt, si no se podía comprobar o replicar, entonces no existía. La lógica le decía que lo que había sentido hace unos minutos fue causado por algo natural, pero también le decía que, hasta hace poco, los animales no podían hablar como humanos, y sin embargo aquí estaba ahora." },
  { tipo: "cuerpo",  texto: "Matt pensó que sería mejor preguntarle a Neco y pedirle que expandiera su respuesta. Lo vio y le preguntó:" },
  { tipo: "dialogo", texto: "—¿Entonces los demonios existen? ¿No son solo invenciones para asustar a los niños?" },
  { tipo: "dialogo", texto: "—Por supuesto que existen; los humanos, en su gran mayoría, han dejado de creer en ellos, y eso aumenta su poder." },
  { tipo: "cuerpo",  texto: "Matt tragó saliva, medio nervioso, e inquirió más detalles." },
  { tipo: "dialogo", texto: "—Siempre pensé que eran solo inventos de los abuelos para controlarnos. ¿Cuántos son? ¿Por qué no podemos verlos?" },
  { tipo: "cuerpo",  texto: "Neco se dio un par de lamidas, un bostezo rápido, enroscó su cola hacia el frente y dijo:" },
  { tipo: "dialogo", texto: "—Las respuestas a esas preguntas, Mathews, son más complejas y largas de lo que te imaginas ahora. A pesar de lo que el humano piensa, cree y deduce utilizando herramientas como la ciencia, la historia y herramientas físicas como lentes infrarrojos, micrófonos subsónicos, y muchas muletas más, hay mucho más que no conoce. El universo es para los humanos un mar profundo y largamente inexplorado; no conocen sus reglas y continuamente entran en periodos de autocontradicción por esa falta de conocimiento. Unos niegan el avance de los otros y, después de largas discusiones, cancelan el conocimiento adquirido y solo avanzan en una sola dirección. El universo tiene direcciones infinitas; no puede ser entendido con lentes miopes, secuestrando su nitidez, dirección e intensidad. Tienen que incluirse la mayoría de las interpretaciones para que se le pueda entender mejor; una visión más clara, pues. ¿Me explico?" },
  { tipo: "dialogo", texto: "—Estoy realmente estupefacto, Neco; no entiendo. Entiendo lo que dices, pero no comprendo del todo el mensaje. Explica más, por favor —respondió Matt." },
  { tipo: "cuerpo",  texto: "Neco dio otros dos lengüetazos de leche, unas pequeñas mordiditas al queso, y continuó:" },
  { tipo: "dialogo", texto: "—Está bien; vamos por partes y me indicas dónde requieras que haga una expansión del tema, tal como ahora. Los humanos en su mayoría razonan y deducen en dicotomías: bien o mal, es o no es, cierto o falso; y sin culpa rechazan lo que está entre las dos premisas, tal como tú en esta conversación, dividiendo lo que tu formación académica te dice que es aceptable y lo que decides ignorar porque es \"superchería\", cuando la realidad incluye más de lo que intuyes, Mathews. Tus ancestros reconocían la dualidad y sus áreas grises, y lo explicaban de manera abierta. El conocimiento de los demonios: los sumerios los definían como Udug, los babilonios los llamaban Utukus, los egipcios los conocían como Isfet, los hebreos los llamaban Satán, y así muchos más; todos refiriéndose a la misma fuerza: el caos. Siglos después, otros grupos destruyeron libros, textos, tabletas y todo lo que podía ayudar a los humanos a establecer un equilibrio entre el orden y el caos. La lucha por el poder y la ignorancia colectiva permitieron que algunos textos sobrevivieran, pero son ignorados. En el tiempo actual se les considera una interpretación antigua de fuerzas naturales, un invento para llenar el vacío del conocimiento. Y esa es ahora la versión «oficial»; y si algún osado se atreve a ofrecer algún conocimiento alternativo, es inmediatamente repudiado, marcado y expulsado: se le convierte en un paria. Es por eso por lo que nadie se atreve a repudiar lo establecido, a retar el 'status quo', y el conocimiento sufre, se estanca. Pero aquí viene lo más interesante, Mathews: al universo no le importa lo que el 'status quo' establece; el universo sigue y actúa en consecuencia sin importar la ignorancia de sus leyes. Como en tu caso: no crees en demonios, pero sentiste su sabroseada. ¿O no?" },
  { tipo: "cuerpo",  texto: "Matt había escuchado con atención. Lo que Neco había explicado tenía lógica, y era innegable que lo que había sentido era real. Nunca le dijo a Neco lo que había percibido en el instante, pero Neco lo sabía; eso se sumaba a que fue un evento real, no imaginario. Desde la perspectiva que ofrecía Neco, la realidad que Matt consideraba un bastión de lo que conocía —la fundación de su lógica y el centro de su toma de decisiones— se acababa de convertir en añicos. El fortín, disminuido con una simple probadita de «lo que no existía» hasta hacía unos minutos. El diálogo con Neco, lejos de aclarar las dudas, hacía crecer de manera exponencial sus interrogantes. Matt suspiró, dispuesto a escuchar más, y le acercó más jamón a Neco." },
  { tipo: "dialogo", texto: "—Prosigue, por favor." },
  { tipo: "cuerpo",  texto: "Neco dio otro par de mordiscos al jamón, declarando que estaba delicioso, se limpió los bigotes rápidamente de un par de lengüetazos y dijo:" },
  { tipo: "dialogo", texto: "—Como te decía, Mathews, el hombre no solo tiene una percepción obtusa intelectual; también tiene limitaciones físicas, como lo dije antes: un ser muy limitado. Otros seres que habitan este plano ven con más agudeza que el hombre; como las águilas, equipadas con visión de alta definición, ocho veces mayor. Los camarones mantis —por cierto, deliciosos— perciben cinco veces más colores que los humanos; las serpientes, equipadas con sensores infrarrojos, son capaces de ver en la oscuridad total; las abejas ven en ultravioleta; y la lista sigue. Y eso solo es el plano físico, Mathews. Los demonios pertenecen al plano multidimensional, más allá de la cuarta dimensión; los humanos, tristemente, solo comprenden tres. Es muy difícil explicarle a un ser de tres dimensiones cómo funcionan todas las dimensiones restantes. Pero recuerda, Mathews: al universo no le importa tu ignorancia." },
  { tipo: "cuerpo",  texto: "Matt asintió con la cabeza y dio un suspiro profundo, como tratando de absorber y procesar lo que acababa de oír. A lo lejos se oían rayos y sus destellos entraban por los ventanales, presagiando una tormenta. Al parecer, esta noche iba a ser de tormentas: ambiental, espiritual y cognitiva. Nada como una buena sacudida al intelecto. Los cambios de paradigma siempre son difíciles de aceptar, y más si estos se encuentran enclavados por muchos años como verdades inmutables, pensó Matt. Por eso los humanos se oponen al cambio: es más fácil permanecer que cambiar." },
  { tipo: "dialogo", texto: "—Entonces, Neco, si existen demonios, por supuesto que tienen que existir ángeles: el bien y el mal. ¿O no? —preguntó Matt." },
  { tipo: "cuerpo",  texto: "Neco se dio una estirada, un breve bostezo, se acomodó en el sillón viendo hacia Matt, mientras pensaba de forma breve 'no sé para qué pierdo el tiempo, todos los humanos son iguales. Nada cambia. Nadie cambia, todo es predecible, este humano no es la excepción', suspiró y dijo:" },
  { tipo: "dialogo", texto: "—Otra vez esa visión dicotómica, Mathews; también entre el bien y el mal hay áreas grises. Te sugiero que empieces a pensar en esos términos. En cuanto a demonios y ángeles, esas son etiquetas humanas para poder entenderles. En realidad, son los mismos seres; solo que tienen diferente asociación política." },
  { tipo: "cuerpo",  texto: "Matt no lo pudo evitar: esa sonrisa le causaba escalofríos." },
  { tipo: "dialogo", texto: "—¿Podrías dejar de hacer eso, por favor? Me causa escalofríos solo verte hacerlo; me va a tomar un tiempo acostumbrarme." },
  { tipo: "dialogo", texto: "—Está bien, Mathews; voy a tratar de limitarme, para que después no digas que no hago nada por ti —respondió Neco." },
  { tipo: "dialogo", texto: "—Gracias —asintió Matt." },
  { tipo: "dialogo", texto: "—Como decía —continuó Neco—, lo que tú entiendes por cielo es una parte del universo mismo; otra dimensión diferente a esta en la que nos encontramos hoy. Los seres que tú divides entre ángeles y demonios en verdad pertenecen a un complejo ecosistema que me tomaría mucho tiempo describirte; como te dije, las etiquetas que utilizas son montajes humanos y ese ecosistema no está dividido así. No me malentiendas: sí hay divisiones, pero estas son jerárquicas, piramidales, y cada elemento ocupa un lugar de acuerdo con su función. La clasificación se debe a su función, carácter e inteligencia, Mathews. Unos mandan, otros ejecutan y todos obedecen. Las divisiones políticas que tú mencionas se deben a diferencias de opinión y luchas por el poder. Esta separación empezó hace muchos eones humanos y sigue hasta ahora; quizás algunas civilizaciones humanas más pasen antes de que esa discusión llegue a su fin." },
  { tipo: "dialogo", texto: "—¿Te estás refiriendo a una guerra, Neco? —preguntó Matt." },
  { tipo: "dialogo", texto: "—Sí, creo que sí; desde tu punto de vista, Mathews, una «guerra celestial», utilizando tus términos —contestó Neco." },
  { tipo: "dialogo", texto: "—¿Cuál es el motivo de la discordia, Neco? ¿Cuál es la causa del cisma? —preguntó Matt." },
  { tipo: "cuerpo",  texto: "Neco se quedó en silencio unos segundos y contestó:" },
  { tipo: "dialogo", texto: "—Los humanos, Matt; los humanos son el meollo del problema. Una mitad quiere verlos expandirse, crecer, evolucionar, y la otra simplemente los quiere aniquilados. Hasta ahora, los que han conservado de alguna manera el balance son los que se encuentran en medio, parados arriba del cerco, para que me entiendas. ¿Ves cómo es preferible no clasificar todo en absolutos? Son los que están en medio, en el área gris, los que mantienen un «alto al fuego» como los humanos lo entienden; un espacio para el diálogo donde los humanos sobreviven." },
  { tipo: "dialogo", texto: "—Necesito otro café, Neco. ¿Gustas algo de la cocina? Esta conversación se está poniendo puntiaguda —dijo Matt." },
  { tipo: "dialogo", texto: "—No, gracias; te espero. Pero quiero advertirte algo para que lo pienses y me digas si quieres proseguir a tu regreso, Mathews. Una vez que aprendas lo que pasa en realidad, se expandirá tu conciencia, y con ella también tus riesgos; hay muchos seres interesados en que esto no pase, Mathews. Una vez que abandones esa caja tan cómoda en la que existes y tu universo se expanda, ya no podrás volver a ella; ya no podrás caber. Tu sistema de conocimientos se convertirá en pedazos al mismo tiempo que adoptes nuevas verdades. No hay paso atrás, Mathews; no puedes desaprender lo que ya sepas. Piénsalo." },
];

const DATOS_MITOLOGIA = [
  "Los gatos eran sagrados en el antiguo Egipto — la diosa Bastet tenía cabeza de gata y simbolizaba la protección.",
  "En la mitología nórdica, la diosa Freyja conducía un carruaje tirado por dos grandes gatos.",
  "El maneki-neko japonés (gato que saluda) se considera guardián contra el mal y trae buena fortuna.",
  "Los gatos pueden detectar vibraciones sísmicas segundos antes que los humanos, gracias a sus patas.",
  "En la Europa medieval, los gatos negros eran asociados con lo sobrenatural — para bien y para mal.",
  "Los sumerios creían que los gatos podían ver espíritus; los usaban como guardianes de los templos.",
  "Un gato tiene el órgano de Jacobson, que le permite «saborear» los aromas y percibir capas invisibles para nosotros.",
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

// Contemplative Neco — half-lidded wise eyes, tail curled, settled in armchair
function NecoSVG() {
  return (
    <svg viewBox="0 0 130 120" width="120" height="110" style={{ display: "block", margin: "0 auto" }}>
      <ellipse cx="65" cy="82" rx="36" ry="26" fill="#1a1a1a" transform="rotate(-5,65,82)" />
      <ellipse cx="65" cy="48" rx="26" ry="24" fill="#1a1a1a" />
      <polygon points="43,30 35,10 55,27" fill="#1a1a1a" />
      <polygon points="87,30 95,10 75,27" fill="#1a1a1a" />
      <polygon points="45,28 39,14 55,27" fill="#5a2a2a" />
      <polygon points="85,28 91,14 75,27" fill="#5a2a2a" />
      {/* Half-lidded wise eyes */}
      <ellipse cx="53" cy="47" rx="5" ry="4" fill="#c8902a" />
      <ellipse cx="77" cy="47" rx="5" ry="4" fill="#c8902a" />
      <ellipse cx="53" cy="48" rx="2" ry="3.5" fill="#111" />
      <ellipse cx="77" cy="48" rx="2" ry="3.5" fill="#111" />
      <circle cx="55" cy="45" r="1" fill="white" />
      <circle cx="79" cy="45" r="1" fill="white" />
      <polygon points="65,56 62,53 68,53" fill="#c06080" />
      <path d="M62,57 Q65,61 68,57" stroke="#c06080" strokeWidth="1.2" fill="none" />
      <line x1="37" y1="53" x2="58" y2="55" stroke="#888" strokeWidth="0.8" />
      <line x1="37" y1="56" x2="58" y2="57" stroke="#888" strokeWidth="0.8" />
      <line x1="93" y1="53" x2="72" y2="55" stroke="#888" strokeWidth="0.8" />
      <line x1="93" y1="56" x2="72" y2="57" stroke="#888" strokeWidth="0.8" />
      {/* Tail curled around contentedly */}
      <path d="M98,95 Q122,80 118,60 Q114,45 100,50" stroke="#1a1a1a" strokeWidth="9" fill="none" strokeLinecap="round" />
      <ellipse cx="48" cy="103" rx="11" ry="5" fill="#1a1a1a" />
      <ellipse cx="82" cy="103" rx="11" ry="5" fill="#1a1a1a" />
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

function LaEleccion() {
  const [abierta, setAbierta] = useState(false);
  return (
    <div style={{ maxWidth: 420, margin: "0 auto 24px", textAlign: "center" }}>
      <p style={{
        fontFamily: "'Calibri', sans-serif",
        fontSize: "0.72rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#c8a84b",
        margin: "0 0 16px",
      }}>
        La Elección
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        {/* Caja cerrada */}
        <div
          onClick={() => setAbierta(false)}
          style={{
            flex: 1, maxWidth: 160,
            padding: "18px 12px",
            border: `1px solid ${!abierta ? "#c8a84b" : "#2a2418"}`,
            borderRadius: 6,
            cursor: "pointer",
            background: !abierta ? "#c8a84b0a" : "transparent",
            transition: "all 0.3s ease",
          }}
        >
          <svg viewBox="0 0 60 50" width="48" height="40" style={{ display: "block", margin: "0 auto 10px" }}>
            <rect x="5" y="20" width="50" height="28" rx="2" fill="none" stroke="#6a5a40" strokeWidth="1.5" />
            <rect x="5" y="20" width="50" height="10" rx="2" fill="none" stroke="#6a5a40" strokeWidth="1.5" />
            <line x1="30" y1="20" x2="30" y2="48" stroke="#6a5a40" strokeWidth="1" />
            <path d="M22,14 Q30,8 38,14" stroke="#c8a84b" strokeWidth="1.5" fill="none" />
          </svg>
          <p style={{ fontFamily: "'Calibri', sans-serif", fontSize: "0.7rem", color: !abierta ? "#c8bfa8" : "#4a4035", margin: 0, letterSpacing: "0.08em" }}>
            Quedarse en la caja
          </p>
        </div>
        {/* Caja abierta */}
        <div
          onClick={() => setAbierta(true)}
          style={{
            flex: 1, maxWidth: 160,
            padding: "18px 12px",
            border: `1px solid ${abierta ? "#c8a84b" : "#2a2418"}`,
            borderRadius: 6,
            cursor: "pointer",
            background: abierta ? "#c8a84b0a" : "transparent",
            transition: "all 0.3s ease",
          }}
        >
          <svg viewBox="0 0 60 50" width="48" height="40" style={{ display: "block", margin: "0 auto 10px" }}>
            <rect x="5" y="28" width="50" height="20" rx="2" fill="none" stroke="#c8a84b" strokeWidth="1.5" />
            <path d="M5,28 L15,12 L45,12 L55,28" fill="none" stroke="#c8a84b" strokeWidth="1.5" />
            <line x1="30" y1="28" x2="30" y2="48" stroke="#c8a84b" strokeWidth="1" />
            <line x1="30" y1="10" x2="30" y2="2" stroke="#c8a84b" strokeWidth="1" opacity="0.5" />
            <line x1="22" y1="12" x2="18" y2="4" stroke="#c8a84b" strokeWidth="1" opacity="0.4" />
            <line x1="38" y1="12" x2="42" y2="4" stroke="#c8a84b" strokeWidth="1" opacity="0.4" />
          </svg>
          <p style={{ fontFamily: "'Calibri', sans-serif", fontSize: "0.7rem", color: abierta ? "#c8bfa8" : "#4a4035", margin: 0, letterSpacing: "0.08em" }}>
            Salir de la caja
          </p>
        </div>
      </div>
      <p style={{
        fontFamily: "Georgia, serif",
        fontSize: "0.82rem",
        fontStyle: "italic",
        color: abierta ? "#9a8060" : "#4a4035",
        margin: "14px auto 0",
        maxWidth: 340,
        lineHeight: 1.7,
        transition: "color 0.4s ease",
      }}>
        {abierta
          ? "«Ya no podrás volver a ella; ya no podrás caber.»"
          : "«Es más fácil permanecer que cambiar.»"}
      </p>
    </div>
  );
}

export default function NecoSParte4() {
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
    const id = setInterval(() => setIdxDato(i => (i + 1) % DATOS_MITOLOGIA.length), 5000);
    return () => clearInterval(id);
  }, []);

  const progreso = Math.round((revelados.length / parrafos.length) * 100);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #08080e 0%, #10101c 50%, #080808 100%)",
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
              Fin de la Parte 4 — Cambio de Caja
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

            <LaEleccion />

            {/* Dato mitológico */}
            <div style={{
              background: "#10101a",
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
                Gato y Mitología
              </p>
              <p style={{
                fontSize: "0.95rem",
                color: "#9a9080",
                margin: 0,
                lineHeight: 1.7,
                fontStyle: "italic",
              }}>
                «{DATOS_MITOLOGIA[idxDato]}»
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
