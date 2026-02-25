import { Instagram, Facebook, Mail, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  .footer-root {
    font-family: 'Jost', sans-serif;
    background: #080807;
    position: relative;
    overflow: hidden;
  }

  /* Faint top glow */
  .footer-root::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(201,169,110,0.25), transparent);
    pointer-events: none;
  }

  .footer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 1.5rem;
    color: #f5f0e8;
    letter-spacing: 0.03em;
    line-height: 1;
    margin: 0 0 16px 0;
  }
  .footer-logo em {
    font-style: italic;
    color: #c9a96e;
  }

  .footer-tagline {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.78rem;
    line-height: 1.8;
    color: rgba(245,240,232,0.32);
    margin: 0;
    max-width: 220px;
  }

  .footer-col-title {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.58rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #c9a96e;
    margin: 0 0 24px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .footer-col-title::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 1px;
    background: #c9a96e;
    flex-shrink: 0;
  }

  .footer-nav-btn {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.75rem;
    color: rgba(245,240,232,0.35);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    text-align: left;
    transition: color 0.25s;
    letter-spacing: 0.02em;
  }
  .footer-nav-btn:hover { color: #c9a96e; }

  .footer-contact-item {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.75rem;
    color: rgba(245,240,232,0.35);
    text-decoration: none;
    transition: color 0.25s;
    letter-spacing: 0.02em;
  }
  a.footer-contact-item:hover { color: #c9a96e; }

  .social-btn {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(245,240,232,0.4);
    text-decoration: none;
    transition: border-color 0.25s, color 0.25s, background 0.25s;
    flex-shrink: 0;
  }
  .social-btn:hover {
    border-color: rgba(201,169,110,0.5);
    color: #c9a96e;
    background: rgba(201,169,110,0.05);
  }

  .footer-divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 64px 0 32px;
  }

  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .footer-copyright {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: rgba(245,240,232,0.2);
  }

  .footer-back-top {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.25);
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.25s;
    padding: 0;
  }
  .footer-back-top:hover { color: #c9a96e; }
`;

const Footer = () => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { id: "about",       label: t("nav.about") },
    { id: "services",    label: t("nav.services") },
    { id: "schedule",    label: t("nav.schedule") },
    { id: "pricing",     label: t("nav.pricing") },
    { id: "faq",         label: t("nav.faq") },
    { id: "contact",     label: t("nav.contact") },
  ];

  const contactDetails = [
    { value: "36 Ave Al Haouz, Rabat 10000", href: "https://maps.google.com/?q=36+Ave+Al+Haouz+Rabat" },
    { value: "0666-653616",                   href: "tel:+212666653616" },
    { value: "hello@formapilates.ma",         href: "mailto:hello@formapilates.ma" },
  ];

  const socials = [
    { icon: Instagram, href: "#",                              label: "Instagram" },
    { icon: Facebook,  href: "#",                              label: "Facebook" },
    { icon: Mail,      href: "mailto:hello@formapilates.ma",   label: "Email" },
  ];

  return (
    <>
      <style>{styles}</style>
      <footer className="footer-root" style={{ padding: "80px 0 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

          {/* ── Main grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
          }}>

            {/* Brand */}
            <div>
              <h3 className="footer-logo">FORMA <em>Pilates</em></h3>
              <p className="footer-tagline">{t("footer.description")}</p>

              {/* Social icons */}
              <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
                {socials.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} className="social-btn" aria-label={label}>
                    <Icon size={14} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="footer-col-title">{t("footer.quickLinks")}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {navLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="footer-nav-btn"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="footer-col-title">{t("nav.contact")}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {contactDetails.map(({ value, href }) => (
                  <a key={value} href={href} className="footer-contact-item" target="_blank" rel="noopener noreferrer">
                    {value}
                  </a>
                ))}
              </div>
            </div>

            {/* Language + Follow */}
            <div>
              <h4 className="footer-col-title">{t("footer.followUs")}</h4>
              <div style={{ marginBottom: 32 }}>
                <LanguageSwitcher />
              </div>

              {/* Inline WhatsApp CTA */}
              <a
                href="https://wa.me/212666653616"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  borderBottom: "1px solid rgba(201,169,110,0.25)",
                  paddingBottom: 2,
                  transition: "color 0.25s, border-color 0.25s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "#b8924f";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.6)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "#c9a96e";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.25)";
                }}
              >
                WhatsApp us <ArrowUpRight size={10} />
              </a>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="footer-divider" />
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} FORMA Pilates · {t("footer.rights")}
            </p>
            <button
              className="footer-back-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to top <ArrowUpRight size={10} />
            </button>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;