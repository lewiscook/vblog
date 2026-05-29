import { useState, useEffect, useRef } from "react";

const story = {
  title: "Neco",
  subtitle: "Part 1 — The Weekend",
  copyright: "© L. Cook 2026",
  paragraphs: [
    {
      type: "body",
      text: `The weekend was fast approaching. After a long day's work, Matt headed to his kitchen, switched on his coffee maker, and fixed himself a delicious coffee with chocolate, alongside a piece of freshly baked bread he had picked up on his way home. He grabbed his tray, made his way to his "favorite" armchair, kicked off his shoes, peeled off his socks, wiggled his toes, reclined the chair, picked up his glasses and the book he was currently reading, and settled in.`,
    },
    {
      type: "body",
      text: `In a corner of the living room, quiet and watchful, sat Neco — a fluffy black cat Matt had taken in off the street on a cold, rainy day, much like today. He had bathed him, rid him of fleas, and now the two shared a home. This cat was a stark contrast to the canine who was probably curled up in a ball next to the clothes dryer, napping away as usual. Neco was clean, stealthy, well-behaved, and sometimes one might genuinely wonder if he had vanished from the house altogether — nobody could find him for hours. Inu, on the other hand, was a whirlwind of energy: loud, mouthy, and with an inexplicable hatred for flip-flops, shoes, and above all, furniture legs. Matt had long since resigned himself to never having a proper living room. Between the fur and the bite marks, investing in anything worthwhile simply wasn't a good idea.`,
    },
    {
      type: "body",
      text: `Matt glanced over at Neco, sighed, and said:`,
    },
    {
      type: "dialogue",
      text: `—What do you say, Neco — care for coffee too?`,
    },
    {
      type: "body",
      text: `The cat remained silent.`,
    },
    {
      type: "dialogue",
      text: `—What a life you have. No rent, no food bill, no work, and you live like a king —Matt grumbled. Honestly, I don't know what you bring to this relationship. You don't catch mice, you ignore me completely, and you only come to me with demands. I really don't know why you came into my life, —Matt concluded, considering the matter closed.`,
    },
    {
      type: "body",
      text: `Neco, licking one of his paws, gave it a couple of gentle nibbles, a few little tugs, flicked his tail slightly, struck a pose, and cast a furtive glance around the room. Then he looked Matt dead in the eyes — and smiled. Not a cat's smirk. A smile. Almost human. Matt nearly leapt out of his skin, feeling as though his heart had stopped. Neco watched him and said:`,
    },
    {
      type: "dialogue",
      text: `—Sit down, man. You're going to have a heart attack.`,
    },
    {
      type: "body",
      text: `Matt was petrified. His muscles refused to respond. The shock had paralyzed him completely. Neco continued:`,
    },
    {
      type: "dialogue",
      text: `—Do you really want to know why I came into your life? Are you willing to hear it without dying in the process?`,
    },
    {
      type: "body",
      text: `Matt couldn't answer. He only felt the whole world go dark as he lost consciousness.`,
    },
  ],
};

const CAT_FACTS = [
  "Cats spend 70% of their lives sleeping.",
  "A group of cats is called a clowder.",
  "Cats have 32 muscles in each ear.",
  "A cat's purr vibrates at 25–150 Hz — the same range that promotes bone healing.",
  "Cats can't taste sweetness.",
  "The oldest known pet cat was 38 years old.",
  "Cats have a third eyelid called a nictitating membrane.",
];

function PawPrint({ style }) {
  return (
    <svg
      viewBox="0 0 60 60"
      style={{ width: 28, height: 28, opacity: 0.18, ...style }}
      fill="currentColor"
    >
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
    <svg viewBox="0 0 120 120" width="110" height="110" style={{ display: "block" }}>
      {/* Body */}
      <ellipse cx="60" cy="80" rx="34" ry="28" fill="#1a1a1a" />
      {/* Head */}
      <ellipse cx="60" cy="48" rx="26" ry="24" fill="#1a1a1a" />
      {/* Ears */}
      <polygon points="38,30 30,10 50,26" fill="#1a1a1a" />
      <polygon points="82,30 90,10 70,26" fill="#1a1a1a" />
      {/* Inner ears */}
      <polygon points="40,28 34,14 50,26" fill="#5a2a2a" />
      <polygon points="80,28 86,14 70,26" fill="#5a2a2a" />
      {/* Eyes */}
      <ellipse cx="50" cy="46" rx="5" ry="6" fill="#d4a030" />
      <ellipse cx="70" cy="46" rx="5" ry="6" fill="#d4a030" />
      <ellipse cx="50" cy="47" rx="2" ry="5" fill="#111" />
      <ellipse cx="70" cy="47" rx="2" ry="5" fill="#111" />
      {/* Eye shine */}
      <circle cx="52" cy="44" r="1.2" fill="white" />
      <circle cx="72" cy="44" r="1.2" fill="white" />
      {/* Nose */}
      <polygon points="60,55 57,52 63,52" fill="#c06080" />
      {/* Mouth — the smile */}
      <path d="M57,56 Q60,60 63,56" stroke="#c06080" strokeWidth="1.2" fill="none" />
      {/* Whiskers */}
      <line x1="34" y1="52" x2="54" y2="54" stroke="#888" strokeWidth="0.8" />
      <line x1="34" y1="55" x2="54" y2="56" stroke="#888" strokeWidth="0.8" />
      <line x1="34" y1="58" x2="54" y2="57" stroke="#888" strokeWidth="0.8" />
      <line x1="86" y1="52" x2="66" y2="54" stroke="#888" strokeWidth="0.8" />
      <line x1="86" y1="55" x2="66" y2="56" stroke="#888" strokeWidth="0.8" />
      <line x1="86" y1="58" x2="66" y2="57" stroke="#888" strokeWidth="0.8" />
      {/* Tail */}
      <path d="M90,90 Q115,75 108,55" stroke="#1a1a1a" strokeWidth="9" fill="none" strokeLinecap="round" />
      {/* Paws */}
      <ellipse cx="42" cy="103" rx="10" ry="6" fill="#1a1a1a" />
      <ellipse cx="78" cy="103" rx="10" ry="6" fill="#1a1a1a" />
    </svg>
  );
}

