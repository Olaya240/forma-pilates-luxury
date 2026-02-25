import AnimatedSection from "./AnimatedSection";
import { Activity, Brain, Heart, Shield, Sparkles, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  .benefits-root {
    font-family: 'Jost', sans-serif;
    background: #0a0a0a;
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
    background: radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%);
    pointer-events: none;
  }

  .benefits-badge {
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
    font-size: clamp(2.4rem, 4.5vw, 3.8rem);
    color: #f5f0e8;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .benefits-title em {
    font-style: italic;
    color: #c9a96e;
  }

  .benefits-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.88rem;
    line-height: 1.85;
    color: rgba(245,240,232,0.45);
    margin: 0;
  }

  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 2.8rem;
    color: #c9a96e;
    line-height: 1;
  }
  .stat-label {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.58rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.3);
    margin-top: 6px;
  }

  .benefit-card {
    position: relative;
    padding: 28px 24px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.01);
    transition: border-color 0.35s, background 0.35s;
    cursor: default;
  }
  .benefit-card:hover {
    border-color: rgba(201,169,110,0.25);
    background: rgba(201,169,110,0.03);
  }

  .benefit-icon-wrap {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(201,169,110,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    transition: border-color 0.3s, background 0.3s;
  }
  .benefit-card:hover .benefit-icon-wrap {
    border-color: rgba(201,169,110,0.5);
    background: rgba(201,169,110,0.06);
  }

  .benefit-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: 1.1rem;
    color: #f5f0e8;
    margin: 0 0 10px 0;
    letter-spacing: 0.01em;
  }

  .benefit-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.78rem;
    line-height: 1.8;
    color: rgba(245,240,232,0.38);
    margin: 0;
  }

  .card-num {
    position: absolute;
    top: 20px;
    right: 20px;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 0.7rem;
    color: rgba(201,169,110,0.2);
    letter-spacing: 0.05em;
  }

  .stats-strip {
    display: flex;
    border: 1px solid rgba(255,255,255,0.06);
    margin-top: 52px;
  }
  .stat-cell {
    flex: 1;
    padding: 24px 20px;
    text-align: left;
    transition: background 0.25s;
  }
  .stat-cell:hover { background: rgba(201,169,110,0.04); }
  .stat-divider { width: 1px; background: rgba(255,255,255,0.06); }
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
      <section className="benefits-root" style={{ padding: "120px 0" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 80, alignItems: "start" }}>

            {/* ── Left ── */}
            <AnimatedSection animation="fade-slide-right">
              <div style={{ maxWidth: 460 }}>
                <div style={{ marginBottom: 28 }}>
                  <span className="benefits-badge">{t("benefits.badge")}</span>
                </div>

                <h2 className="benefits-title" style={{ marginBottom: 28 }}>
                  {t("benefits.title")}
                </h2>

                <div style={{ width: 40, height: 1, background: "rgba(201,169,110,0.4)", marginBottom: 28 }} />

                <p className="benefits-desc">{t("benefits.description")}</p>

                {/* Stats */}
                <div className="stats-strip">
                  {stats.map((s, i) => (
                    <>
                      <div key={s.num} className="stat-cell">
                        <div className="stat-num">{s.num}</div>
                        <div className="stat-label">{s.label}</div>
                      </div>
                      {i < stats.length - 1 && <div key={`d${i}`} className="stat-divider" />}
                    </>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* ── Right: Benefits grid ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.04)" }}>
              {benefits.map((benefit, index) => (
                <AnimatedSection key={index} animation="fade-in-up" delay={100 + index * 70}>
                  <div className="benefit-card" style={{ background: "#0a0a0a" }}>
                    <span className="card-num">0{index + 1}</span>
                    <div className="benefit-icon-wrap">
                      <benefit.icon size={16} color="#c9a96e" strokeWidth={1.5} />
                    </div>
                    <h3 className="benefit-title">{t(benefit.titleKey)}</h3>
                    <p className="benefit-desc">{t(benefit.descriptionKey)}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Benefits;