import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Clock, Users, Zap, ArrowUpRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import BookingModal from "./BookingModal";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  .srv-root {
    font-family: 'Jost', sans-serif;
    background: #0a0a0a;
    position: relative;
    overflow: hidden;
  }

  .srv-root::before {
    content: '';
    position: absolute;
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 600px;
    background: radial-gradient(ellipse, rgba(201,169,110,0.035) 0%, transparent 65%);
    pointer-events: none;
  }

  .srv-badge {
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
  .srv-badge::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: #c9a96e;
  }

  .srv-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(2.6rem, 5vw, 4.2rem);
    color: #f5f0e8;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .srv-title em { font-style: italic; color: #c9a96e; }

  .srv-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.85rem;
    line-height: 1.85;
    color: rgba(245,240,232,0.4);
    margin: 0;
    max-width: 480px;
  }

  /* Card */
  .srv-card {
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.01);
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    transition: border-color 0.35s;
  }
  .srv-card:hover { border-color: rgba(201,169,110,0.2); }
  .srv-card.featured {
    border-color: rgba(201,169,110,0.3);
    background: rgba(201,169,110,0.025);
  }

  .srv-card-top {
    padding: 36px 32px 28px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    flex-shrink: 0;
  }

  .srv-card-body {
    padding: 28px 32px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .srv-popular-tag {
    position: absolute;
    top: 20px;
    right: 20px;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #0f0f0f;
    background: #c9a96e;
    padding: 4px 10px;
    border-radius: 0;
  }

  .srv-subtitle {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c9a96e;
    margin: 0 0 12px 0;
  }

  .srv-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 1.8rem;
    color: #f5f0e8;
    margin: 0 0 14px 0;
    line-height: 1.1;
  }
  .srv-card-title em { font-style: italic; color: #c9a96e; }

  .srv-card-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.78rem;
    line-height: 1.8;
    color: rgba(245,240,232,0.38);
    margin: 0;
  }

  /* Meta badges */
  .srv-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }

  .srv-meta-pill {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    color: rgba(245,240,232,0.4);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 5px 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* Feature list */
  .srv-feature {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 9px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.75rem;
    color: rgba(245,240,232,0.45);
    line-height: 1.5;
  }
  .srv-feature:last-of-type { border-bottom: none; }

  .srv-check {
    width: 14px;
    height: 14px;
    border: 1px solid rgba(201,169,110,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* CTA */
  .srv-cta {
    margin-top: 28px;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.05);
  }

  .srv-btn-primary {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: #c9a96e;
    color: #0f0f0f;
    border: none;
    padding: 14px 20px;
    width: 100%;
    cursor: pointer;
    transition: background 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 0;
  }
  .srv-btn-primary:hover { background: #b8924f; }

  .srv-btn-ghost {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: transparent;
    color: rgba(245,240,232,0.4);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 13px 20px;
    width: 100%;
    cursor: pointer;
    transition: border-color 0.25s, color 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 0;
  }
  .srv-btn-ghost:hover {
    border-color: rgba(201,169,110,0.4);
    color: #c9a96e;
  }

  /* Grid separator lines for visual mosaic feel */
  .srv-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1px;
    background: rgba(255,255,255,0.04);
  }
  .srv-grid > * {
    background: #0a0a0a;
  }
`;

const Services = () => {
  const { t } = useTranslation();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openBooking = (serviceKey: string) => {
    setSelectedService(serviceKey);
    setBookingOpen(true);
  };

  const services = [
    {
      key: "private",
      titleKey: "services.items.private.title",
      subtitleKey: "services.items.private.subtitle",
      descriptionKey: "services.items.private.description",
      featuresKey: "services.items.private.features",
      duration: t("services.duration"),
      capacity: t("services.capacity.one"),
      intensity: t("services.intensity.custom"),
      featured: true,
    },
    {
      key: "duo",
      titleKey: "services.items.duo.title",
      subtitleKey: "services.items.duo.subtitle",
      descriptionKey: "services.items.duo.description",
      featuresKey: "services.items.duo.features",
      duration: t("services.duration"),
      capacity: t("services.capacity.two"),
      intensity: t("services.intensity.moderate"),
      featured: false,
    },
    {
      key: "group",
      titleKey: "services.items.group.title",
      subtitleKey: "services.items.group.subtitle",
      descriptionKey: "services.items.group.description",
      featuresKey: "services.items.group.features",
      duration: t("services.duration"),
      capacity: t("services.capacity.group"),
      intensity: t("services.intensity.allLevels"),
      featured: false,
    },
  ];

  return (
    <>
      <style>{styles}</style>

      <section id="services" className="srv-root" style={{ padding: "120px 0" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

          {/* ── Header ── */}
          <AnimatedSection animation="fade-in-up">
            <div style={{ marginBottom: 72, maxWidth: 560 }}>
              <div style={{ marginBottom: 24 }}>
                <span className="srv-badge">{t("services.badge")}</span>
              </div>
              <h2 className="srv-title" style={{ marginBottom: 24 }}>{t("services.title")}</h2>
              <div style={{ width: 40, height: 1, background: "rgba(201,169,110,0.4)", marginBottom: 24 }} />
              <p className="srv-desc">{t("services.description")}</p>
            </div>
          </AnimatedSection>

          {/* ── Cards ── */}
          <div className="srv-grid">
            {services.map((service, index) => {
              const features = t(service.featuresKey, { returnObjects: true }) as string[];
              return (
                <AnimatedSection key={service.key} animation="fade-in-up" delay={100 + index * 100}>
                  <div className={`srv-card${service.featured ? " featured" : ""}`}>
                    {service.featured && (
                      <span className="srv-popular-tag">{t("services.mostPopular")}</span>
                    )}

                    {/* Top: title block */}
                    <div className="srv-card-top">
                      <p className="srv-subtitle">{t(service.subtitleKey)}</p>
                      <h3 className="srv-card-title">{t(service.titleKey)}</h3>
                      <p className="srv-card-desc">{t(service.descriptionKey)}</p>
                    </div>

                    {/* Body: meta + features + cta */}
                    <div className="srv-card-body">
                      {/* Meta pills */}
                      <div className="srv-meta">
                        {[
                          { icon: Clock, val: service.duration },
                          { icon: Users, val: service.capacity },
                          { icon: Zap,   val: service.intensity },
                        ].map(({ icon: Icon, val }) => (
                          <span key={val} className="srv-meta-pill">
                            <Icon size={10} color="rgba(201,169,110,0.6)" strokeWidth={1.5} />
                            {val}
                          </span>
                        ))}
                      </div>

                      {/* Features */}
                      <div style={{ flex: 1 }}>
                        {features.map((f, i) => (
                          <div key={i} className="srv-feature">
                            <span className="srv-check">
                              <Check size={8} color="#c9a96e" strokeWidth={2} />
                            </span>
                            {f}
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="srv-cta">
                        {service.featured ? (
                          <button className="srv-btn-primary" onClick={() => openBooking(service.key)}>
                            {t("services.bookNow")} <ArrowUpRight size={12} />
                          </button>
                        ) : (
                          <button className="srv-btn-ghost" onClick={() => openBooking(service.key)}>
                            {t("services.bookNow")} <ArrowUpRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        preselectedService={selectedService}
      />
    </>
  );
};

export default Services;