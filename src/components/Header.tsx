import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import BookingModal from "./BookingModal";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  .header-root {
    font-family: 'Jost', sans-serif;
  }

  .header-logo {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 1.35rem;
    color: #f5f0e8;
    letter-spacing: 0.04em;
    line-height: 1;
    cursor: pointer;
    user-select: none;
  }

  .header-logo em {
    font-style: italic;
    color: #c9a96e;
    font-weight: 300;
  }

  .nav-link {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 0;
    position: relative;
    transition: color 0.25s;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: #c9a96e;
    transition: width 0.3s cubic-bezier(.77,0,.18,1);
  }

  .nav-link:hover {
    color: rgba(255,255,255,0.9);
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .header-book-btn {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: #c9a96e;
    color: #0f0f0f;
    border: none;
    padding: 0.55rem 1.4rem;
    border-radius: 0;
    cursor: pointer;
    transition: background 0.25s;
    white-space: nowrap;
  }

  .header-book-btn:hover {
    background: #b8924f;
  }

  .mobile-menu-btn {
    background: none;
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    cursor: pointer;
    transition: border-color 0.25s, color 0.25s;
    border-radius: 0;
  }

  .mobile-menu-btn:hover {
    border-color: rgba(255,255,255,0.4);
    color: rgba(255,255,255,0.9);
  }

  @keyframes mobileSlideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .mobile-nav {
    animation: mobileSlideDown 0.25s ease forwards;
  }

  .mobile-nav-link {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: color 0.2s;
    width: 100%;
  }

  .mobile-nav-link:hover {
    color: rgba(255,255,255,0.9);
  }

  .header-divider {
    width: 1px;
    height: 16px;
    background: rgba(255,255,255,0.12);
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "about",       label: t("nav.about") },
    { id: "services",    label: t("nav.services") },
    { id: "instructors", label: t("nav.team") },
    { id: "schedule",    label: t("nav.schedule") },
    { id: "pricing",     label: t("nav.pricing") },
    { id: "faq",         label: t("nav.faq") },
    { id: "contact",     label: t("nav.contact") },
  ];

  const scrolledBg = "rgba(10,10,10,0.82)";
  const transparentBg = "transparent";

  return (
    <>
      <style>{styles}</style>

      <header
        className="header-root"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, padding 0.3s ease",
          background: isScrolled ? scrolledBg : transparentBg,
          backdropFilter: isScrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(16px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          padding: isScrolled ? "18px 0" : "28px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          {/* Logo */}
          <div
            className="header-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            FORMA <em>Pilates</em>
          </div>

          {/* Desktop Nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
            }}
            className="hidden-mobile"
          >
            {/* Hide on mobile via inline media — handled below */}
            {navItems.map((item, i) => (
              <button
                key={item.id}
                className="nav-link"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}

            <div className="header-divider" />

            <button
              className="header-book-btn"
              onClick={() => setBookingOpen(true)}
            >
              {t("nav.bookNow")}
            </button>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="mobile-menu-btn show-mobile"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>

        {/* Mobile Nav panel */}
        {isMobileMenuOpen && (
          <div
            className="mobile-nav show-mobile"
            style={{
              padding: "8px 40px 24px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              marginTop: 12,
              background: "rgba(10,10,10,0.95)",
              backdropFilter: "blur(20px)",
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                className="mobile-nav-link"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              className="header-book-btn"
              style={{ marginTop: 20, width: "100%", padding: "0.75rem" }}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setBookingOpen(true);
              }}
            >
              {t("nav.bookNow")}
            </button>
          </div>
        )}
      </header>

      {/* Responsive visibility helpers — injected once */}
      <style>{`
        @media (min-width: 1024px) {
          .show-mobile { display: none !important; }
        }
        @media (max-width: 1023px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
};

export default Header;