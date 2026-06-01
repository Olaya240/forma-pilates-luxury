import AnimatedSection from "./AnimatedSection";
import { Activity, Brain, Heart, Shield, Sparkles, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  .benefits-root {
    font-family: 'Jost', sans-serif;
    background: 
      radial-gradient(ellipse 900px 420px at 45% -10%, rgba(201,169,110,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 700px 420px at 85% 110%, rgba(201,169,110,0.08) 0%, transparent 65%),
      #090909;
    position: relative;
    overflow: hidden;
  }

  .benefits-root::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .benefits-root::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -15%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  .benefits-badge {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.58rem;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: #c9a96e;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 6px 14px;
    border: 1px solid rgba(201,169,110,0.25);
    border-radius: 999px;
    background: rgba(201,169,110,0.05);
  }
  .benefits-badge::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: #c9a96e;
    flex-shrink: 0;
  }

  .benefits-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(2.8rem, 5.5vw, 4.2rem);
    color: #f5f0e8;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0;
    text-shadow: 0 18px 40px rgba(0,0,0,0.45);
  }
  .benefits-title em {
    font-style: italic;
    color: #c9a96e;
  }

  .benefits-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.92rem;
    line-height: 1.95;
    color: rgba(245,240,232,0.52);
    margin: 0;
  }

  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 3.1rem;
    color: #c9a96e;
    line-height: 1;
    letter-spacing: -0.01em;
  }
  .stat-label {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.38);
    margin-top: 8px;
  }

  .benefit-card {
    position: relative;
    min-height: 260px;
    padding: 38px 34px 36px;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    background:
      linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%),
      #0a0a0a;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02);
    transition: border-color 0.4s ease, background 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
    cursor: default;
    overflow: hidden;
  }
  
  .benefit-card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(201,169,110,0.18), transparent 40%, transparent 70%, rgba(201,169,110,0.12));
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .benefit-card::after {
    content: '';
    position: absolute;
    left: 0;
    top: 34px;
    bottom: 34px;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.45), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .benefit-card:hover {
    border-color: rgba(201,169,110,0.28);
    background:
      radial-gradient(circle at 85% 15%, rgba(201,169,110,0.14), transparent 45%),
      linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.015) 55%),
      #0b0a09;
    transform: translateY(-10px);
    box-shadow: 0 34px 90px rgba(201,169,110,0.14), 0 10px 28px rgba(0,0,0,0.4);
  }
  
  .benefit-card:hover::before,
  .benefit-card:hover::after {
    opacity: 1;
  }

  .benefit-icon-wrap {
    width: 54px;
    height: 54px;
    border: 1px solid rgba(201,169,110,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
    transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
    background: rgba(201,169,110,0.03);
    border-radius: 14px;
  }
  
  .benefit-card:hover .benefit-icon-wrap {
    border-color: rgba(201,169,110,0.48);
    background: rgba(201,169,110,0.12);
    box-shadow: 0 0 34px rgba(201,169,110,0.1), inset 0 0 24px rgba(201,169,110,0.08);
    transform: scale(1.08);
  }

  .benefit-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: 1.44rem;
    color: #f5f0e8;
    margin: 0 0 14px 0;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }

  .benefit-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.85rem;
    line-height: 1.95;
    color: rgba(245,240,232,0.6);
    margin: 0;
  }

  .card-num {
    position: absolute;
    top: 28px;
    right: 32px;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 0.8rem;
    color: rgba(201,169,110,0.25);
    letter-spacing: 0.08em;
    opacity: 0.7;
  }

  .stats-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 18px;
    overflow: hidden;
    margin-top: 56px;
    background: linear-gradient(135deg, rgba(255,255,255,0.025), rgba(255,255,255,0.006));
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03);
  }
  
  .stat-cell {
    padding: 30px 22px;
    text-align: center;
    transition: background 0.3s ease, border-color 0.3s ease;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 120px;
  }
  
  .stat-cell:hover { 
    background: rgba(201,169,110,0.07);
  }
  
  .stat-divider { 
    width: 1px; 
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent);
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 26px 24px;
    background: transparent;
  }

  .benefits-grid > div:nth-child(odd) .benefit-card {
    margin-top: 14px;
  }

  .benefits-layout {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 96px;
    align-items: start;
  }

  .benefits-grid-wrap {
    position: relative;
    padding-left: 36px;
  }

  .benefits-grid-wrap::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);
    opacity: 0.6;
  }

  @media (max-width: 900px) {
    .benefits-layout {
      grid-template-columns: 1fr;
      gap: 70px;
    }
    .benefits-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .benefits-grid-wrap {
      padding-left: 0;
    }
    .benefits-grid-wrap::before {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .benefits-root { padding: 80px 0 !important; }
    .benefits-root > div { padding: 0 20px !important; }
    .stats-strip { 
      grid-template-columns: 1fr;
    }
    .stat-divider { 
      width: 100%; 
      height: 1px; 
    }
    .benefit-card {
      min-height: auto;
      padding: 32px 24px;
    }
    .benefits-grid {
      grid-template-columns: 1fr;
    }
    .benefits-grid > div:nth-child(odd) .benefit-card {
      margin-top: 0;
    }
  }
`;

const Benefits = () => {
  const { t } = useTranslation();

  const benefits = [
    { icon: Activity, titleKey: "benefits.items.coreStrength.title",      descriptionKey: "benefits.items.coreStrength.description" },
    { icon: Shield,   titleKey: "benefits.items.betterPosture.title",     descriptionKey: "benefits.items.betterPosture.description" },
    { icon: Heart,    titleKey: "benefits.items.flexibility.title",       descriptionKey: "benefits.items.flexibility.description" },
    { icon: Brain,    titleKey: "benefits.items.mindBody.title",          descriptionKey: "benefits.items.mindBody.description" },
    { icon: Sparkles, titleKey: "benefits.items.injuryPrevention.title",  descriptionKey: "benefits.items.injuryPrevention.description" },
    { icon: Users,    titleKey: "benefits.items.allLevels.title",         descriptionKey: "benefits.items.allLevels.description" },
  ];

  const stats = [
    { num: "500+", label: t("benefits.happyMembers") },
    { num: "15+",  label: t("benefits.yearsCombined") },
    { num: "98%",  label: t("benefits.satisfaction") },
  ];

  return (
    <>
      <style>{styles}</style>
      <section className="benefits-root" style={{ padding: "150px 0" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div className="benefits-layout">

            {/* ── Left Side: Title + Description + Stats ── */}
            <AnimatedSection animation="fade-slide-right">
              <div style={{ maxWidth: 520 }}>
                <div style={{ marginBottom: 32 }}>
                  <span className="benefits-badge">{t("benefits.badge")}</span>
                </div>

                <h2 className="benefits-title" style={{ marginBottom: 36 }}>
                  {t("benefits.title")}
                </h2>

                <div style={{ width: 56, height: 2, background: "linear-gradient(90deg, #c9a96e 0%, rgba(201,169,110,0.2) 100%)", marginBottom: 36 }} />

                <p className="benefits-desc">{t("benefits.description")}</p>

                {/* Stats */}
                <div className="stats-strip">
                  {stats.map((s, i) => (
                    <div key={s.num} style={{ display: "contents" }}>
                      <div className="stat-cell">
                        <div className="stat-num">{s.num}</div>
                        <div className="stat-label">{s.label}</div>
                      </div>
                      {i < stats.length - 1 && <div key={`d${i}`} className="stat-divider" />}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* ── Right Side: Benefits Grid (2 columns) ── */}
            <div className="benefits-grid-wrap">
              <div className="benefits-grid">
                {benefits.map((benefit, index) => (
                  <AnimatedSection key={index} animation="fade-in-up" delay={80 + index * 60}>
                    <div className="benefit-card">
                      <span className="card-num">0{index + 1}</span>
                      <div className="benefit-icon-wrap">
                        <benefit.icon size={20} color="#c9a96e" strokeWidth={1.3} />
                      </div>
                      <h3 className="benefit-title">{t(benefit.titleKey)}</h3>
                      <p className="benefit-desc">{t(benefit.descriptionKey)}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Benefits;
