import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-studio.jpg";
import { ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import BookingModal from "./BookingModal";

/* ─── Keyframe styles injected once ─────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .hero-root {
    font-family: 'Jost', sans-serif;
  }

  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes lineExpand {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes scrollPulse {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50%       { transform: translateY(6px); opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  .anim-fade-in     { animation: heroFadeIn  0.9s ease forwards; opacity: 0; }
  .anim-fade-up-1   { animation: heroFadeUp  0.9s 0.2s ease forwards; opacity: 0; }
  .anim-fade-up-2   { animation: heroFadeUp  0.9s 0.5s ease forwards; opacity: 0; }
  .anim-fade-up-3   { animation: heroFadeUp  0.9s 0.8s ease forwards; opacity: 0; }
  .anim-fade-up-4   { animation: heroFadeUp  0.9s 1.1s ease forwards; opacity: 0; }
  .anim-line        { animation: lineExpand  1.2s 0.4s cubic-bezier(.77,0,.18,1) forwards; transform: scaleX(0); transform-origin: left; }
  .anim-scroll      { animation: scrollPulse 2s 1.5s ease-in-out infinite; }

  .label-tag {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    line-height: 0.92;
    letter-spacing: -0.01em;
  }

  .hero-title em {
    font-style: italic;
    font-weight: 300;
    color: #c9a96e;
  }

  .hero-subtitle {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .btn-primary {
    background: #c9a96e;
    color: #0f0f0f;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.9rem 2.4rem;
    border: none;
    border-radius: 0;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
    display: inline-block;
    white-space: nowrap;
  }
  .btn-primary:hover {
    background: #b8924f;
  }

  .btn-ghost {
    background: transparent;
    color: rgba(255,255,255,0.7);
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.875rem 2.4rem;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 0;
    cursor: pointer;
    transition: border-color 0.3s, color 0.3s;
    display: inline-block;
    white-space: nowrap;
  }
  .btn-ghost:hover {
    border-color: rgba(255,255,255,0.55);
    color: rgba(255,255,255,1);
  }

  .side-text {
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    font-weight: 200;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    user-select: none;
  }

  .gold-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #c9a96e;
    display: inline-block;
    flex-shrink: 0;
  }

  .scroll-btn {
    width: 44px;
    height: 44px;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: transparent;
    transition: border-color 0.3s;
  }
  .scroll-btn:hover {
    border-color: rgba(255,255,255,0.5);
  }
`;

const Hero = () => {
  const { t } = useTranslation();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const parallaxOffset = scrollY * 0.35;

  return (
    <>
      <style>{styles}</style>

      <section
        className="hero-root"
        style={{
          position: "relative",
          height: "100svh",
          minHeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#0a0a0a",
        }}
      >
        {/* ── Background with parallax ── */}
        <div
          style={{
            position: "absolute",
            inset: "-15%",
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${parallaxOffset}px)`,
            willChange: "transform",
          }}
          className="anim-fade-in"
        />

        {/* ── Layered gradient overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.38) 50%, rgba(10,10,10,0.6) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.95) 100%)",
          }}
        />

        {/* ── Side label — left ── */}
        <div
          className="anim-fade-in"
          style={{
            position: "absolute",
            left: 32,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span className="side-text">Est. 2019 · Studio</span>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.12)" }} />
        </div>

        {/* ── Side label — right ── */}
        <div
          className="anim-fade-in"
          style={{
            position: "absolute",
            right: 32,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.12)" }} />
          <span className="side-text">Reformer · Mat · Barre</span>
        </div>

        {/* ── Main content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "left",
            maxWidth: 820,
            padding: "0 24px",
            width: "100%",
          }}
        >
          {/* Location pill */}
          <div
            className="anim-fade-up-1"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 36,
            }}
          >
            <span className="gold-dot" />
            <span className="label-tag" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t("hero.location")}
            </span>
          </div>

          {/* Decorative line */}
          <div
            className="anim-line"
            style={{
              width: 48,
              height: 1,
              background: "#c9a96e",
              marginBottom: 24,
            }}
          />

          {/* Title */}
          <h1
            className="hero-title anim-fade-up-2"
            style={{
              fontSize: "clamp(3.8rem, 10vw, 8rem)",
              color: "#f5f0e8",
              margin: 0,
              marginBottom: 4,
            }}
          >
            FORMA
          </h1>
          <h1
            className="hero-title anim-fade-up-2"
            style={{
              fontSize: "clamp(3.8rem, 10vw, 8rem)",
              color: "#f5f0e8",
              margin: 0,
              marginBottom: 32,
            }}
          >
            <em>Pilates</em>
          </h1>

          {/* Tagline */}
          <p
            className="hero-subtitle anim-fade-up-3"
            style={{
              fontSize: "clamp(0.65rem, 1.4vw, 0.8rem)",
              color: "rgba(255,255,255,0.5)",
              margin: 0,
              marginBottom: 52,
              maxWidth: 380,
            }}
          >
            {t("hero.tagline")}
          </p>

          {/* CTAs */}
          <div
            className="anim-fade-up-4"
            style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
          >
            <button className="btn-primary" onClick={() => setBookingOpen(true)}>
              {t("hero.bookSession")}
            </button>
            <button className="btn-ghost" onClick={scrollToContact}>
              {t("hero.contactUs")}
            </button>
          </div>
        </div>

        {/* ── Bottom stats bar ── */}
        <div
          className="anim-fade-in"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px 80px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 48,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(10,10,10,0.3)",
            backdropFilter: "blur(8px)",
          }}
        >
          {[
            { num: "6+", label: t("hero.yearsLabel") || "Years" },
            { num: "500+", label: t("hero.clientsLabel") || "Clients" },
            { num: "12", label: t("hero.classesLabel") || "Classes/Week" },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "#c9a96e",
                  lineHeight: 1,
                }}
              >
                {num}
              </div>
              <div className="label-tag" style={{ color: "rgba(255,255,255,0.35)", marginTop: 4 }}>
                {label}
              </div>
            </div>
          ))}

          {/* Scroll indicator */}
          <div style={{ marginLeft: 32 }}>
            <button
              className="scroll-btn anim-scroll"
              onClick={scrollToContact}
              aria-label="Scroll down"
            >
              <ArrowDown size={14} color="rgba(255,255,255,0.5)" />
            </button>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
};

export default Hero;