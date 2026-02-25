import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  @keyframes nfFadeIn   { from { opacity: 0; } to { opacity: 1; } }
  @keyframes nfSlideUp  { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes nfLineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes nfNumReveal {
    from { opacity: 0; transform: translateY(40px) skewY(2deg); }
    to   { opacity: 1; transform: translateY(0)  skewY(0deg); }
  }
  @keyframes grainShift {
    0%   { transform: translate(0,0); }
    25%  { transform: translate(-2px, 2px); }
    50%  { transform: translate(2px,-2px); }
    75%  { transform: translate(-1px, 1px); }
    100% { transform: translate(0,0); }
  }
  @keyframes nfPulse {
    0%, 100% { opacity: 0.3; }
    50%       { opacity: 0.7; }
  }

  .nf-root {
    min-height: 100svh;
    background: #080807;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* Grain */
  .nf-grain {
    position: absolute;
    inset: -50%;
    width: 200%;
    height: 200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
    background-size: 160px;
    pointer-events: none;
    animation: grainShift 0.6s steps(1) infinite;
    opacity: 0.45;
  }

  /* Corner brackets */
  .nf-corner {
    position: absolute;
    width: 36px;
    height: 36px;
    animation: nfFadeIn 1s 0.4s ease forwards;
    opacity: 0;
  }
  .nf-corner.tl { top: 36px; left: 36px; border-top: 1px solid rgba(201,169,110,0.25); border-left: 1px solid rgba(201,169,110,0.25); }
  .nf-corner.tr { top: 36px; right: 36px; border-top: 1px solid rgba(201,169,110,0.25); border-right: 1px solid rgba(201,169,110,0.25); }
  .nf-corner.bl { bottom: 36px; left: 36px; border-bottom: 1px solid rgba(201,169,110,0.25); border-left: 1px solid rgba(201,169,110,0.25); }
  .nf-corner.br { bottom: 36px; right: 36px; border-bottom: 1px solid rgba(201,169,110,0.25); border-right: 1px solid rgba(201,169,110,0.25); }

  /* Content */
  .nf-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 40px;
  }

  /* Big 404 number */
  .nf-number {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(7rem, 20vw, 14rem);
    color: rgba(245,240,232,0.04);
    line-height: 1;
    letter-spacing: -0.02em;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    animation: nfNumReveal 1s 0.1s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
    opacity: 0;
  }

  /* Pre-line */
  .nf-preline {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.4));
    margin-bottom: 28px;
    transform-origin: top;
    animation: nfLineGrow 0.8s 0.3s cubic-bezier(0.77,0,0.18,1) forwards;
    transform: scaleY(0);
    opacity: 0;
  }

  .nf-badge {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.6rem;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: #c9a96e;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
    animation: nfFadeIn 0.8s 0.7s ease forwards;
    opacity: 0;
  }
  .nf-badge::before, .nf-badge::after {
    content: '';
    display: inline-block;
    width: 20px;
    height: 1px;
    background: rgba(201,169,110,0.5);
  }

  .nf-headline {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(2rem, 5vw, 3.2rem);
    color: #f5f0e8;
    line-height: 1.08;
    letter-spacing: -0.01em;
    margin: 0 0 20px 0;
    animation: nfSlideUp 0.9s 0.9s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
    opacity: 0;
  }
  .nf-headline em {
    font-style: italic;
    color: #c9a96e;
  }

  .nf-divider {
    width: 40px;
    height: 1px;
    background: rgba(201,169,110,0.35);
    margin: 0 auto 24px;
    transform-origin: center;
    animation: nfLineGrow 0.8s 1.1s cubic-bezier(0.77,0,0.18,1) forwards;
    transform: scaleX(0);
    opacity: 0;
  }

  .nf-message {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.82rem;
    line-height: 1.85;
    color: rgba(245,240,232,0.38);
    max-width: 360px;
    margin: 0 0 48px 0;
    animation: nfSlideUp 0.9s 1.2s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
    opacity: 0;
  }

  .nf-cta {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: #c9a96e;
    color: #0f0f0f;
    border: none;
    padding: 14px 32px;
    cursor: pointer;
    transition: background 0.25s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    border-radius: 0;
    animation: nfSlideUp 0.9s 1.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
    opacity: 0;
  }
  .nf-cta:hover { background: #b8924f; }

  /* Bottom location stamp */
  .nf-location {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.55rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.13);
    white-space: nowrap;
    animation: nfFadeIn 0.8s 1.5s ease forwards;
    opacity: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .nf-location::before, .nf-location::after {
    content: '';
    display: inline-block;
    width: 20px;
    height: 1px;
    background: rgba(245,240,232,0.08);
  }

  /* Path display */
  .nf-path {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    color: rgba(245,240,232,0.18);
    border: 1px solid rgba(255,255,255,0.06);
    padding: 7px 14px;
    margin-bottom: 32px;
    animation: nfFadeIn 0.8s 1.3s ease forwards;
    opacity: 0;
    font-style: italic;
  }
`;

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Non Trouvée | FORMA Pilates Rabat</title>
        <meta name="description" content="La page que vous recherchez n'existe pas. Retournez à l'accueil de FORMA Pilates pour découvrir nos cours de Pilates Reformer à Rabat." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <style>{styles}</style>

      <div className="nf-root">
        <div className="nf-grain" />

        {/* Corner brackets */}
        <div className="nf-corner tl" />
        <div className="nf-corner tr" />
        <div className="nf-corner bl" />
        <div className="nf-corner br" />

        {/* Ghost 404 behind content */}
        <span className="nf-number" aria-hidden="true">404</span>

        <div className="nf-content">
          <div className="nf-preline" />

          <span className="nf-badge">Erreur 404</span>

          <h1 className="nf-headline">
            Page <em>introuvable</em>
          </h1>

          <div className="nf-divider" />

          <p className="nf-message">
            La page que vous recherchez n'existe pas ou a été déplacée.
            Retournez à l'accueil pour explorer nos cours de Pilates.
          </p>

          {/* Show the bad path */}
          <div className="nf-path">{location.pathname}</div>

          <a href="/" className="nf-cta">
            Retour à l'accueil <ArrowUpRight size={12} />
          </a>
        </div>

        <div className="nf-location">FORMA Pilates · Rabat, Morocco</div>
      </div>
    </>
  );
};

export default NotFound;