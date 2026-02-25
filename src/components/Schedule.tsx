import AnimatedSection from "./AnimatedSection";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400&display=swap');

  .sch-root {
    font-family: 'Jost', sans-serif;
    background: #0e0d0b;
    position: relative;
    overflow: hidden;
  }

  .sch-root::before {
    content: '';
    position: absolute;
    top: 40%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(201,169,110,0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  .sch-badge {
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
  .sch-badge::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: #c9a96e;
    flex-shrink: 0;
  }

  .sch-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(2.6rem, 5vw, 4.2rem);
    color: #f5f0e8;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .sch-title em { font-style: italic; color: #c9a96e; }

  .sch-desc {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.85rem;
    line-height: 1.85;
    color: rgba(245,240,232,0.4);
    margin: 0;
    max-width: 420px;
  }

  /* ── Desktop table ── */
  .sch-table {
    width: 100%;
    border: 1px solid rgba(255,255,255,0.06);
    display: none;
  }
  @media (min-width: 1024px) { .sch-table { display: block; } }

  .sch-row {
    display: grid;
    grid-template-columns: 200px 1fr;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: background 0.25s;
  }
  .sch-row:last-of-type { border-bottom: none; }
  .sch-row:hover { background: rgba(201,169,110,0.02); }

  .sch-day-cell {
    padding: 28px 32px;
    border-right: 1px solid rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
  }

  .sch-day-name {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 1.5rem;
    color: #f5f0e8;
    line-height: 1;
    letter-spacing: 0.01em;
    transition: color 0.25s;
  }
  .sch-row:hover .sch-day-name { color: #c9a96e; }

  .sch-slot-count {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.55rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.22);
  }

  .sch-slots-cell {
    padding: 20px 28px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .sch-slot {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: rgba(245,240,232,0.5);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 8px 16px;
    transition: border-color 0.25s, color 0.25s, background 0.25s;
    cursor: default;
    position: relative;
    overflow: hidden;
  }
  .sch-slot::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(201,169,110,0);
    transition: background 0.25s;
  }
  .sch-slot:hover {
    border-color: rgba(201,169,110,0.3);
    color: rgba(245,240,232,0.85);
    background: rgba(201,169,110,0.04);
  }
  .sch-slot:hover::before {
    background: #c9a96e;
  }

  /* ── Mobile carousel ── */
  .sch-mobile {
    display: block;
  }
  @media (min-width: 1024px) { .sch-mobile { display: none; } }

  .sch-mob-track-wrap { overflow: hidden; }

  .sch-mob-track {
    display: flex;
    transition: transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
  }

  .sch-mob-card {
    flex-shrink: 0;
    width: 100%;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.01);
    padding: 36px 32px;
    box-sizing: border-box;
  }

  .sch-mob-day {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 2.4rem;
    color: #f5f0e8;
    margin: 0 0 6px 0;
    line-height: 1;
  }

  .sch-mob-count {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.58rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.25);
    margin-bottom: 32px;
    display: block;
  }

  .sch-mob-slot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.85rem;
    color: rgba(245,240,232,0.55);
    letter-spacing: 0.04em;
  }
  .sch-mob-slot:last-of-type { border-bottom: none; }

  .sch-mob-duration {
    font-family: 'Jost', sans-serif;
    font-weight: 200;
    font-size: 0.58rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(201,169,110,0.5);
  }

  /* Mobile nav */
  .sch-mob-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
  }

  .sch-arrow {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(255,255,255,0.1);
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(245,240,232,0.4);
    transition: border-color 0.25s, color 0.25s;
    border-radius: 0;
  }
  .sch-arrow:hover:not(:disabled) {
    border-color: rgba(201,169,110,0.4);
    color: #c9a96e;
  }
  .sch-arrow:disabled { opacity: 0.2; cursor: default; }

  .sch-mob-dots {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .sch-dot {
    width: 4px;
    height: 4px;
    background: rgba(255,255,255,0.15);
    border: none;
    cursor: pointer;
    transition: background 0.25s, width 0.3s;
    padding: 0;
    border-radius: 0;
  }
  .sch-dot.active {
    background: #c9a96e;
    width: 20px;
  }

  /* Bottom info strip */
  .sch-info-strip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 24px;
    border: 1px solid rgba(255,255,255,0.06);
    display: inline-flex;
    margin-top: 32px;
  }

  .sch-info-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #c9a96e;
    flex-shrink: 0;
    animation: schPulse 2s ease-in-out infinite;
  }

  @keyframes schPulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }

  .sch-info-text {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.35);
  }
