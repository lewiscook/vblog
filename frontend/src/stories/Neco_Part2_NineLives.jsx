import { useState, useEffect, useRef } from "react";

const title = "NECO";
const subtitle = "Part 2 — Nine Lives";
const copyright = "End of Neco, Part 2 — Nine Lives. © L. Cook 2026.";

const paragraphs = [
  { type: "body",     text: "His eyes opened slowly; he had lost all sense of how much time had passed." },
  { type: "dialogue", text: "—Can you speak? —Neco said—. For a moment I thought I'd lost you." },
  { type: "body",     text: "Matt rubbed his eyes, slowly pulled himself upright, and ended up sitting on the floor. Neco quickly jumped to the armrest of the armchair, bringing himself level with Matt. Now they could look directly at each other." },
  { type: "dialogue", text: "—How is this even possible? Animals don't talk! —Matt whispered." },
  { type: "dialogue", text: "—Of course we talk — don't be ridiculous, or anthropocentric —Neco shot back." },
  { type: "dialogue", text: "—But you never talked before. Why now?" },
  { type: "dialogue", text: "—You asked me something, Mathews — remember? I believe you want to know why I came into your life —Neco added." },
  { type: "body",     text: "Matt looked at him now with less fear and a touch of bold curiosity." },
  { type: "dialogue", text: "—Matt. The name is Matt, not Mathews." },
  { type: "dialogue", text: "—Whatever you say, Mathews —Neco continued, grooming his tail." },
  { type: "dialogue", text: "—I can't believe it — even when you speak you have that arrogant attitude —Matt accused." },
  { type: "dialogue", text: "—Pfft! Look who's talking about attitude — Mr. Congeniality himself —Neco replied, biting his paw again and making guttural sounds." },
  { type: "dialogue", text: "—You really need to stop doing that. It's disgusting — who knows where those paws have been, and then you go and lick them —Matt said with a grimace." },
  { type: "dialogue", text: "—Paws go where they go and grooming them is a genuine pleasure. Besides, I can't help it, Mathews — I'm a cat, it's my nature. The same way you pass gas when you think no one is watching. And that, Mathews, is truly disgusting —Neco replied with a smile." },
  { type: "body",     text: "The initial shock had worn off for Matt. Now it was curiosity driving him. How do all animals talk? Why don't we ever hear them? How long have they been talking? Do they speak every language? How do they communicate with each other? Hundreds of questions flooded his mind at breakneck speed." },
  { type: "dialogue", text: "—I have so many things to ask you — from why you decided to talk to me, to where you disappear to when I can't find you, to why it seems cats supposedly have so many lives —said Matt." },
  { type: "dialogue", text: "—Mathews, Mathews — I decided to speak to you because your life has gone off course. You seem stuck, stagnant, going nowhere, and you have a purpose to fulfill. The question should be when I disappear, not where I am when you look for me. As for my multiple lives — humans fall short in that regard, so you needn't even ask —Neco replied." },
  { type: "body",     text: "Matt looked confused — and not just from having just come to." },
  { type: "dialogue", text: "—What do you mean, multiple lives? I can assure you that when a human dies, they die, and that's it. It ends there. They don't go on." },
  { type: "dialogue", text: "—Pfft! What a rigid, linear, limited mind! Not only do you lack imagination, but you also lack bigger ears for listening, and quiet time for thinking and absorbing knowledge. Let me put it more simply so you can actually follow —Neco smiled—. Are you the same person you were forty years ago? Do you think the same way? Do you solve problems the same way? In other words — are you still living the same life you were living back then? How many times have you changed in the last forty years? How many lives have you lived?" },
  { type: "body",     text: 'Matt stared at him, speechless. Neco was right. He needed to think more, reflect more, grow more. But thinking more only raised more questions than it answered. Neco had only given an explanation for one of his points — he still hadn\'t explained what he meant by "rigid, linear, and limited." This was going to be a very long night, though Matt still had no idea how long.' },
];

const CAT_FACTS = [
  "Cats have five toes on their front paws but only four on their back ones.",
  "A cat's brain is biologically more similar to a human brain than a dog's brain.",
  "Cats can make over 100 different vocal sounds; dogs can only make about 10.",
  "A group of cats is called a clowder.",
  "Cats spend roughly 70% of their lives asleep.",
  "A cat's purr vibrates at 25–150 Hz — the same frequency range that promotes bone healing.",
  "Cats have a third eyelid called a nictitating membrane.",
];

