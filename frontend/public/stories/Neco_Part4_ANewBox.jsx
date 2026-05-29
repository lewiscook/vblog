import { useState, useEffect, useRef } from "react";

const title = "NECO";
const subtitle = "Part 4 — A New Box";
const copyright = "© L. Cook 2026";

const paragraphs = [
  { type: "dialogue", text: "—What the devilish thing was that? — said Matt." },
  { type: "dialogue", text: "—Exactly —replied Neco." },
  { type: "dialogue", text: "—What do you mean, exactly? What are you saying? —Matt added." },
  { type: "dialogue", text: "—A bit slow on the uptake, aren't we. I simply confirmed your suspicion, Mathews: what gave you that little taste was a lesser demon — a low spirit, a kind of parasite that feeds on negative human emotions, like fear, anger, jealousy... I think you get the idea." },
  { type: "body",     text: "Matt stared at him in astonishment. He had always dismissed stories of demons, ghosts, and all that sort of thing as products of superstition and ignorance. For Matt, if something couldn't be proven or replicated, it simply didn't exist. Logic told him that what he had felt a few minutes ago had a natural cause — but that same logic also reminded him that, until very recently, animals couldn't speak like humans, and yet here they were." },
  { type: "body",     text: "Matt thought it would be best to ask Neco to elaborate. He looked at him and asked:" },
  { type: "dialogue", text: "—So demons actually exist? They're not just invented to scare children?" },
  { type: "dialogue", text: "—Of course they exist. The vast majority of humans have stopped believing in them — and that only increases their power." },
  { type: "body",     text: "Matt swallowed hard, slightly nervous, and pressed for more details." },
  { type: "dialogue", text: "—I always thought they were just something grandparents made up to keep us in line. How many are there? Why can't we see them?" },
  { type: "body",     text: "Neco gave himself a couple of licks, a quick yawn, curled his tail forward, and said:" },
  { type: "dialogue", text: "—The answers to those questions, Mathews, are far more complex and lengthy than you can imagine right now. Despite everything humans think, believe, and deduce using tools like science, history, and physical instruments such as infrared lenses, subsonic microphones, and many other crutches — there is far more that remains unknown. The universe is, for humans, a deep and largely unexplored ocean. They don't know its rules, and they continually fall into periods of self-contradiction because of that ignorance. Some deny the advances of others, and after long disputes, they discard the knowledge that was gained and push forward in only one direction. The universe has infinite directions — it cannot be understood through nearsighted lenses that hijack its clarity, direction, and depth. Most interpretations must be included to understand it more fully — a clearer vision, if you will. Do I make myself clear?" },
  { type: "dialogue", text: "—I'm genuinely stunned, Neco. I hear what you're saying, but I don't fully grasp the message. Please explain further —replied Matt." },
  { type: "body",     text: "Neco took two more laps of milk, a few small nibbles of the cheese, and continued:" },
  { type: "dialogue", text: "—Alright, let's go piece by piece — and you tell me where you need me to expand, just like now. Most humans reason and deduce in dichotomies: good or bad, it is or it isn't, true or false — and without guilt they reject everything that falls between the two, just like you in this conversation, dividing what your academic background tells you is acceptable from what you choose to ignore because it's 'superstition,' when in reality things include far more than you intuit, Mathews. Your ancestors recognized duality and its grey areas, and they spoke about it openly. The knowledge of demons: the Sumerians defined them as Udug, the Babylonians called them Utukku, the Egyptians knew them as Isfet, the Hebrews called them Satan — and many more besides, all referring to the same force: chaos. Centuries later, other groups destroyed books, texts, tablets — everything that could have helped humans establish a balance between order and chaos. The struggle for power and collective ignorance allowed some texts to survive, but they are ignored. In the present day they are considered an ancient interpretation of natural forces, an invention to fill the void of knowledge. And that is now the 'official' version — and if anyone dares to offer an alternative, they are immediately repudiated, branded, and cast out: turned into a pariah. That is why no one dares to challenge what has been established, to defy the status quo — and knowledge suffers, it stagnates. But here comes the most interesting part, Mathews: the universe does not care what the status quo establishes. The universe moves forward and acts accordingly, regardless of ignorance of its laws. As in your case — you don't believe in demons, and yet you felt their little taste. Didn't you?" },
  { type: "body",     text: "Matt had listened carefully. What Neco had explained made sense, and it was undeniable that what he had felt was real. He had never told Neco what he had perceived in that instant — but Neco already knew. That, added to everything else, confirmed it had been a real event, not an imagined one. From the perspective Neco was offering, the reality Matt had always considered a bastion of what he knew — the foundation of his logic and the center of his decision-making — had just been shattered to pieces. That fortress, brought down by a single little taste of what didn't exist until a few minutes ago. The conversation with Neco, far from clearing up doubts, was causing them to multiply exponentially. Matt sighed, willing to hear more, and slid more ham toward Neco." },
  { type: "dialogue", text: "—Please, go on." },
  { type: "body",     text: "Neco took another couple of bites of the ham, declared it delicious, quickly cleaned his whiskers with a couple of licks, and said:" },
  { type: "dialogue", text: "—As I was saying, Mathews, humans don't just have an obtuse intellectual perception — they also have physical limitations, as I said before: a very limited being. Other creatures that inhabit this plane see with far greater sharpness than man: eagles, equipped with high-definition vision eight times more powerful than a human's. Mantis shrimp — delicious, by the way — perceive five times more colours than humans; snakes, equipped with infrared sensors, are capable of seeing in complete darkness; bees see in ultraviolet; and the list goes on. And that's only the physical plane, Mathews. Demons belong to the multidimensional plane, beyond the fourth dimension — humans, sadly, only comprehend three. It is very difficult to explain to a three-dimensional being how all the remaining dimensions function. But remember, Mathews: the universe does not care about your ignorance." },
  { type: "body",     text: "Matt nodded and let out a deep sigh, as if trying to absorb and process what he had just heard. In the distance, lightning rumbled and its flashes came through the large windows, foreshadowing a storm. It seemed tonight was going to be a night of storms — atmospheric, spiritual, and cognitive. Nothing quite like a good shaking of the intellect. Paradigm shifts are always difficult to accept, and even more so when they have been embedded for many years as immutable truths, Matt thought. That is why humans resist change: it is easier to stay than to move." },
  { type: "dialogue", text: "—So then, Neco — if demons exist, then angels must exist too: good and evil. Right? —Matt asked." },
  { type: "body",     text: "I don't know why I waste my time — all humans are the same. Nothing changes. No one changes, everything is predictable, and this human is no exception. Neco stretched himself out, gave a brief yawn, settled into the armchair facing Matt, and sighed." },
  { type: "dialogue", text: "—There it is again — that binary vision, Mathews. Between good and evil there are also grey areas. I suggest you start thinking in those terms. As for demons and angels, those are human labels created to make sense of them. In reality, they are the same beings — they simply have different political affiliations." },
  { type: "body",     text: "Matt couldn't help it — that smile gave him chills." },
  { type: "dialogue", text: "—Could you please stop doing that? It gives me the creeps just watching you. It's going to take me some time to get used to it." },
  { type: "dialogue", text: "—Alright, Mathews — I'll try to hold back, so you can't say later that I never do anything for you —Neco replied." },
  { type: "dialogue", text: "—Thank you —Matt acknowledged." },
  { type: "dialogue", text: "—As I was saying —Neco continued—, what you understand as heaven is a part of the universe itself — another dimension, different from the one we currently inhabit. The beings you divide between angels and demons in truth belong to a complex ecosystem that would take me a very long time to describe. As I said, the labels you use are human constructs, and that ecosystem is not divided along those lines. Don't misunderstand me — divisions do exist, but they are hierarchical, pyramidal, and each element occupies a place according to its function. The classification is based on function, character, and intelligence, Mathews. Some command, others execute, and all obey. The political divisions you mention are the result of differences in opinion and power struggles. This separation began many human eons ago and continues to this day — perhaps several more human civilizations will come and go before that dispute reaches its end." },
  { type: "dialogue", text: "—Are you referring to a war, Neco? —Matt asked." },
  { type: "dialogue", text: "—Yes, I believe so — from your point of view, Mathews, a 'celestial war,' to use your terms —Neco answered." },
  { type: "dialogue", text: "—What is the cause of the discord, Neco? What started the rift? —Matt asked." },
  { type: "body",     text: "Neco was silent for a few seconds, then answered:" },
  { type: "dialogue", text: "—Humans, Matt — humans are the crux of the problem. One side wants to see them expand, grow, evolve. The other simply wants them annihilated. The ones who have somehow maintained the balance up to now are those in the middle — sitting on the fence, so to speak. You see how it's better not to classify everything in absolutes? It is those in the middle, in the grey area, who maintain something like a ceasefire as humans would understand it — a space for dialogue, where humans survive." },
  { type: "dialogue", text: "—I need another coffee, Neco. Would you like anything from the kitchen? This conversation is getting sharp —said Matt." },
  { type: "dialogue", text: "—No thank you — I'll wait here. But I want to warn you of something first, so you can think it over and tell me when you return whether you want to continue, Mathews. Once you learn what is truly happening, your consciousness will expand — and with it, so will your risks. There are many beings with a strong interest in preventing that from happening, Mathews. Once you abandon that comfortable box you exist in and your universe expands, you will never be able to return to it. You won't fit inside it anymore. Your entire framework of knowledge will fall to pieces at the same time as you take on new truths. There is no going back, Mathews. You cannot unlearn what you already know. Think about it." },
];