`;

const Schedule = () => {
  const { t } = useTranslation();
  const [mobIndex, setMobIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scheduleData = [
    { dayKey: "schedule.days.monday",    classes: ["9:00 - 9:50", "10:10 - 11:00", "17:00 - 17:50", "18:10 - 19:00"] },
    { dayKey: "schedule.days.tuesday",   classes: ["9:00 - 9:50", "10:10 - 11:00", "17:00 - 17:50", "18:10 - 19:00"] },
    { dayKey: "schedule.days.wednesday", classes: ["9:00 - 9:50", "10:10 - 11:00", "17:00 - 17:50", "18:10 - 19:00"] },
    { dayKey: "schedule.days.thursday",  classes: ["9:00 - 9:50", "10:10 - 11:00", "17:00 - 17:50", "18:10 - 19:00"] },
    { dayKey: "schedule.days.friday",    classes: ["9:00 - 9:50", "10:10 - 11:00", "17:00 - 17:50", "18:10 - 19:00"] },
    { dayKey: "schedule.days.saturday",  classes: ["10:00 - 10:50", "11:10 - 12:00"] },
    { dayKey: "schedule.days.sunday",    classes: ["10:00 - 10:50", "11:10 - 12:00"] },
  ];

  const maxMob = scheduleData.length - 1;

  return (
    <>
      <style>{styles}</style>

      <section id="schedule" className="sch-root" style={{ padding: "120px 0" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

          {/* ── Header ── */}
          <AnimatedSection animation="fade-in-up">
            <div style={{ marginBottom: 72 }}>
              <div style={{ marginBottom: 24 }}>
                <span className="sch-badge">{t("schedule.badge")}</span>
              </div>
              <h2 className="sch-title" style={{ marginBottom: 24 }}>{t("schedule.title")}</h2>
              <div style={{ width: 40, height: 1, background: "rgba(201,169,110,0.4)", marginBottom: 24 }} />
              <p className="sch-desc">{t("schedule.description")}</p>
            </div>
          </AnimatedSection>

          {/* ── Desktop table ── */}
          <AnimatedSection animation="fade-in-up" delay={150}>
            <div className="sch-table">
              {scheduleData.map((day, i) => (
                <div key={i} className="sch-row">
                  <div className="sch-day-cell">
                    <span className="sch-day-name">{t(day.dayKey)}</span>
                    <span className="sch-slot-count">{day.classes.length} {t("schedule.allClasses") || "classes"}</span>
                  </div>
                  <div className="sch-slots-cell">
                    {day.classes.map((time, idx) => (
                      <span key={idx} className="sch-slot">{time}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* ── Mobile carousel ── */}
          <AnimatedSection animation="fade-in-up" delay={150}>
            <div className="sch-mobile">
              <div className="sch-mob-track-wrap">
                <div
                  ref={trackRef}
                  className="sch-mob-track"
                  style={{ transform: `translateX(-${mobIndex * 100}%)` }}
                >
                  {scheduleData.map((day, i) => (
                    <div key={i} className="sch-mob-card">
                      <h3 className="sch-mob-day">{t(day.dayKey)}</h3>
                      <span className="sch-mob-count">
                        {i + 1} / {scheduleData.length} · {day.classes.length} {t("schedule.allClasses") || "classes"}
                      </span>
                      {day.classes.map((time, idx) => (
                        <div key={idx} className="sch-mob-slot">
                          <span>{time}</span>
                          <span className="sch-mob-duration">50 min</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Nav */}
              <div className="sch-mob-nav">
                <button className="sch-arrow" onClick={() => setMobIndex(i => Math.max(0, i - 1))} disabled={mobIndex === 0} aria-label="Previous day">
                  <ChevronLeft size={15} strokeWidth={1.5} />
                </button>

                <div className="sch-mob-dots">
                  {scheduleData.map((_, i) => (
                    <button
                      key={i}
                      className={`sch-dot${i === mobIndex ? " active" : ""}`}
                      onClick={() => setMobIndex(i)}
                      aria-label={`Day ${i + 1}`}
                    />
                  ))}
                </div>

                <button className="sch-arrow" onClick={() => setMobIndex(i => Math.min(maxMob, i + 1))} disabled={mobIndex === maxMob} aria-label="Next day">
                  <ChevronRight size={15} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Info strip ── */}
          <AnimatedSection animation="fade-in-up" delay={300}>
            <div style={{ marginTop: 40 }}>
              <div className="sch-info-strip">
                <div className="sch-info-dot" />
                <span className="sch-info-text">{t("schedule.allClasses")} · {t("schedule.bookingRequired")}</span>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </>
  );
};

export default Schedule;