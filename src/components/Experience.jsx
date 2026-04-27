// src/components/Experience.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Calendar, Briefcase } from 'lucide-react';
import { experienceAPI } from '../services/api';

const defaultExperiences = [
  {
    id: '1',
    company: 'Ecole SUP 221',
    role: 'Développeuse Full Stack Senior',
    description: 'Architecture et développement de plateformes SaaS B2B. Leading une équipe de 3 développeurs, mise en place CI/CD avec GitHub Actions, optimisation des performances API de 40%.',
    startDate: '2023-01-01',
    current: true,
    location: 'Dakar, Sénégal',
  },
];

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
};

export default function Experience() {
  const [experiences, setExperiences] = useState(defaultExperiences);
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    experienceAPI.getAll().then(res => {
      if (res?.data?.length) setExperiences(res.data);
    }).catch(() => {});
  }, []);

  const exp = experiences[active];

  return (
    <section id="experience" ref={ref} style={{ padding:'var(--section-pad) 0', background:'var(--deep)', position:'relative', overflow:'hidden' }}>

      {/* Big decorative number ✅ */}
      <div aria-hidden style={{ position:'absolute', top:'50%', right:'-4%', transform:'translateY(-50%)', fontFamily:'var(--font-display)', fontSize:'clamp(180px,22vw,360px)', fontWeight:900, color:'transparent', WebkitTextStroke:'1px rgba(4,145,169,0.18)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>04</div>

      {/* Subtle glow ✅ */}
      <div style={{ position:'absolute', bottom:'10%', left:'-5%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(232,147,90,0.10) 0%, transparent 70%)', filter:'blur(60px)', pointerEvents:'none' }} />

      <div className="container" style={{ position:'relative', zIndex:1 }}>

        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7 }} style={{ marginBottom:'4rem' }}>
          <p className="section-eyebrow">04 — Expérience</p>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.5rem, 5vw, 4rem)', fontWeight:900, lineHeight:1.1 }}>
            Parcours<br />
            <em style={{ color:'var(--emerald)', fontStyle:'italic', fontWeight:300 }}>professionnel</em>
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'280px 1fr', gap:'3rem', alignItems:'start' }} className="exp-grid">

          {/* Company tabs */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ delay:0.2 }}
            style={{ position:'sticky', top:'6rem', display:'flex', flexDirection:'column', borderLeft:'1px solid var(--border)' }}>
            {experiences.map((exp, i) => (
              <button key={exp.id} onClick={() => setActive(i)}
                style={{ padding:'1.25rem 1.5rem', textAlign:'left', background: active === i ? 'var(--surface)' : 'none', border:'none', borderLeft:`2px solid ${active === i ? 'var(--emerald)' : 'transparent'}`, cursor:'pointer', transition:'all 0.25s', marginLeft:'-1px', borderRadius:'0 6px 6px 0' }}
                onMouseEnter={e => { if (active !== i) e.currentTarget.style.background = 'rgba(4,145,169,0.06)'; }}  // ✅
                onMouseLeave={e => { if (active !== i) e.currentTarget.style.background = 'none'; }}>
                <div style={{ fontFamily:'var(--font-body)', fontWeight: active === i ? 600 : 400, fontSize:'0.9rem', color: active === i ? 'var(--emerald)' : 'var(--fog)', transition:'color 0.25s', marginBottom:'0.25rem' }}>
                  {exp.company}
                </div>
                {exp.current && (
                  <div style={{ display:'inline-flex', alignItems:'center', gap:'0.35rem', fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--emerald)', letterSpacing:'0.1em' }}>
                    <span style={{ width:'5px', height:'5px', background:'var(--emerald)', borderRadius:'50%', display:'inline-block', animation:'pulse 2s infinite' }} />
                    ACTUEL
                  </div>
                )}
              </button>
            ))}
          </motion.div>

          {/* Detail panel */}
          <motion.div key={active} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.4 }}
            style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'8px', padding:'2.5rem', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg, var(--emerald), var(--copper), transparent)' }} />

            <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.5rem' }}>
              <Briefcase size={15} style={{ color:'var(--emerald)', flexShrink:0 }} />
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight:700, color:'var(--white)', lineHeight:1.2 }}>
                {exp?.role}
              </h3>
            </div>

            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.05rem', color:'var(--copper)', fontStyle:'italic', marginBottom:'1.25rem', paddingLeft:'1.45rem' }}>
              @ {exp?.company}
            </div>

            <div style={{ display:'flex', gap:'1.5rem', marginBottom:'1.75rem', flexWrap:'wrap' }}>
              <span style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontFamily:'var(--font-mono)', fontSize:'0.73rem', color:'var(--mist)' }}>
                <Calendar size={12} />
                {formatDate(exp?.startDate)} — {exp?.current ? "Aujourd'hui" : formatDate(exp?.endDate)}
              </span>
              {exp?.location && (
                <span style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontFamily:'var(--font-mono)', fontSize:'0.73rem', color:'var(--mist)' }}>
                  <MapPin size={12} />{exp.location}
                </span>
              )}
            </div>

            <div className="divider" />
            <p style={{ color:'var(--fog)', lineHeight:1.9, fontSize:'0.97rem', marginTop:'1.25rem' }}>{exp?.description}</p>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(4,145,169,0.4)} 50%{opacity:0.7;box-shadow:0 0 0 6px rgba(4,145,169,0)} }
        @media (max-width: 768px) { .exp-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}