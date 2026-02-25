import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { useTranslation } from "react-i18next";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  .faq-root {
    font-family: 'Jost', sans-serif;
    background: #0a0a0a;
    position: relative;
    overflow: hidden;
  }

  .faq-root::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(14,13,11,1) 0%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }

  .faq-badge {
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
  .faq-badge::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: #c9a96e;
    flex-shrink: 0;
  }

  .faq-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(2.6rem, 5vw, 4.2rem);
    color: #f5f0e8;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .faq-title em {
    font-style: italic;
    color: #c9a96e;
  }

  .faq-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.85rem;
    line-height: 1.85;
    color: rgba(245,240,232,0.4);
    margin: 0;
  }

  /* ── Accordion ── */
  .faq-item {
    border-bottom: 1px solid rgba(255,255,255,0.06);
    position: relative;
    transition: background 0.3s;
  }
  .faq-item:first-of-type {
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .faq-trigger {
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 26px 0;
    text-align: left;
  }

  .faq-index {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 0.75rem;
    color: rgba(201,169,110,0.3);
    flex-shrink: 0;
    width: 24px;
    letter-spacing: 0.05em;
  }

  .faq-question {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.9rem;
    color: rgba(245,240,232,0.65);
    flex: 1;
    line-height: 1.5;
    letter-spacing: 0.01em;
    transition: color 0.25s;
  }
  .faq-item.open .faq-question,
  .faq-trigger:hover .faq-question {
    color: #f5f0e8;
  }

  .faq-icon {
    width: 28px;
    height: 28px;
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: rgba(201,169,110,0.5);
    transition: border-color 0.3s, color 0.3s, background 0.3s;
  }
  .faq-item.open .faq-icon {
    border-color: rgba(201,169,110,0.4);
    color: #c9a96e;
    background: rgba(201,169,110,0.05);
  }
  .faq-trigger:hover .faq-icon {
    border-color: rgba(255,255,255,0.2);
    color: rgba(245,240,232,0.7);
  }

  .faq-answer-wrap {
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s ease;
    max-height: 0;
    opacity: 0;
  }
  .faq-item.open .faq-answer-wrap {
    max-height: 400px;
    opacity: 1;
  }

  .faq-answer {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.82rem;
    line-height: 1.9;
    color: rgba(245,240,232,0.38);
    padding: 0 0 28px 40px;
    margin: 0;
  }

  /* ── Bottom CTA ── */
  .faq-cta {
    margin-top: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    padding: 40px 48px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.01);
    flex-wrap: wrap;
  }

  .faq-cta-label {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c9a96e;
    margin-bottom: 10px;
  }

  .faq-cta-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 1.7rem;
    color: #f5f0e8;
    line-height: 1.1;
    margin: 0 0 8px 0;
  }

  .faq-cta-sub {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.78rem;
    color: rgba(245,240,232,0.35);
    margin: 0;
  }

  .faq-cta-btn {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: #c9a96e;
    color: #0f0f0f;
    border: none;
    padding: 14px 28px;
    cursor: pointer;
    transition: background 0.25s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    flex-shrink: 0;
    border-radius: 0;
    white-space: nowrap;
  }
  .faq-cta-btn:hover { background: #b8924f; }
`;

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqKeys = ["experience", "wear", "frequency", "matVsReformer", "injuries", "cancellation", "packages", "parking"];

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>
      <section id="faq" className="faq-root" style={{ padding: "120px 0" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "0 40px" }}>

          {/* ── Header ── */}
          <AnimatedSection animation="fade-in-up">
            <div style={{ marginBottom: 72 }}>
              <div style={{ marginBottom: 24 }}>
                <span className="faq-badge">{t("faq.badge")}</span>
              </div>
              <h2 className="faq-title" style={{ marginBottom: 24 }}>
                {t("faq.title")}
              </h2>
              <div style={{ width: 40, height: 1, background: "rgba(201,169,110,0.4)", marginBottom: 24 }} />
              <p className="faq-desc">{t("faq.description")}</p>
            </div>
          </AnimatedSection>

          {/* ── Accordion ── */}
          <AnimatedSection animation="fade-in-up" delay={150}>
            <div>
              {faqKeys.map((key, index) => (
                <div
                  key={key}
                  className={`faq-item${openIndex === index ? " open" : ""}`}
                >
                  <button
                    className="faq-trigger"
                    onClick={() => toggle(index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className="faq-index">0{index + 1}</span>
                    <span className="faq-question">{t(`faq.items.${key}.q`)}</span>
                    <span className="faq-icon">
                      {openIndex === index
                        ? <Minus size={12} strokeWidth={1.5} />
                        : <Plus size={12} strokeWidth={1.5} />
                      }
                    </span>
                  </button>
                  <div className="faq-answer-wrap" aria-hidden={openIndex !== index}>
                    <p className="faq-answer">{t(`faq.items.${key}.a`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* ── CTA strip ── */}
          <AnimatedSection animation="fade-in-up" delay={300}>
            <div className="faq-cta">
              <div>
                <div className="faq-cta-label">Still curious?</div>
                <h3 className="faq-cta-title">{t("faq.stillQuestions")}</h3>
                <p className="faq-cta-sub">{t("faq.teamHelp")}</p>
              </div>
              <button className="faq-cta-btn" onClick={scrollToContact}>
                {t("faq.contactUs")} <ArrowUpRight size={12} />
              </button>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </>
  );
};

export default FAQ;