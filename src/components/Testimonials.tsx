import AnimatedSection from "./AnimatedSection";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  .tst-root {
    font-family: 'Jost', sans-serif;
    background: #0e0d0b;
    position: relative;
    overflow: hidden;
  }

  .tst-root::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 500px;
    background: radial-gradient(ellipse, rgba(201,169,110,0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  .tst-badge {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.62rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #c9a96e;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .tst-badge::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: #c9a96e;
    flex-shrink: 0;
  }

  .tst-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(2.4rem, 4.5vw, 3.8rem);
    color: #f5f0e8;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .tst-title em { font-style: italic; color: #c9a96e; }

  .tst-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.85rem;
    line-height: 1.85;
    color: rgba(245,240,232,0.4);
    margin: 0;
  }

  /* Rating display */
  .tst-rating-num {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 2.4rem;
    color: #c9a96e;
    line-height: 1;
  }
  .tst-rating-label {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.58rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.3);
    margin-top: 4px;
  }

  /* Carousel */
  .tst-track-wrap {
    overflow: hidden;
    position: relative;
  }

  .tst-track {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
  }

  .tst-slide {
    flex-shrink: 0;
    padding-right: 1px; /* gap via 1px bg */
  }

  .tst-card {
    border: 1px solid rgba(255,255,255,0.06);
    background: #0e0d0b;
    padding: 36px 32px;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: border-color 0.3s;
    box-sizing: border-box;
  }
  .tst-card:hover { border-color: rgba(201,169,110,0.2); }

  .tst-stars {
    display: flex;
    gap: 3px;
    margin-bottom: 20px;
  }

  .tst-star {
    color: #c9a96e;
    font-size: 11px;
  }

  .tst-quote-mark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.5rem;
    color: rgba(201,169,110,0.12);
    line-height: 1;
    margin-bottom: -8px;
    display: block;
    font-weight: 300;
  }

  .tst-text {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.8rem;
    line-height: 1.9;
    color: rgba(245,240,232,0.45);
    flex: 1;
    margin: 0 0 24px 0;
  }

  .tst-author-name {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: 1rem;
    color: #f5f0e8;
    margin: 0 0 4px 0;
  }

  .tst-verified {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.58rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.25);
  }

  /* Nav arrows */
  .tst-arrow {
    width: 44px;
    height: 44px;
    border: 1px solid rgba(255,255,255,0.1);
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(245,240,232,0.4);
    transition: border-color 0.25s, color 0.25s, background 0.25s;
    flex-shrink: 0;
    border-radius: 0;
  }
  .tst-arrow:hover {
    border-color: rgba(201,169,110,0.4);
    color: #c9a96e;
    background: rgba(201,169,110,0.04);
  }
  .tst-arrow:disabled {
    opacity: 0.2;
    cursor: default;
  }

  /* Dot nav */
  .tst-dot {
    width: 4px;
    height: 4px;
    background: rgba(255,255,255,0.15);
    border: none;
    cursor: pointer;
    transition: background 0.25s, width 0.3s;
    padding: 0;
    border-radius: 0;
  }
  .tst-dot.active {
    background: #c9a96e;
    width: 20px;
  }

  /* Google badge */
  .tst-google-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(255,255,255,0.07);
    padding: 10px 16px;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.35);
    text-decoration: none;
    transition: border-color 0.25s, color 0.25s;
    cursor: pointer;
  }
  .tst-google-badge:hover {
    border-color: rgba(201,169,110,0.3);
    color: #c9a96e;
  }
