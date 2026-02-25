import { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useTranslation } from "react-i18next";
import BookingModal from "./BookingModal";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  .prc-root {
    font-family: 'Jost', sans-serif;
    background: #0a0a0a;
    position: relative;
    overflow: hidden;
  }

  .prc-root::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -5%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(201,169,110,0.035) 0%, transparent 70%);
    pointer-events: none;
  }

  .prc-badge {
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
  .prc-badge::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: #c9a96e;
    flex-shrink: 0;
  }

  .prc-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(2.6rem, 5vw, 4.2rem);
    color: #f5f0e8;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .prc-title em { font-style: italic; color: #c9a96e; }

  .prc-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.85rem;
    line-height: 1.85;
    color: rgba(245,240,232,0.4);
    margin: 0;
    max-width: 480px;
  }

  /* Grid: 1px gap mosaic */
  .prc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(255,255,255,0.04);
  }
  @media (max-width: 1024px) { .prc-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px)  { .prc-grid { grid-template-columns: 1fr; } }

  .prc-card {
    background: #0a0a0a;
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid transparent;
    margin: -1px;
    transition: border-color 0.35s, background 0.35s;
  }
  .prc-card:hover { border-color: rgba(201,169,110,0.15); }
  .prc-card.featured {
    border-color: rgba(201,169,110,0.35) !important;
    background: rgba(201,169,110,0.025);
    z-index: 1;
  }

  .prc-popular-tag {
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.52rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #0f0f0f;
    background: #c9a96e;
    padding: 4px 14px;
    white-space: nowrap;
    border-radius: 0;
  }

  .prc-card-top {
    padding: 40px 32px 28px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .prc-plan-name {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c9a96e;
    margin: 0 0 12px 0;
  }

  .prc-price-wrap {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-bottom: 10px;
  }

  .prc-price {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 3.2rem;
    color: #f5f0e8;
    line-height: 1;
  }

  .prc-currency {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.75rem;
    color: rgba(245,240,232,0.35);
    letter-spacing: 0.08em;
  }

  .prc-plan-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.76rem;
    line-height: 1.7;
    color: rgba(245,240,232,0.35);
    margin: 0;
  }

  .prc-card-body {
    padding: 24px 32px 32px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .prc-feature {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 9px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.75rem;
    color: rgba(245,240,232,0.42);
    line-height: 1.5;
  }
  .prc-feature:last-of-type { border-bottom: none; }

  .prc-check {
    width: 14px;
    height: 14px;
    border: 1px solid rgba(201,169,110,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .prc-cta {
    margin-top: auto;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.05);
    margin-top: 24px;
  }

  .prc-btn-gold {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: #c9a96e;
    color: #0f0f0f;
    border: none;
    padding: 13px 16px;
    width: 100%;
    cursor: pointer;
    transition: background 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    border-radius: 0;
  }
  .prc-btn-gold:hover { background: #b8924f; }

  .prc-btn-ghost {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: transparent;
    color: rgba(245,240,232,0.38);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 12px 16px;
    width: 100%;
    cursor: pointer;
    transition: border-color 0.25s, color 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    border-radius: 0;
  }
  .prc-btn-ghost:hover {
    border-color: rgba(201,169,110,0.35);
    color: #c9a96e;
  }

  /* Bottom note */
  .prc-note {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    color: rgba(245,240,232,0.22);
    text-align: center;
    margin-top: 32px;
  }
`;

const Pricing = () => {
  const { t } = useTranslation();
  const [bookingOpen, setBookingOpen] = useState(false);

  const pricingPlans = [
    { nameKey: "pricing.plans.single.name",    price: "350",   descriptionKey: "pricing.plans.single.description",    featuresKey: "pricing.plans.single.features",    popular: false },
    { nameKey: "pricing.plans.pack5.name",     price: "1,500", descriptionKey: "pricing.plans.pack5.description",     featuresKey: "pricing.plans.pack5.features",     popular: true  },
    { nameKey: "pricing.plans.pack10.name",    price: "2,800", descriptionKey: "pricing.plans.pack10.description",    featuresKey: "pricing.plans.pack10.features",    popular: false },
    { nameKey: "pricing.plans.unlimited.name", price: "4,500", descriptionKey: "pricing.plans.unlimited.description", featuresKey: "pricing.plans.unlimited.features", popular: false },
  ];

  return (
    <>
      <style>{styles}</style>

      <section id="pricing" className="prc-root" style={{ padding: "120px 0" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

          {/* ── Header ── */}
          <AnimatedSection animation="fade-in-up">
            <div style={{ marginBottom: 72, maxWidth: 560 }}>
              <div style={{ marginBottom: 24 }}>
                <span className="prc-badge">{t("pricing.badge")}</span>
              </div>
              <h2 className="prc-title" style={{ marginBottom: 24 }}>{t("pricing.title")}</h2>
              <div style={{ width: 40, height: 1, background: "rgba(201,169,110,0.4)", marginBottom: 24 }} />
              <p className="prc-desc">{t("pricing.description")}</p>
            </div>
          </AnimatedSection>

          {/* ── Cards ── */}
          <div className="prc-grid">
            {pricingPlans.map((plan, index) => {
              const features = t(plan.featuresKey, { returnObjects: true }) as string[];
              return (
                <AnimatedSection key={index} animation="fade-in-up" delay={80 + index * 80}>
                  <div className={`prc-card${plan.popular ? " featured" : ""}`}>
                    {plan.popular && (
                      <span className="prc-popular-tag">{t("pricing.mostPopular")}</span>
                    )}

                    <div className="prc-card-top">
                      <p className="prc-plan-name">{t(plan.nameKey)}</p>
                      <div className="prc-price-wrap">
                        <span className="prc-price">{plan.price}</span>
                        <span className="prc-currency">{t("pricing.currency")}</span>
                      </div>
                      <p className="prc-plan-desc">{t(plan.descriptionKey)}</p>
                    </div>

                    <div className="prc-card-body">
                      <div style={{ flex: 1 }}>
                        {features.map((feature, idx) => (
                          <div key={idx} className="prc-feature">
                            <span className="prc-check">
                              <Check size={8} color="#c9a96e" strokeWidth={2.5} />
                            </span>
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="prc-cta">
                        {plan.popular ? (
                          <button className="prc-btn-gold" onClick={() => setBookingOpen(true)}>
                            {t("pricing.getStarted")} <ArrowUpRight size={11} />
                          </button>
                        ) : (
                          <button className="prc-btn-ghost" onClick={() => setBookingOpen(true)}>
                            {t("pricing.getStarted")} <ArrowUpRight size={11} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <p className="prc-note">{t("pricing.currency")} · {t("pricing.description")}</p>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
};

export default Pricing;