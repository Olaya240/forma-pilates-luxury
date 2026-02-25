import aboutImage from "@/assets/about-studio.png";
import AnimatedSection from "./AnimatedSection";
import { useTranslation } from "react-i18next";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .about-root {
    font-family: 'Jost', sans-serif;
    background: #0e0d0b;
    position: relative;
    overflow: hidden;
  }

  /* Subtle grain texture overlay */
  .about-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 180px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  .about-badge {
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

  .about-badge::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: #c9a96e;
    flex-shrink: 0;
  }

  .about-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(2.6rem, 5vw, 4rem);
    color: #f5f0e8;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 0;
  }

  .about-title em {
    font-style: italic;
    color: #c9a96e;
  }

  .about-body {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.88rem;
    line-height: 1.85;
    color: rgba(245,240,232,0.5);
  }

  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 2.6rem;
    color: #c9a96e;
    line-height: 1;
  }

  .stat-label {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.3);
    margin-top: 6px;
  }

  .stat-divider {
    width: 1px;
    background: rgba(255,255,255,0.06);
    align-self: stretch;
  }

  .image-frame {
    position: relative;
  }

  /* Decorative gold border offset */
  .image-frame::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: -20px;
    bottom: -20px;
    border: 1px solid rgba(201,169,110,0.2);
    z-index: 0;
    pointer-events: none;
    transition: transform 0.6s ease;
  }

  .image-frame:hover::before {
    transform: translate(4px, 4px);
  }

  .image-wrap {
    position: relative;
    z-index: 1;
    overflow: hidden;
    line-height: 0;
  }

  .image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.8s cubic-bezier(.25,.46,.45,.94);
    filter: brightness(0.92) saturate(0.85);
  }

  .image-frame:hover .image-wrap img {
    transform: scale(1.04);
  }

  /* Gold overlay caption strip */
  .image-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 24px;
    background: linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 100%);
    z-index: 2;
    display: flex;
    align-items: flex-end;
    gap: 12px;
  }

  .image-caption-text {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }

  .section-line {
    width: 1px;
    background: rgba(255,255,255,0.06);
  }
`;

const About = () => {
  const { t } = useTranslation();

  const stats = [
    { num: "8+",   label: t("about.reformers") },
    { num: "15+",  label: t("about.classesWeek") },
    { num: "100+", label: t("about.members") },
  ];

  return (
    <>
      <style>{styles}</style>

      <section id="about" className="about-root" style={{ padding: "120px 0" }}>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 40px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 80,
              alignItems: "center",
            }}
          >
            {/* ── Left: Text content ── */}
            <AnimatedSection animation="fade-slide-left">
              <div style={{ maxWidth: 520 }}>
                {/* Badge */}
                <div style={{ marginBottom: 28 }}>
                  <span className="about-badge">{t("about.badge")}</span>
                </div>

                {/* Title */}
                <h2 className="about-title" style={{ marginBottom: 28 }}>
                  {t("about.title")}
                </h2>

                {/* Thin gold rule */}
                <div
                  style={{
                    width: 40,
                    height: 1,
                    background: "rgba(201,169,110,0.4)",
                    marginBottom: 28,
                  }}
                />

                {/* Body text */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <p className="about-body">{t("about.p1")}</p>
                  <p className="about-body">{t("about.p2")}</p>
                  <p className="about-body">{t("about.p3")}</p>
                </div>

                {/* Stats row */}
                <div
                  style={{
                    marginTop: 52,
                    display: "flex",
                    alignItems: "stretch",
                    gap: 0,
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {stats.map((s, i) => (
                    <>
                      <div
                        key={s.num}
                        style={{
                          flex: 1,
                          padding: "24px 20px",
                          textAlign: "center",
                          transition: "background 0.25s",
                          cursor: "default",
                        }}
                        onMouseEnter={e =>
                          (e.currentTarget.style.background = "rgba(201,169,110,0.05)")
                        }
                        onMouseLeave={e =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <div className="stat-num">{s.num}</div>
                        <div className="stat-label">{s.label}</div>
                      </div>
                      {i < stats.length - 1 && (
                        <div key={`div-${i}`} className="stat-divider" />
                      )}
                    </>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* ── Right: Image ── */}
            <AnimatedSection animation="fade-slide-right" delay={200}>
              <div className="image-frame">
                <div className="image-wrap" style={{ aspectRatio: "4/5" }}>
                  <img
                    src={aboutImage}
                    alt="FORMA Pilates Studio"
                    style={{ height: "100%", width: "100%" }}
                  />
                  <div className="image-caption">
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "#c9a96e",
                        flexShrink: 0,
                      }}
                    />
                    <span className="image-caption-text">FORMA Pilates Studio</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;