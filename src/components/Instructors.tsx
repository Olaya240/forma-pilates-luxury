import AnimatedSection from "./AnimatedSection";
import { Instagram, Award, Heart, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  .ins-root {
    font-family: 'Jost', sans-serif;
    background: #0a0a0a;
    position: relative;
    overflow: hidden;
  }

  .ins-root::before {
    content: '';
    position: absolute;
    top: 0;
    right: -5%;
    width: 550px;
    height: 600px;
    background: radial-gradient(ellipse, rgba(201,169,110,0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Header ── */
  .ins-badge {
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
  .ins-badge::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: #c9a96e;
    flex-shrink: 0;
  }

  .ins-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(2.6rem, 5vw, 4.2rem);
    color: #f5f0e8;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .ins-title em { font-style: italic; color: #c9a96e; }

  .ins-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.85rem;
    line-height: 1.85;
    color: rgba(245,240,232,0.4);
    margin: 0;
    max-width: 420px;
  }

  /* ── Grid ── */
  .ins-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    background: rgba(255,255,255,0.04);
  }
  @media (max-width: 900px)  { .ins-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px)  { .ins-grid { grid-template-columns: 1fr; } }

  /* ── Card ── */
  .ins-card {
    background: #0a0a0a;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    transition: border-color 0.35s;
  }

  /* Image wrapper */
  .ins-img-wrap {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: #111;
  }

  .ins-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
    filter: brightness(0.85) saturate(0.7);
  }
  .ins-card:hover .ins-img-wrap img {
    transform: scale(1.05);
    filter: brightness(0.72) saturate(0.55);
  }

  /* Gradient overlay on image */
  .ins-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 40%,
      rgba(10,10,10,0.85) 100%
    );
    pointer-events: none;
  }

  /* Index number */
  .ins-index {
    position: absolute;
    top: 20px;
    left: 20px;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 0.7rem;
    color: rgba(201,169,110,0.35);
    letter-spacing: 0.06em;
  }

  /* Instagram icon — appears on hover */
  .ins-instagram {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 34px;
    height: 34px;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(10,10,10,0.5);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    opacity: 0;
    transform: translateY(-6px);
    transition: opacity 0.3s ease, transform 0.3s ease, border-color 0.25s, color 0.25s;
  }
  .ins-card:hover .ins-instagram {
    opacity: 1;
    transform: translateY(0);
  }
  .ins-instagram:hover {
    border-color: rgba(201,169,110,0.5);
    color: #c9a96e;
  }

  /* Name on image bottom */
  .ins-img-name {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 24px;
    transform: translateY(4px);
    transition: transform 0.35s ease;
  }
  .ins-card:hover .ins-img-name { transform: translateY(0); }

  .ins-name {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 1.5rem;
    color: #f5f0e8;
    margin: 0 0 4px 0;
    line-height: 1.1;
  }

  .ins-role {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.58rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #c9a96e;
    margin: 0;
  }

  /* Info panel below image */
  .ins-info {
    padding: 24px;
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .ins-info-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.73rem;
    color: rgba(245,240,232,0.38);
    line-height: 1.5;
  }
  .ins-info-row:last-of-type { border-bottom: none; }

  .ins-info-icon {
    width: 22px;
    height: 22px;
    border: 1px solid rgba(201,169,110,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
    transition: border-color 0.25s;
  }
  .ins-card:hover .ins-info-icon { border-color: rgba(201,169,110,0.35); }

  /* Experience strip at bottom */
  .ins-exp-strip {
    margin-top: 12px;
    padding-top: 16px;
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ins-exp-num {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 1.5rem;
    color: #c9a96e;
    line-height: 1;
  }

  .ins-exp-label {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.55rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.25);
    margin-top: 3px;
  }

  .ins-exp-link {
    width: 30px;
    height: 30px;
    border: 1px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(245,240,232,0.25);
    text-decoration: none;
    transition: border-color 0.25s, color 0.25s;
  }
  .ins-exp-link:hover {
    border-color: rgba(201,169,110,0.4);
    color: #c9a96e;
  }
`;

const Instructors = () => {
  const { t } = useTranslation();

  const instructors = [
    {
      name: "Yasmine El Amrani",
      roleKey: "instructors.roles.founder",
      specialtyKey: "instructors.specialties.yasmine",
      experience: "12+",
      certifications: "BASI Pilates, PMA Certified",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop&crop=face",
      instagram: "#",
    },
    {
      name: "Sara Bennani",
      roleKey: "instructors.roles.senior",
      specialtyKey: "instructors.specialties.sara",
      experience: "8+",
      certifications: "Stott Pilates, ACE Certified",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop&crop=face",
      instagram: "#",
    },
    {
      name: "Nadia Ouazzani",
      roleKey: "instructors.roles.instructor",
      specialtyKey: "instructors.specialties.nadia",
      experience: "5+",
      certifications: "Balanced Body, AFAA",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=face",
      instagram: "#",
    },
  ];

  return (
    <>
      <style>{styles}</style>

      <section id="instructors" className="ins-root" style={{ padding: "120px 0" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

          {/* ── Header ── */}
          <AnimatedSection animation="fade-in-up">
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 32,
              marginBottom: 72,
              flexWrap: "wrap",
            }}>
              <div style={{ maxWidth: 500 }}>
                <div style={{ marginBottom: 24 }}>
                  <span className="ins-badge">{t("instructors.badge")}</span>
                </div>
                <h2 className="ins-title" style={{ marginBottom: 24 }}>{t("instructors.title")}</h2>
                <div style={{ width: 40, height: 1, background: "rgba(201,169,110,0.4)", marginBottom: 24 }} />
                <p className="ins-desc">{t("instructors.description")}</p>
              </div>

              {/* Team count */}
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "2.4rem",
                  color: "#c9a96e",
                  lineHeight: 1,
                }}>
                  {String(instructors.length).padStart(2, "0")}
                </div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 200,
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.28)",
                  marginTop: 6,
                }}>
                  Instructors
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Cards ── */}
          <div className="ins-grid">
            {instructors.map((instructor, index) => (
              <AnimatedSection key={index} animation="fade-in-up" delay={100 + index * 100}>
                <div className="ins-card">

                  {/* Photo */}
                  <div className="ins-img-wrap">
                    <img src={instructor.image} alt={instructor.name} />
                    <div className="ins-img-overlay" />

                    {/* Index */}
                    <span className="ins-index">0{index + 1}</span>

                    {/* Instagram */}
                    <a href={instructor.instagram} className="ins-instagram" aria-label="Instagram">
                      <Instagram size={13} strokeWidth={1.5} />
                    </a>

                    {/* Name overlay at bottom of image */}
                    <div className="ins-img-name">
                      <h3 className="ins-name">{instructor.name}</h3>
                      <p className="ins-role">{t(instructor.roleKey)}</p>
                    </div>
                  </div>

                  {/* Info rows */}
                  <div className="ins-info">
                    <div className="ins-info-row">
                      <span className="ins-info-icon">
                        <Heart size={10} color="#c9a96e" strokeWidth={1.5} />
                      </span>
                      {t(instructor.specialtyKey)}
                    </div>
                    <div className="ins-info-row">
                      <span className="ins-info-icon">
                        <Award size={10} color="#c9a96e" strokeWidth={1.5} />
                      </span>
                      {instructor.certifications}
                    </div>

                    {/* Experience strip */}
                    <div className="ins-exp-strip">
                      <div>
                        <div className="ins-exp-num">{instructor.experience}</div>
                        <div className="ins-exp-label">{t("instructors.experience")}</div>
                      </div>
                      <a href={instructor.instagram} className="ins-exp-link" aria-label="View profile">
                        <ArrowUpRight size={12} strokeWidth={1.5} />
                      </a>
                    </div>
                  </div>

                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Instructors;