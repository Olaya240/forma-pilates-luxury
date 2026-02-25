import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  @keyframes loaderFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes loaderLineGrow {
    from { transform: scaleX(0); opacity: 0; }
    to   { transform: scaleX(1); opacity: 1; }
  }
  @keyframes loaderWordReveal {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes loaderSubReveal {
    from { opacity: 0; letter-spacing: 0.5em; }
    to   { opacity: 1; letter-spacing: 0.38em; }
  }
  @keyframes loaderExit {
    0%   { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.04); }
  }
  @keyframes counterPulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 0.9; }
  }
  @keyframes grainShift {
    0%   { transform: translate(0, 0); }
    20%  { transform: translate(-2px, 2px); }
    40%  { transform: translate(2px, -2px); }
    60%  { transform: translate(-1px, 1px); }
    80%  { transform: translate(1px, -1px); }
    100% { transform: translate(0, 0); }
  }

  .loader-root {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: #080807;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: loaderFadeIn 0.4s ease forwards;
    overflow: hidden;
  }

  .loader-root.exiting {
    animation: loaderExit 0.65s cubic-bezier(0.77,0,0.18,1) forwards;
    pointer-events: none;
  }

  /* Grain overlay */
  .loader-grain {
    position: absolute;
    inset: -50%;
    width: 200%;
    height: 200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
    background-size: 160px;
    pointer-events: none;
    animation: grainShift 0.6s steps(1) infinite;
    opacity: 0.5;
  }

  /* Corner marks */
  .loader-corner {
    position: absolute;
    width: 32px;
    height: 32px;
    opacity: 0.15;
    animation: loaderFadeIn 1s 0.3s ease forwards;
    opacity: 0;
  }
  .loader-corner.tl { top: 32px; left: 32px; border-top: 1px solid #c9a96e; border-left: 1px solid #c9a96e; }
  .loader-corner.tr { top: 32px; right: 32px; border-top: 1px solid #c9a96e; border-right: 1px solid #c9a96e; }
  .loader-corner.bl { bottom: 32px; left: 32px; border-bottom: 1px solid #c9a96e; border-left: 1px solid #c9a96e; }
  .loader-corner.br { bottom: 32px; right: 32px; border-bottom: 1px solid #c9a96e; border-right: 1px solid #c9a96e; }

  /* Main content */
  .loader-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .loader-pre-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.4));
    margin-bottom: 28px;
    transform-origin: top;
    animation: loaderLineGrow 0.8s 0.2s cubic-bezier(0.77,0,0.18,1) forwards;
    transform: scaleY(0);
    opacity: 0;
  }

  .loader-forma {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(3rem, 8vw, 5.5rem);
    color: #f5f0e8;
    line-height: 1;
    letter-spacing: 0.08em;
    margin: 0;
    overflow: hidden;
    animation: loaderWordReveal 0.9s 0.5s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
    opacity: 0;
  }

  .loader-pilates {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: clamp(0.55rem, 1.2vw, 0.7rem);
    letter-spacing: 0.38em;
    text-transform: uppercase;
    color: #c9a96e;
    margin-top: 10px;
    animation: loaderSubReveal 1s 0.9s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
    opacity: 0;
  }

  .loader-divider {
    width: 40px;
    height: 1px;
    background: rgba(201,169,110,0.3);
    margin: 36px 0 20px;
    transform-origin: center;
    animation: loaderLineGrow 0.8s 1.1s cubic-bezier(0.77,0,0.18,1) forwards;
    transform: scaleX(0);
    opacity: 0;
  }

  /* Progress area */
  .loader-progress-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    animation: loaderFadeIn 0.6s 1.2s ease forwards;
    opacity: 0;
  }

  .loader-bar-bg {
    width: 200px;
    height: 1px;
    background: rgba(255,255,255,0.07);
    position: relative;
    overflow: hidden;
  }

  .loader-bar-fill {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(201,169,110,0.6), #c9a96e);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94);
  }

  .loader-counter {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 0.75rem;
    color: rgba(201,169,110,0.5);
    letter-spacing: 0.06em;
    animation: counterPulse 1.5s ease-in-out infinite;
    min-width: 40px;
    text-align: center;
  }

  .loader-loading-text {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.55rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.18);
    margin-top: 4px;
  }

  /* Bottom location stamp */
  .loader-location {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.55rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.15);
    white-space: nowrap;
    animation: loaderFadeIn 0.8s 1.4s ease forwards;
    opacity: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .loader-location::before,
  .loader-location::after {
    content: '';
    display: inline-block;
    width: 20px;
    height: 1px;
    background: rgba(245,240,232,0.1);
  }
`;

const PageLoader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 14 + 4;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onLoadComplete, 650);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 110);
    return () => clearInterval(timer);
  }, [onLoadComplete]);

  const clamped = Math.min(Math.round(progress), 100);

  return (
    <>
      <style>{styles}</style>
      <div className={`loader-root${isExiting ? " exiting" : ""}`}>

        {/* Grain */}
        <div className="loader-grain" />

        {/* Corner brackets */}
        <div className="loader-corner tl" />
        <div className="loader-corner tr" />
        <div className="loader-corner bl" />
        <div className="loader-corner br" />

        {/* Main content */}
        <div className="loader-content">
          {/* Vertical line above */}
          <div className="loader-pre-line" />

          {/* Brand */}
          <h1 className="loader-forma">FORMA</h1>
          <span className="loader-pilates">Pilates</span>

          {/* Thin rule */}
          <div className="loader-divider" />

          {/* Progress */}
          <div className="loader-progress-wrap">
            <div className="loader-bar-bg">
              <div
                className="loader-bar-fill"
                style={{ transform: `scaleX(${clamped / 100})` }}
              />
            </div>
            <span className="loader-counter">{clamped}</span>
            <span className="loader-loading-text">Loading experience</span>
          </div>
        </div>

        {/* Location stamp */}
        <div className="loader-location">Rabat, Morocco</div>
      </div>
    </>
  );
};

export default PageLoader;