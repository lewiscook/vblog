import { useState, useEffect, useRef } from "react";

const title = "NECO";
const subtitle = "Part 3 — A Little Taste";
const copyright = "© L. Cook 2026";

const paragraphs = [
  { type: "dialogue", text: "—I think this conversation is going to run long — I'm going for another coffee, said Matt." },
  { type: "dialogue", text: "—A small bowl of warm milk — but not too hot, thank you —replied Neco." },
  { type: "dialogue", text: "—Anything else for the gentleman? —Matt continued in a sarcastic tone." },
  { type: "dialogue", text: "—Two generous slices of that delicious Iberian ham you have hanging in the kitchen —Neco answered." },
  { type: "dialogue", text: "—Quite the refined taste, haven't you? —Matt went on, still mocking." },
  { type: "dialogue", text: "—You are what you eat, Mathews. You like consuming junk food, I don't. That ham has spectacular aromas, beautiful colors, and that aged animal fat marbled through every fiber — it's a full sensory explosion! On second thought, add one more slice, and don't be stingy. Better yet, add a slice of Muenster cheese too — that's a delight in its own right: an intricate, nutty aroma, aged, with a creamy texture. It's like chewing a piece of milk! And that color, so striking! Mmm! Don't take too long, will you?" },
  { type: "dialogue", text: "—I can't believe it — the stray I pulled off the street turned out to be an aristo-cat. I think I chose wrong —Matt muttered on his way to the kitchen, in the dim light." },
  { type: "body",     text: "Evening had fallen, and the large windows no longer let in any light. His steps were slow but steady — Matt knew his home well — though he decided to switch on a small wall lamp, not too bright, but just enough to light the way through the shadows." },
  { type: "dialogue", text: "—You didn't choose me, Mathews — I chose you, Neco called out from a distance. — And take all that substandard food you've been giving me, which I've had to endure these past months as partial payment for my protection services. You need to learn to be grateful, Mathews. The good news is the ordeal is over. Now that you know my preferences, I'll be educating you gradually so we can avoid any further complications." },
  { type: "body",     text: "Am I in one of those lucid dreams? Matt wondered. He still hadn't fully processed what was happening; he thought perhaps he had fallen asleep and it was all a product of his imagination. Or maybe he had taken a fall and hit his head — he vaguely remembered reading somewhere that that kind of injury could cause hallucinations. It had to be something like that; there was no other explanation for any of this. Matt decided to slice the ham and cheese and warm the milk, reasoning that, hallucination or not, treating himself to a spread like that — with the option of a cortado if he felt like one — was never a bad idea. He poured himself a fresh coffee, picked up the plate of ham and the bowl of milk, and headed straight for the living room." },
  { type: "body",     text: "Neco was already waiting, seated on the coffee table, watching him in silence, his tail flicking in short, irritated spasms. Matt set the plate and coffee down on the table and made a shooing gesture with his hands — accompanied by a clicking sound with his lips — signaling the cat to get down. Neco didn't even flinch." },
  { type: "dialogue", text: "—A little more respect, Mathews — we are not the same. How difficult can it be to cut a little ham and cheese? You took far too long, and here I was, dying of hunger." },
  { type: "body",     text: "Okay, I didn't dream it. And it's not a hallucination, Matt thought." },
  { type: "dialogue", text: "—Explain to me in detail — what exactly are these protection services you claim to provide me? Rodents and insects are pretty rare around here, so... —Matt pressed, taking a sip of his coffee and pausing, waiting for an answer." },
  { type: "body",     text: "Neco looked at him, helped himself to some of the ham, took a few delicate sips of milk, and replied:" },
  { type: "dialogue", text: "—You're not good at following instructions either. I said a 'bowl' of milk — not a 'dish' of milk. The narrow rim of a dish hurts my whiskers. Can't you see that? You need to pay more attention. As for mice and insects — there are none because you're not infested. My protection services operate at a much higher level. I protect you from what you cannot see but can sometimes you can sense. Do I make myself clear?" },
  { type: "dialogue", text: "—Honestly? No. I have no idea what you're talking about, Matt replied." },
  { type: "dialogue", text: "—Pfft! Linear, rigid, and limited — like all humans —Neco went on—. I momentarily forgot that humans can only perceive a narrow band of the electromagnetic spectrum — no infrared, no other frequencies. Also limited in smell, touch, and hearing, flexibility, muscle composition, skeletal structure — you really are quite the marvel." },
  { type: "body",     text: "Matt stared at him with a half-confused expression, making circular gestures in the air with his hands and shaking his head." },
  { type: "dialogue", text: "—Please elaborate — limited how? he asked, in a slightly condescending tone." },
  { type: "dialogue", text: "—Fine. For example, you cannot see beyond the visible light spectrum, let alone across dimensions. If I told you there was something right behind you at this very moment, trying to figure out how to attack you — and you could actually see it — you would absolutely die of a heart attack on the spot. It hasn't attacked you because I am here. That is what I'm talking about. Those are the protection services I provide." },
  { type: "body",     text: "Neco raised his paw slightly, his pupils contracting, his gaze locking onto something just beyond Matt — and fell silent. Matt felt the hair on the back of his neck stand up, followed by a deep, bone-cold shiver running down his spine." },
  { type: "dialogue", text: "—Do you understand now? I only allowed it to give you a little taste — and your amygdala is already screaming at you. If I let it have its way, it would tear you apart in an instant —Neco added." },
];