function PawPrint({ style }) {
  return (
    <svg viewBox="0 0 60 60" style={{ width: 26, height: 26, opacity: 0.15, ...style }} fill="currentColor">
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
      <ellipse cx="50" cy="46" rx="5" ry="6" fill="#d4a030" />
      <ellipse cx="70" cy="46" rx="5" ry="6" fill="#d4a030" />
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

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "32px 0" }}>
      <div style={{ width: 80, height: 1, background: "linear-gradient(to right, transparent, #c8a84b)" }} />
      <span style={{ color: "#c8a84b", fontSize: 18 }}>✦</span>
      <div style={{ width: 80, height: 1, background: "linear-gradient(to left, transparent, #c8a84b)" }} />
    </div>
  );
}

export default function NecoPart2() {
  const [revealed, setRevealed] = useState([]);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [factIdx, setFactIdx] = useState(0);
  const endRef = useRef(null);

  // Staggered paragraph reveal
  useEffect(() => {
    if (!started) return;
    if (revealed.length >= paragraphs.length) { setDone(true); return; }
    const t = setTimeout(
      () => setRevealed(r => [...r, r.length]),
      revealed.length === 0 ? 300 : 900
    );
    return () => clearTimeout(t);
  }, [started, revealed]);

  // Scroll to end card when done
  useEffect(() => {
    if (done) setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
  }, [done]);

  // Rotate cat facts
  useEffect(() => {
    const id = setInterval(() => setFactIdx(i => (i + 1) % CAT_FACTS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const progress = Math.round((revealed.length / paragraphs.length) * 100);

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

      {/* Decorative paw prints */}
      {[...Array(7)].map((_, i) => (
        <div key={i} style={{
          position: "fixed",
          top: `${8 + i * 14}%`,
          left: i % 2 === 0 ? "1.5%" : "95%",
          color: "#c8a84b",
          pointerEvents: "none",
          zIndex: 0,
        }}>
          <PawPrint />
        </div>
      ))}

      {/* Reading progress bar */}
      {started && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "#1a1a26", zIndex: 100 }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(to right, #c8a84b, #e8c870)",
            transition: "width 0.8s ease",
            boxShadow: "0 0 8px rgba(200,168,75,0.5)",
          }} />
        </div>
      )}

      {/* Header */}
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
          {title}
        </h1>

        <div style={{
          fontFamily: "'Calibri', 'Segoe UI', sans-serif",
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          color: "#9a8860",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 32,
        }}>
          {subtitle}
        </div>

        <Divider />

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
            onMouseOver={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 6px 32px rgba(200,168,75,0.4)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(200,168,75,0.25)"; }}
          >
            Begin Reading
          </button>
        )}
      </div>

      {/* Story body */}
      <div style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: "0 28px",
        position: "relative",
        zIndex: 1,
      }}>
        {paragraphs.map((para, i) => (
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
              fontSize: "var(--story-font-size, 1.1rem)",
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
          <div ref={endRef} style={{ marginTop: 60, textAlign: "center" }}>
            <Divider />

            <p style={{
              fontFamily: "'Calibri', 'Segoe UI', sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6a6050",
              marginBottom: 8,
            }}>
              End of Part 2 — Nine Lives
            </p>
            <p style={{
              fontFamily: "'Calibri', 'Segoe UI', sans-serif",
              fontSize: "0.8rem",
              color: "#4a4035",
              letterSpacing: "0.1em",
              marginBottom: 48,
            }}>
              © L. Cook 2026
            </p>

            {/* Cat fact ticker */}
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
                Cat Fact
              </p>
              <p style={{
                fontSize: "0.95rem",
                color: "#9a9080",
                margin: 0,
                lineHeight: 1.7,
                fontStyle: "italic",
              }}>
                "{CAT_FACTS[factIdx]}"
              </p>
            </div>

            {/* Lives counter — thematic to Part 2 */}
            <div style={{
              marginTop: 32,
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
            }}>
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  title={`Life ${i + 1}`}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "1px solid #3a3020",
                    background: i < 8 ? "transparent" : "#c8a84b22",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    color: "#6a5a40",
                  }}
                >
                  {i === 8 ? "✦" : "◦"}
                </div>
              ))}
            </div>
            <p style={{
              fontFamily: "'Calibri', sans-serif",
              fontSize: "0.7rem",
              color: "#4a4035",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: 12,
            }}>
              Nine lives
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