`;

const testimonials = [
  { name: "Antoine Nihal",      text: "Magnifique découverte. Le studio est magnifique, parfaitement équipé et l'atmosphère est apaisante. Les séances sont très bien encadrées, adaptées à chaque niveau et vraiment efficaces.", rating: 5 },
  { name: "Firdaous El Alaoui", text: "Ils sont très professionnels, je suis satisfaite de leurs cours. Je compte rester abonnée avec eux, car ils créent un climat incroyable, plein d'énergie positive et de motivation.", rating: 5 },
  { name: "Siham Belabied",     text: "J'ai récemment suivi un cours de Pilates dans ce studio et c'était vraiment génial ! L'accueil était top et l'expérience super professionnelle.", rating: 5 },
  { name: "Sanae Nejjar",       text: "Studio propre, excellent rapport qualité prix, ambiance sympathique, coach compétente et attentionnée. Mérite de loin les 5 étoiles.", rating: 5 },
  { name: "Kamal Adam",         text: "Excellent centre de Pilates à Rabat, avec une équipe hautement qualifiée et du matériel de qualité. Un lieu incontournable pour prendre soin de soi.", rating: 5 },
  { name: "Basma N.",           text: "Super cours de Pilates, l'ambiance était top. Merci pour ce moment !", rating: 5 },
];

const VISIBLE = 3; // cards visible at once (desktop)

const Testimonials = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(VISIBLE);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  const total = testimonials.length;
  const maxIndex = total - visibleCount;

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const v = w < 640 ? 1 : w < 1024 ? 2 : 3;
      setVisibleCount(v);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      const wrap = trackRef.current.parentElement;
      if (wrap) setCardWidth(wrap.offsetWidth / visibleCount);
    }
  }, [visibleCount]);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));

  return (
    <>
      <style>{styles}</style>
      <section className="tst-root" style={{ padding: "120px 0" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

          {/* ── Header row ── */}
          <AnimatedSection animation="fade-in-up">
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 32,
              marginBottom: 72,
              flexWrap: "wrap",
            }}>
              {/* Left: title block */}
              <div style={{ maxWidth: 500 }}>
                <div style={{ marginBottom: 24 }}>
                  <span className="tst-badge">{t("testimonials.badge")}</span>
                </div>
                <h2 className="tst-title" style={{ marginBottom: 24 }}>{t("testimonials.title")}</h2>
                <div style={{ width: 40, height: 1, background: "rgba(201,169,110,0.4)", marginBottom: 24 }} />
                <p className="tst-desc">{t("testimonials.description")}</p>
              </div>

              {/* Right: rating block + Google badge */}
              <div style={{ textAlign: "right" }}>
                {/* Stars */}
                <div style={{ display: "flex", gap: 4, justifyContent: "flex-end", marginBottom: 12 }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="tst-star">★</span>
                  ))}
                </div>
                <div className="tst-rating-num">5.0</div>
                <div className="tst-rating-label">{t("testimonials.onGoogle")}</div>

                <div style={{ marginTop: 20 }}>
                  <span className="tst-google-badge">
                    {t("testimonials.verifiedReview")} <ArrowUpRight size={10} />
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Carousel ── */}
          <AnimatedSection animation="fade-in-up" delay={150}>
            {/* Track */}
            <div className="tst-track-wrap" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div
                ref={trackRef}
                className="tst-track"
                style={{ transform: `translateX(-${current * (cardWidth + 1)}px)` }}
              >
                {testimonials.map((t_, i) => (
                  <div
                    key={i}
                    className="tst-slide"
                    style={{ width: cardWidth || `${100 / visibleCount}%` }}
                  >
                    <div className="tst-card">
                      <span className="tst-quote-mark">"</span>
                      <div className="tst-stars">
                        {[...Array(t_.rating)].map((_, si) => (
                          <span key={si} className="tst-star">★</span>
                        ))}
                      </div>
                      <p className="tst-text">{t_.text}</p>
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20 }}>
                        <p className="tst-author-name">{t_.name}</p>
                        <span className="tst-verified">{t("testimonials.verifiedReview")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 28,
              gap: 20,
            }}>
              {/* Dot nav */}
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    className={`tst-dot${i === current ? " active" : ""}`}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div style={{ display: "flex", gap: 8 }}>
                <button className="tst-arrow" onClick={prev} disabled={current === 0} aria-label="Previous">
                  <ChevronLeft size={16} strokeWidth={1.5} />
                </button>
                <button className="tst-arrow" onClick={next} disabled={current >= maxIndex} aria-label="Next">
                  <ChevronRight size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </>
  );
};

export default Testimonials;