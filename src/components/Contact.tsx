import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useTranslation } from "react-i18next";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  .contact-root {
    font-family: 'Jost', sans-serif;
    background: #0e0d0b;
    position: relative;
    overflow: hidden;
  }

  .contact-root::before {
    content: '';
    position: absolute;
    bottom: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(201,169,110,0.035) 0%, transparent 70%);
    pointer-events: none;
  }

  .contact-badge {
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
  .contact-badge::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: #c9a96e;
  }

  .contact-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(2.6rem, 5vw, 4rem);
    color: #f5f0e8;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .contact-title em {
    font-style: italic;
    color: #c9a96e;
  }

  .contact-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.85rem;
    line-height: 1.85;
    color: rgba(245,240,232,0.4);
    margin: 0;
    max-width: 480px;
  }

  /* Info panel */
  .info-panel {
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.01);
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .info-panel-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 1.3rem;
    color: #f5f0e8;
    margin: 0 0 32px 0;
    letter-spacing: 0.01em;
  }

  .contact-row {
    display: flex;
    align-items: flex-start;
    gap: 18px;
    padding: 20px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.25s;
  }
  .contact-row:first-of-type { padding-top: 0; }
  .contact-row:last-of-type { border-bottom: none; padding-bottom: 0; }

  .contact-icon-wrap {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(201,169,110,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.3s;
  }
  .contact-row:hover .contact-icon-wrap {
    border-color: rgba(201,169,110,0.45);
  }

  .contact-row-label {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.58rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.3);
    margin-bottom: 5px;
  }

  .contact-row-value {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.82rem;
    color: rgba(245,240,232,0.7);
    line-height: 1.6;
    text-decoration: none;
    transition: color 0.25s;
  }
  a.contact-row-value:hover { color: #c9a96e; }

  /* CTA buttons */
  .cta-strip {
    margin-top: 32px;
    padding-top: 28px;
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .btn-whatsapp {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: #25D366;
    color: #0f0f0f;
    border: none;
    padding: 13px 20px;
    cursor: pointer;
    transition: background 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 0;
  }
  .btn-whatsapp:hover { background: #1fb557; }

  .btn-book {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: transparent;
    color: rgba(245,240,232,0.5);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 12px 20px;
    cursor: pointer;
    transition: border-color 0.25s, color 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 0;
  }
  .btn-book:hover {
    border-color: rgba(201,169,110,0.4);
    color: #c9a96e;
  }

  /* Map panel */
  .map-panel {
    border: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
    position: relative;
    min-height: 420px;
  }

  .map-panel::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(201,169,110,0.08);
    pointer-events: none;
    z-index: 1;
  }

  .map-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 16px 20px;
    background: linear-gradient(to top, rgba(10,10,10,0.9), transparent);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .map-label-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #c9a96e;
    flex-shrink: 0;
  }

  .map-label-text {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
  }
`;

const Contact = () => {
  const { t } = useTranslation();

  const contactItems = [
    {
      icon: MapPin,
      label: t("contact.address"),
      value: "36 Ave Al Haouz, Rabat 10000",
      href: "https://maps.google.com/?q=36+Ave+Al+Haouz+Rabat",
    },
    {
      icon: Phone,
      label: t("contact.phone"),
      value: "0666-653616",
      href: "tel:+212666653616",
    },
    {
      icon: Mail,
      label: t("contact.email"),
      value: "hello@formapilates.ma",
      href: "mailto:hello@formapilates.ma",
    },
    {
      icon: Clock,
      label: t("contact.hours"),
      value: `${t("contact.weekdays")}\n${t("contact.weekends")}`,
      href: undefined,
    },
  ];

  return (
    <>
      <style>{styles}</style>
      <section id="contact" className="contact-root" style={{ padding: "120px 0" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

          {/* ── Section header ── */}
          <AnimatedSection animation="fade-in-up">
            <div style={{ marginBottom: 72, maxWidth: 560 }}>
              <div style={{ marginBottom: 24 }}>
                <span className="contact-badge">{t("contact.badge")}</span>
              </div>
              <h2 className="contact-title" style={{ marginBottom: 24 }}>
                {t("contact.title")}
              </h2>
              <div style={{ width: 40, height: 1, background: "rgba(201,169,110,0.4)", marginBottom: 24 }} />
              <p className="contact-desc">{t("contact.description")}</p>
            </div>
          </AnimatedSection>

          {/* ── Two-column grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>

            {/* Info panel */}
            <AnimatedSection animation="fade-slide-right">
              <div className="info-panel">
                <h3 className="info-panel-title">{t("contact.info")}</h3>

                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="contact-row">
                    <div className="contact-icon-wrap">
                      <Icon size={14} color="#c9a96e" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="contact-row-label">{label}</div>
                      {href ? (
                        <a href={href} className="contact-row-value" target="_blank" rel="noopener noreferrer">
                          {value}
                        </a>
                      ) : (
                        <div className="contact-row-value" style={{ whiteSpace: "pre-line" }}>
                          {value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="cta-strip">
                  <button
                    className="btn-whatsapp"
                    onClick={() => window.open("https://wa.me/212666653616", "_blank")}
                  >
                    {t("contact.whatsapp")} <ArrowUpRight size={12} />
                  </button>
                  <button
                    className="btn-book"
                    onClick={() => window.open("https://wa.me/212666653616?text=Bonjour, je souhaite réserver une séance chez FORMA Pilates", "_blank")}
                  >
                    {t("contact.bookSession")} <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            </AnimatedSection>

            {/* Map panel */}
            <AnimatedSection animation="fade-slide-left" delay={150}>
              <div className="map-panel">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.8!2d-6.8498!3d33.9715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU4JzE3LjQiTiA2wrA1MCc1OS4zIlc!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma"
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: 420,
                    border: 0,
                    display: "block",
                    filter: "grayscale(1) brightness(0.6) contrast(1.1)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="FORMA Pilates Location"
                />
                <div className="map-label">
                  <div className="map-label-dot" />
                  <span className="map-label-text">36 Ave Al Haouz, Rabat</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;