const CAT_FACTS = [
  "Cats are one of the few animals known to initiate play with humans purely for social reasons.",
  "Ancient Egyptians revered cats as guardians against evil spirits and misfortune.",
  "A cat's whiskers are roughly as wide as its body — a precise spatial navigation tool.",
  "Cats can detect earthquake tremors seconds before humans through vibration-sensitive paws.",
  "The Norse goddess Freyja rode a chariot pulled by two giant cats.",
  "In Japanese folklore, the maneki-neko (beckoning cat) is said to ward off evil and bring luck.",
  "Cats have a vomeronasal organ that lets them 'taste' scents — perceiving layers invisible to us.",
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

// Neco seated, contemplative — slightly tilted, wise pose
function NecoSVG() {
  return (
    <svg viewBox="0 0 130 120" width="120" height="110" style={{ display: "block", margin: "0 auto" }}>
      {/* Body — slightly reclined */}
      <ellipse cx="65" cy="82" rx="36" ry="26" fill="#1a1a1a" transform="rotate(-5,65,82)" />
      {/* Head */}
      <ellipse cx="65" cy="48" rx="26" ry="24" fill="#1a1a1a" />
      {/* Ears */}
      <polygon points="43,30 35,10 55,27" fill="#1a1a1a" />
      <polygon points="87,30 95,10 75,27" fill="#1a1a1a" />
      <polygon points="45,28 39,14 55,27" fill="#5a2a2a" />
      <polygon points="85,28 91,14 75,27" fill="#5a2a2a" />
      {/* Eyes — half-lidded, wise */}
      <ellipse cx="53" cy="47" rx="5" ry="4" fill="#d4a030" />
      <ellipse cx="77" cy="47" rx="5" ry="4" fill="#d4a030" />
      <ellipse cx="53" cy="48" rx="2" ry="3.5" fill="#111" />
      <ellipse cx="77" cy="48" rx="2" ry="3.5" fill="#111" />
      <circle cx="55" cy="45" r="1" fill="white" />
      <circle cx="79" cy="45" r="1" fill="white" />
      {/* Nose */}
      <polygon points="65,56 62,53 68,53" fill="#c06080" />
      {/* Subtle smile */}
      <path d="M62,57 Q65,61 68,57" stroke="#c06080" strokeWidth="1.2" fill="none" />
      {/* Whiskers */}
      <line x1="37" y1="53" x2="58" y2="55" stroke="#888" strokeWidth="0.8" />
      <line x1="37" y1="56" x2="58" y2="57" stroke="#888" strokeWidth="0.8" />
      <line x1="93" y1="53" x2="72" y2="55" stroke="#888" strokeWidth="0.8" />
      <line x1="93" y1="56" x2="72" y2="57" stroke="#888" strokeWidth="0.8" />
      {/* Tail curled around — content */}
      <path d="M98,95 Q122,80 118,60 Q114,45 100,50" stroke="#1a1a1a" strokeWidth="9" fill="none" strokeLinecap="round" />
      {/* Paws tucked */}
      <ellipse cx="48" cy="103" rx="11" ry="5" fill="#1a1a1a" />
      <ellipse cx="82" cy="103" rx="11" ry="5" fill="#1a1a1a" />
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

// The Box — open vs closed visual
function TheBox() {
  const [open, setOpen] = useState(false);
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
        The Choice
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        {/* Closed box */}
        <div
          onClick={() => setOpen(false)}
          style={{
            flex: 1,
            maxWidth: 160,
            padding: "18px 12px",
            border: `1px solid ${!open ? "#c8a84b" : "#2a2418"}`,
            borderRadius: 6,
            cursor: "pointer",
            background: !open ? "#c8a84b0a" : "transparent",
            transition: "all 0.3s ease",
          }}
        >
          <svg viewBox="0 0 60 50" width="48" height="40" style={{ display: "block", margin: "0 auto 10px" }}>
            <rect x="5" y="20" width="50" height="28" rx="2" fill="none" stroke="#6a5a40" strokeWidth="1.5" />
            <rect x="5" y="20" width="50" height="10" rx="2" fill="none" stroke="#6a5a40" strokeWidth="1.5" />
            <line x1="30" y1="20" x2="30" y2="48" stroke="#6a5a40" strokeWidth="1" />
            <path d="M22,14 Q30,8 38,14" stroke="#c8a84b" strokeWidth="1.5" fill="none" />
          </svg>
          <p style={{ fontFamily: "'Calibri', sans-serif", fontSize: "0.7rem", color: !open ? "#c8bfa8" : "#4a4035", margin: 0, letterSpacing: "0.1em" }}>
            Stay in the box
          </p>
        </div>
        {/* Open box */}
        <div
          onClick={() => setOpen(true)}
          style={{
            flex: 1,
            maxWidth: 160,
            padding: "18px 12px",
            border: `1px solid ${open ? "#c8a84b" : "#2a2418"}`,
            borderRadius: 6,
            cursor: "pointer",
            background: open ? "#c8a84b0a" : "transparent",
            transition: "all 0.3s ease",
          }}
        >
          <svg viewBox="0 0 60 50" width="48" height="40" style={{ display: "block", margin: "0 auto 10px" }}>
            <rect x="5" y="28" width="50" height="20" rx="2" fill="none" stroke="#c8a84b" strokeWidth="1.5" />
            <path d="M5,28 L15,12 L45,12 L55,28" fill="none" stroke="#c8a84b" strokeWidth="1.5" />
            <line x1="30" y1="28" x2="30" y2="48" stroke="#c8a84b" strokeWidth="1" />
            {/* Light rays escaping */}
            <line x1="30" y1="10" x2="30" y2="2" stroke="#c8a84b" strokeWidth="1" opacity="0.5" />
            <line x1="22" y1="12" x2="18" y2="4" stroke="#c8a84b" strokeWidth="1" opacity="0.4" />
            <line x1="38" y1="12" x2="42" y2="4" stroke="#c8a84b" strokeWidth="1" opacity="0.4" />
          </svg>
          <p style={{ fontFamily: "'Calibri', sans-serif", fontSize: "0.7rem", color: open ? "#c8bfa8" : "#4a4035", margin: 0, letterSpacing: "0.1em" }}>
            Step outside
          </p>
        </div>
      </div>
      {open && (
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: "0.8rem",
          fontStyle: "italic",
          color: "#9a8060",
          margin: "14px 0 0",
          lineHeight: 1.7,
        }}>
          "You will never be able to return to it. You won't fit inside it anymore."
        </p>
      )}
      {!open && (
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: "0.8rem",
          fontStyle: "italic",
          color: "#4a4035",
          margin: "14px 0 0",
          lineHeight: 1.7,
        }}>
          "It is easier to stay than to move."
        </p>
      )}
    </div>
  );
}

export default function NecoPart4() {
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
      background: "linear-gradient(160deg, #08080e 0%, #10101c 50%, #080808 100%)",
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
              End of Part 4 — A New Box
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

            <TheBox />

            {/* Cat facts */}
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
                Cat & Mythology
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
