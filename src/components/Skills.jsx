// src/components/Skills.jsx
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { skillsAPI } from '../services/api';

const defaultSkills = [
  { name:'React / Next.js', level:92, category:'frontend' },
  { name:'CSS / Tailwind',  level:90, category:'frontend' },
  { name:'Node.js / HonoJS',level:88, category:'backend'  },
  { name:'PostgreSQL',      level:80, category:'database'  },
  { name:'Prisma ORM',      level:82, category:'database'  },
  { name:'Docker',          level:72, category:'devops'    },
  { name:'Cloudinary',      level:78, category:'tools'     },
  { name:'Git / GitHub',    level:90, category:'tools'     },
  { name:'Figma',           level:75, category:'design'    },
  { name:'Python',          level:68, category:'backend'   },
  { name:'Java',         level:74, category:'backend'  },
];

const categories = ['all','frontend','backend','database','devops','tools','design'];
const catLabels  = { all:'Tout', frontend:'Frontend', backend:'Backend', database:'Base de données', devops:'DevOps', tools:'Outils', design:'Design' };
const catColors  = { frontend:'#5a9bd4', backend:'#0491A9', database:'#e8935a', devops:'#a07dc4', tools:'#c4a814', design:'#d45a7d' };

export default function Skills() {
  const [active, setActive] = useState('all');
  const [skills, setSkills] = useState(defaultSkills);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    skillsAPI.getAll().then(r => { if (r?.data?.length) setSkills(r.data); }).catch(() => {});
  }, []);

  const filtered = active === 'all' ? skills : skills.filter(s => s.category === active);

  return (
    <section id="skills" ref={ref} style={{ padding:'var(--section-pad) 0', background:'var(--deep)', position:'relative', overflow:'hidden' }}>

      {/* Big decorative number  */}
      <div aria-hidden style={{ position:'absolute', top:'50%', left:'-3%', transform:'translateY(-50%)', fontFamily:'var(--font-display)', fontSize:'clamp(180px,22vw,360px)', fontWeight:900, color:'transparent', WebkitTextStroke:'1px rgba(4,145,169,0.18)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>02</div>

      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7 }} style={{ marginBottom:'3.5rem' }}>
          <p className="section-eyebrow">02 — Compétences</p>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.2rem,4.5vw,3.5rem)', fontWeight:900 }}>
            Mon arsenal <em style={{ color:'var(--emerald)', fontWeight:300 }}>technologique</em>
          </h2>
        </motion.div>

        {/* Filter buttons */}
        <div style={{ display:'flex', gap:'0.6rem', flexWrap:'wrap', marginBottom:'3rem' }}>
          {categories.map(cat => {
            const col = catColors[cat] || 'var(--emerald)';
            const isA = active === cat;
            return (
              <button key={cat} onClick={() => setActive(cat)} style={{ padding:'0.42rem 1.1rem', border:'1px solid '+(isA ? col : 'var(--border)'), background: isA ? col+'22' : 'transparent', color: isA ? col : 'var(--mist)', fontFamily:'var(--font-mono)', fontSize:'0.7rem', letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', borderRadius:'100px', transition:'all 0.25s' }}>
                {catLabels[cat]}
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(265px,1fr))', gap:'1.25rem' }}>
          {filtered.map((s, i) => {
            const color = catColors[s.category] || 'var(--emerald)';
            return (
              <motion.div key={s.name}
                initial={{ opacity:0, y:18 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay: i * 0.055, duration:0.5 }}
                style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'6px', padding:'1.5rem 1.75rem', transition:'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color+'55'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px '+color+'22'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                  <span style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.95rem', color:'var(--white)', lineHeight:1.3 }}>{s.name}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'1rem', color, fontWeight:500, flexShrink:0, marginLeft:'0.5rem' }}>{s.level}%</span>
                </div>
                {/* Progress bar  fond adapté au mode clair */}
                <div style={{ height:'3px', background:'rgba(0,0,0,0.08)', borderRadius:'4px', overflow:'hidden', marginBottom:'0.85rem' }}>
                  <motion.div
                    initial={{ width:0 }}
                    animate={inView ? { width: s.level+'%' } : { width:0 }}
                    transition={{ duration:1.1, delay: 0.3 + i * 0.055, ease:[0.25,0.46,0.45,0.94] }}
                    style={{ height:'100%', background:color, borderRadius:'4px' }}
                  />
                </div>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--mist)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{catLabels[s.category] || s.category}</span>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}