import { useState } from "react";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import AnimatedSection from "./AnimatedSection";
import { useTranslation } from "react-i18next";
import { X, ArrowUpRight } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  .gal-root {
    font-family: 'Jost', sans-serif;
    background: #0a0a0a;
    position: relative;
    overflow: hidden;
  }

  .gal-badge {
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
  .gal-badge::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: #c9a96e;
    flex-shrink: 0;
  }

  .gal-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(2.6rem, 5vw, 4rem);
    color: #f5f0e8;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .gal-title em { font-style: italic; color: #c9a96e; }

  .gal-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.85rem;
    line-height: 1.85;
    color: rgba(245,240,232,0.4);
    margin: 0;
    max-width: 420px;
  }

  /* ── Mosaic grid ── */
  .gal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 2px;
    background: rgba(255,255,255,0.03);
  }
  @media (max-width: 768px) {
    .gal-grid { grid-template-columns: repeat(2, 1fr); }
    .gal-item.tall { grid-row: span 1; }
  }
  @media (max-width: 480px) {
    .gal-grid { grid-template-columns: 1fr; }
  }

  .gal-item {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: #111;
  }
  .gal-item.tall { grid-row: span 2; }

  .gal-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
    filter: brightness(0.88) saturate(0.75);
    min-height: 220px;
  }
  .gal-item:hover img {
    transform: scale(1.06);
    filter: brightness(0.7) saturate(0.6);
  }

  /* Hover overlay */
  .gal-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.1) 60%, transparent 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 24px;
    pointer-events: none;
  }
  .gal-item:hover .gal-overlay { opacity: 1; }

  .gal-img-label {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.7);
    transform: translateY(8px);
    transition: transform 0.4s ease;
  }
  .gal-item:hover .gal-img-label { transform: translateY(0); }

  .gal-expand-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border: 1px solid rgba(255,255,255,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.35s ease;
    background: rgba(10,10,10,0.4);
    backdrop-filter: blur(4px);
  }
  .gal-item:hover .gal-expand-icon { opacity: 1; }

  /* ── Load more ── */
  .gal-load-btn {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: transparent;
    color: rgba(245,240,232,0.4);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 14px 32px;
    cursor: pointer;
    transition: border-color 0.25s, color 0.25s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-radius: 0;
  }
  .gal-load-btn:hover {
    border-color: rgba(201,169,110,0.4);
    color: #c9a96e;
  }

  /* ── Lightbox ── */
  @keyframes lbFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes lbScaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
  }

  .lb-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(5,5,5,0.92);
    backdrop-filter: blur(16px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: lbFadeIn 0.3s ease;
    padding: 40px;
  }

  .lb-img-wrap {
    position: relative;
    max-width: min(90vw, 900px);
    max-height: 85vh;
    animation: lbScaleIn 0.35s ease;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .lb-img-wrap img {
    display: block;
    max-width: 100%;
    max-height: 85vh;
    object-fit: contain;
    filter: brightness(0.95);
  }

  .lb-close {
    position: fixed;
    top: 24px;
    right: 24px;
    width: 44px;
    height: 44px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(10,10,10,0.7);
    backdrop-filter: blur(8px);
    color: rgba(255,255,255,0.6);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.25s, color 0.25s;
    border-radius: 0;
    z-index: 1001;
  }
  .lb-close:hover {
    border-color: rgba(255,255,255,0.4);
    color: #fff;
  }

  .lb-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 14px 20px;
    background: linear-gradient(to top, rgba(5,5,5,0.85), transparent);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .lb-caption-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #c9a96e;
    flex-shrink: 0;
  }

  .lb-caption-text {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
  }
`;

const Gallery = () => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const images = [
    { src: gallery1, alt: "FORMA Pilates Équipement", tall: true },
    { src: gallery2, alt: "Studio FORMA Pilates",     tall: false },
    { src: gallery3, alt: "Décoration du Studio",     tall: false },
    { src: gallery4, alt: "Espace Lumineux",          tall: false },
    { src: gallery5, alt: "Reformers FORMA",          tall: true },
    { src: gallery6, alt: "Salle d'Entraînement",     tall: false },
    { src: gallery7, alt: "Coach Certifiée",          tall: false },
    { src: gallery8, alt: "Nouvelle Expérience",      tall: true },
  ];

  const visible = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <>
      <style>{styles}</style>

      <section id="gallery" className="gal-root" style={{ padding: "120px 0" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

          {/* ── Header ── */}
          <AnimatedSection animation="fade-in-up">
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 32,
              marginBottom: 64,
              flexWrap: "wrap",
            }}>
              <div style={{ maxWidth: 500 }}>
                <div style={{ marginBottom: 24 }}>
                  <span className="gal-badge">{t("gallery.badge")}</span>
                </div>
                <h2 className="gal-title" style={{ marginBottom: 24 }}>{t("gallery.title")}</h2>
                <div style={{ width: 40, height: 1, background: "rgba(201,169,110,0.4)", marginBottom: 24 }} />
                <p className="gal-desc">{t("gallery.description")}</p>
              </div>

              {/* Image count indicator */}
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "2.2rem",
                  color: "#c9a96e",
                  lineHeight: 1,
                }}>
                  {String(images.length).padStart(2, "0")}
                </div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 200,
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.3)",
                  marginTop: 6,
                }}>
                  Images
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Mosaic grid ── */}
          <div className="gal-grid">
            {visible.map((image, index) => (
              <AnimatedSection
                key={index}
                animation="fade-in"
                delay={index * 60}
                className={`gal-item${image.tall ? " tall" : ""}`}
              >
                <img src={image.src} alt={image.alt} />

                <div className="gal-overlay">
                  <p className="gal-img-label">{image.alt}</p>
                </div>

                <div className="gal-expand-icon" onClick={() => setLightbox(image)}>
                  <ArrowUpRight size={13} color="rgba(255,255,255,0.7)" />
                </div>

                {/* Click whole card to open lightbox */}
                <div
                  style={{ position: "absolute", inset: 0, cursor: "pointer" }}
                  onClick={() => setLightbox(image)}
                />
              </AnimatedSection>
            ))}
          </div>

          {/* ── Load more ── */}
          {hasMore && (
            <AnimatedSection animation="fade-in-up" style={{ textAlign: "center", marginTop: 40 }}>
              <button
                className="gal-load-btn"
                onClick={() => setVisibleCount((p) => Math.min(p + 3, images.length))}
              >
                {t("gallery.loadMore")}
                <ArrowUpRight size={11} />
              </button>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="lb-backdrop" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={() => setLightbox(null)} aria-label="Close">
            <X size={15} />
          </button>

          <div className="lb-img-wrap" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} />
            <div className="lb-caption">
              <div className="lb-caption-dot" />
              <span className="lb-caption-text">{lightbox.alt}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;