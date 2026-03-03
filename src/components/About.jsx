// src/components/About.jsx
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.jpeg';

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" ref={ref} style={{
      padding: 'var(--section-pad) 0',
      background: 'var(--deep)',
      borderTop: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Big decorative number */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', right: '-4%',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(180px,22vw,360px)',
        fontWeight: 900, color: 'transparent',
        WebkitTextStroke: '1px rgba(45,212,160,0.04)',
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>01</div>

      {/* Subtle glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '-10%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(45,212,160,0.04) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '6rem',
          alignItems: 'center',
        }} className="about-grid">

          {/* ── Image ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: 'relative' }}
          >
            {/* Outer decorative border */}
            <div style={{
              position: 'absolute',
              top: '-20px', left: '-20px',
              width: '100%', height: '100%',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              zIndex: 0,
            }} />

            {/* Far border */}
            <div style={{
              position: 'absolute',
              top: '-36px', left: '-36px',
              width: '100%', height: '100%',
              border: '1px solid rgba(45,212,160,0.04)',
              borderRadius: '6px',
              zIndex: 0,
            }} />

            {/* Corner accents */}
            {['tl','tr','bl','br'].map(c => (
              <div key={c} style={{
                position: 'absolute', width: '20px', height: '20px', zIndex: 2,
                ...(c.includes('t') ? { top: '-1px' } : { bottom: '-1px' }),
                ...(c.includes('l') ? { left: '-1px' } : { right: '-1px' }),
                borderTop:    c.includes('t') ? '2px solid var(--emerald)' : 'none',
                borderBottom: c.includes('b') ? '2px solid var(--emerald)' : 'none',
                borderLeft:   c.includes('l') ? '2px solid var(--emerald)' : 'none',
                borderRight:  c.includes('r') ? '2px solid var(--emerald)' : 'none',
              }} />
            ))}

            {/* Photo */}
            <div style={{
              position: 'relative', zIndex: 1,
              overflow: 'hidden',
              aspectRatio: '4/5',
              borderRadius: '4px',
            }}>
              <img
                src={profileImg}
                alt="Fatimata Binta"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center top',
                  transition: 'transform 0.6s var(--ease)',
                  display: 'block',
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              {/* Bottom fade */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
                background: 'linear-gradient(to top, rgba(8,11,15,0.6), transparent)',
              }} />
            </div>

            {/* Floating "Open to work" badge */}
            <div style={{
              position: 'absolute', bottom: '-16px', right: '0',
              background: 'var(--emerald)', color: 'var(--void)',
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700,
              padding: '0.4rem 1rem', borderRadius: '100px', letterSpacing: '0.08em',
              zIndex: 3, whiteSpace: 'nowrap',
            }}>
              Open to work ✓
            </div>
          </motion.div>

          {/* ── Content ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-eyebrow"
            >
              01 — À propos
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              Passionnée par
              <br />
              <em style={{ color: 'var(--emerald)', fontStyle: 'italic', fontWeight: 300 }}>l'art du code</em>
            </motion.h2>

            <div className="divider" />

            {[
              "Je suis une développeuse Full Stack avec une passion profonde pour créer des expériences web qui allient performance technique et esthétique soignée.",
              "Mon approche mêle rigueur ingénieure et sensibilité design — je crois que chaque ligne de code est une opportunité de créer quelque chose de beau et d'utile.",
              "Basée à Dakar, je travaille sur des projets alliant React, Node.js et des technologies cloud modernes pour des clients locaux et internationaux.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                style={{
                  color: 'var(--fog)',
                  lineHeight: 1.95,
                  marginBottom: '1rem',
                  fontSize: '1rem',
                  marginTop: i === 0 ? '1.25rem' : 0,
                }}
              >
                {text}
              </motion.p>
            ))}

            {/* ── Stats grid ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginTop: '2.5rem',
              }}
            >
              {[
                { num: '3+',   label: "Années d'expérience" },
                { num: '20+',  label: 'Projets livrés' },
                { num: '15+',  label: 'Clients satisfaits' },
                { num: '100%', label: 'Dévouement' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding: '1.4rem 1.5rem',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--emerald)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(45,212,160,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Accent top line on hover (via static style) */}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    color: 'var(--emerald)',
                    fontWeight: 900,
                    lineHeight: 1,
                  }}>
                    {stat.num}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.63rem',
                    color: 'var(--mist)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginTop: '0.3rem',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              style={{ marginTop: '2rem' }}
            >
              <a href="#contact" className="btn-primary">
                Travaillons ensemble
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