const CAT_FACTS = [
  "Cats can see in near-darkness — their eyes need just one-sixth of the light humans require.",
  "A cat's field of view is about 200°, compared to 180° for humans.",
  "Cats have a tapetum lucidum — a reflective layer behind the retina that amplifies available light.",
  "Cats can hear frequencies up to 64 kHz; humans top out at around 20 kHz.",
  "A cat's sense of smell is 14 times stronger than a human's.",
  "Cats have around 244 bones — humans have 206.",
  "Cats can rotate their ears 180° independently to pinpoint sounds.",
];

function PawPrint({ style }) {
  return (
    <svg viewBox="0 0 60 60" style={{ width: 26, height: 26, opacity: 0.14, ...style }} fill="currentColor">
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
      {/* Alert/narrowed eyes for Part 3 */}
      <ellipse cx="50" cy="46" rx="5" ry="5" fill="#d4a030" />
      <ellipse cx="70" cy="46" rx="5" ry="5" fill="#d4a030" />
      {/* Slit pupils — narrowed, alert */}
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
      <ellipse cx="42" cy="103" rx="10" ry="6" fill="#1a1a1a" />
      <ellipse cx="78" cy="103" rx="10" ry="6" fill="#1a1a1a" />
      {/* Raised paw — alert pose */}
      <ellipse cx="42" cy="88" rx="8" ry="5" fill="#1a1a1a" transform="rotate(-20,42,88)" />
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

function SpectrumBar() {
  const bands = [
    { label: "Radio", color: "#1a1a3a", width: "12%" },
    { label: "Micro", color: "#1a2a3a", width: "10%" },
    { label: "IR", color: "#3a1a1a", width: "10%" },
    { label: "Visible", color: "linear-gradient(to right,#8b00ff,#4444ff,#00aaff,#00cc44,#cccc00,#ff8800,#ff2200)", width: "16%" },
    { label: "UV", color: "#2a1a3a", width: "10%" },
    { label: "X-Ray", color: "#1a2a1a", width: "10%" },
    { label: "Gamma", color: "#2a2a1a", width: "10%" },
    { label: "Beyond", color: "#0e0e0e", width: "22%" },
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
        The Electromagnetic Spectrum
      </p>
      <div style={{ display: "flex", height: 18, borderRadius: 4, overflow: "hidden", border: "1px solid #2a2418" }}>
        {bands.map((b, i) => (
          <div
            key={i}
            title={b.label}
            style={{
              width: b.width,
              background: b.color,
              position: "relative",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: "0.6rem", color: "#4a4035", fontFamily: "'Calibri', sans-serif" }}>← Human perception</span>
        <span style={{ fontSize: "0.6rem", color: "#c8a84b88", fontFamily: "'Calibri', sans-serif" }}>Cat perception →</span>
      </div>
    </div>
  );
}

function ProtectionStatus() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPulse(p => !p), 1400);
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
          background: pulse ? "#c8a84b" : "#6a5a30",
          boxShadow: pulse ? "0 0 8px #c8a84b" : "none",
          transition: "all 0.6s ease",
        }} />
        <span style={{ fontFamily: "'Calibri', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a84b" }}>
          Neco On Guard
        </span>
      </div>
      <p style={{ fontFamily: "'Calibri', sans-serif", fontSize: "0.65rem", color: "#4a4035", margin: 0, letterSpacing: "0.1em" }}>
        PROTECTION SERVICES ACTIVE
      </p>
    </div>
  );
}

export default function NecoPart3() {
  const [revealed, setRevealed] = useState([]);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [factIdx, setFactIdx] = useState(0);
  const endRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    if (revealed.length >= paragraphs.length) { setDone(true); return; }
    const t = setTimeout(
      () => setRevealed(r => [...r, r.length]),
      revealed.length === 0 ? 300 : 900
    );
    return () => clearTimeout(t);
  }, [started, revealed]);

  useEffect(() => {
    if (done) setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
  }, [done]);

  useEffect(() => {
    const id = setInterval(() => setFactIdx(i => (i + 1) % CAT_FACTS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const progress = Math.round((revealed.length / paragraphs.length) * 100);

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

      {/* Paw prints */}
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

      {/* Progress bar */}
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
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
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
              End of Part 3 — A Little Taste
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

            <SpectrumBar />
            <ProtectionStatus />

            {/* Cat facts */}
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
                Cat Perception Fact
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
          </div>
        )}
      </div>
    </div>
  );
}