export default function NecoStory() {
  const [revealed, setRevealed] = useState([]);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [catFact, setCatFact] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const endRef = useRef(null);

  // Reveal paragraphs one by one as the user starts reading
  useEffect(() => {
    if (!started) return;
    if (revealed.length >= story.paragraphs.length) {
      setDone(true);
      return;
    }
    const delay = revealed.length === 0 ? 300 : 900;
    const t = setTimeout(() => {
      setRevealed((r) => [...r, r.length]);
    }, delay);
    return () => clearTimeout(t);
  }, [started, revealed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCatFact((f) => (f + 1) % CAT_FACTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (done && endRef.current) {
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
    }
  }, [done]);

  const progress = Math.round((revealed.length / story.paragraphs.length) * 100);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0e0e12 0%, #141420 50%, #0e0e0e 100%)",
      color: "#e8dfc8",
      fontFamily: "Georgia, 'Times New Roman', serif",
      padding: "0 0 80px",
      position: "relative",
      overflowX: "hidden",
    }}>
      {/* Decorative paw prints */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "fixed",
          top: `${10 + i * 16}%`,
          left: i % 2 === 0 ? "2%" : "94%",
          color: "#c8a84b",
          pointerEvents: "none",
          zIndex: 0,
        }}>
          <PawPrint />
        </div>
      ))}

      {/* Header */}
      <div style={{
        textAlign: "center",
        padding: "60px 20px 40px",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ marginBottom: 24 }}>
          <NecoSVG />
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* centered under cat */}
          </div>
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
          NECO
        </h1>

        <div style={{
          fontFamily: "'Calibri', 'Segoe UI', sans-serif",
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          color: "#9a8860",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 32,
        }}>
          Part 1 — The Weekend
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 40 }}>
          <div style={{ width: 80, height: 1, background: "linear-gradient(to right, transparent, #c8a84b)" }} />
          <span style={{ color: "#c8a84b", fontSize: 18 }}>✦</span>
          <div style={{ width: 80, height: 1, background: "linear-gradient(to left, transparent, #c8a84b)" }} />
        </div>

        {!started && (
          <button
            onClick={() => setStarted(true)}
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
            onMouseOver={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 6px 32px rgba(200,168,75,0.4)"; }}
            onMouseOut={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 24px rgba(200,168,75,0.25)"; }}
          >
            Begin Reading
          </button>
        )}
      </div>

      {/* Progress bar */}
      {started && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: 3,
          background: "#1a1a26",
          zIndex: 100,
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(to right, #c8a84b, #e8c870)",
            transition: "width 0.8s ease",
            boxShadow: "0 0 8px rgba(200,168,75,0.5)",
          }} />
        </div>
      )}

      {/* Story content */}
      <div style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: "0 28px",
        position: "relative",
        zIndex: 1,
      }}>
        {story.paragraphs.map((para, i) => (
          <div
            key={i}
            style={{
              opacity: revealed.includes(i) ? 1 : 0,
              transform: revealed.includes(i) ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              marginBottom: "1.6em",
              paddingLeft: para.type === "dialogue" ? 28 : 0,
              borderLeft: para.type === "dialogue" ? "2px solid #3a3020" : "none",
            }}
          >
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.13rem)",
              lineHeight: 2,
              color: para.type === "dialogue" ? "#d8cdb0" : "#c8bfa8",
              margin: 0,
              fontStyle: para.type === "dialogue" ? "italic" : "normal",
              textAlign: "justify",
            }}>
              {para.text}
            </p>
          </div>
        ))}

        {/* End card */}
        {done && (
          <div
            ref={endRef}
            style={{
              marginTop: 60,
              textAlign: "center",
              opacity: 1,
              animation: "fadeIn 1s ease forwards",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 32 }}>
              <div style={{ width: 60, height: 1, background: "linear-gradient(to right, transparent, #c8a84b)" }} />
              <span style={{ color: "#c8a84b", fontSize: 18 }}>✦</span>
              <div style={{ width: 60, height: 1, background: "linear-gradient(to left, transparent, #c8a84b)" }} />
            </div>

            <p style={{
              fontFamily: "'Calibri', 'Segoe UI', sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6a6050",
              marginBottom: 8,
            }}>
              End of Part 1 — The Weekend
            </p>
            <p style={{
              fontFamily: "'Calibri', 'Segoe UI', sans-serif",
              fontSize: "0.8rem",
              color: "#4a4035",
              letterSpacing: "0.1em",
            }}>
              {story.copyright}
            </p>

            {/* Cat fact ticker */}
            <div style={{
              marginTop: 48,
              background: "#16161e",
              border: "1px solid #2a2418",
              borderRadius: 8,
              padding: "20px 28px",
              maxWidth: 420,
              margin: "48px auto 0",
            }}>
              <p style={{
                fontFamily: "'Calibri', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c8a84b",
                margin: "0 0 10px",
              }}>
                Cat Fact
              </p>
              <p style={{
                fontSize: "0.95rem",
                color: "#9a9080",
                margin: 0,
                lineHeight: 1.6,
                transition: "opacity 0.5s",
                fontStyle: "italic",
              }}>
                "{CAT_FACTS[catFact]}"
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
