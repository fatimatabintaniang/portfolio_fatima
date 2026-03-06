// src/components/Projects.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { projectsAPI } from '../services/api';

const defaultProjects = [
  { id:'1', title:'E-Commerce Platform',  description:'Plateforme e-commerce complète avec panier, paiements et gestion inventaire.',               tags:['React','Node.js','PostgreSQL','Stripe'], imageUrl:null, featured:true,  githubUrl:'https://github.com', liveUrl:'https://example.com' },
  { id:'2', title:'Dashboard Analytics',  description:'Tableau de bord en temps réel avec visualisations interactives et rapports automatisés.',    tags:['React','D3.js','WebSocket','MongoDB'],   imageUrl:null, featured:true,  githubUrl:'https://github.com', liveUrl:null },
  { id:'3', title:'Mobile Banking App',   description:'Application bancaire mobile sécurisée avec transferts instantanés et analytics.',            tags:['React Native','Node.js','Redis','JWT'],  imageUrl:null, featured:false, githubUrl:'https://github.com', liveUrl:null },
  { id:'4', title:'Portfolio CMS',        description:'Système de gestion de contenu headless avec API REST et panneau admin moderne.',             tags:['HonoJS','Prisma','PostgreSQL','Cloudinary'], imageUrl:null, featured:false, githubUrl:'https://github.com', liveUrl:'https://example.com' },
];

// ✅ Gradients adaptés au mode clair (plus clairs, moins sombres)
const gradients = [
  'linear-gradient(135deg, #dff5f0, #b8e8de)',
  'linear-gradient(135deg, #dde8f5, #b8cee8)',
  'linear-gradient(135deg, #f5e8dd, #e8d0b8)',
  'linear-gradient(135deg, #e8ddf5, #d0b8e8)',
];

const thumbAccents = ['#0491A9', '#5a9bd4', '#e8935a', '#a07dc4'];

export default function Projects() {
  const [projects, setProjects] = useState(defaultProjects);
  const [filter, setFilter]     = useState('all');
  const [showAll, setShowAll]   = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    projectsAPI.getAll().then(res => {
      if (res?.data?.length) setProjects(res.data);
    }).catch(() => {});
  }, []);

  const filtered          = filter === 'all' ? projects : projects.filter(p => p.featured);
  const displayedProjects = showAll ? filtered : filtered.slice(0, 3);

  return (
    <section id="projects" ref={ref} style={{ padding:'var(--section-pad) 0', background:'var(--void)', borderTop:'1px solid var(--border)', position:'relative', overflow:'hidden' }}>

      {/* Big decorative number ✅ */}
      <div aria-hidden style={{ position:'absolute', bottom:'-5%', right:'-4%', fontFamily:'var(--font-display)', fontSize:'clamp(180px,22vw,360px)', fontWeight:900, color:'transparent', WebkitTextStroke:'1px rgba(4,145,169,0.18)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>03</div>

      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'4rem', flexWrap:'wrap', gap:'1.5rem' }}>
          <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7 }}>
            <p className="section-eyebrow">03 — Projets</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.5rem, 5vw, 4rem)', fontWeight:900, lineHeight:1.1 }}>
              Réalisations<br />
              <em style={{ color:'var(--emerald)', fontStyle:'italic', fontWeight:300 }}>récentes</em>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.3 }} style={{ display:'flex', gap:'0.5rem' }}>
            {['all', 'featured'].map((f) => (
              <button key={f} onClick={() => { setFilter(f); setShowAll(false); }}
                style={{ padding:'0.45rem 1.25rem', border:`1px solid ${filter === f ? 'var(--emerald)' : 'var(--border)'}`, background: filter === f ? 'var(--emerald-dim)' : 'transparent', color: filter === f ? 'var(--emerald)' : 'var(--mist)', fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.08em', textTransform:'uppercase', cursor:'pointer', borderRadius:'100px', transition:'all 0.25s' }}>
                {f === 'all' ? 'Tous' : 'En vedette'}
              </button>
            ))}
          </motion.div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'2rem' }}>
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, i) => (
              <motion.div key={project.id} layout
                initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.95 }} transition={{ duration:0.5, delay: i * 0.1 }}
                style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'8px', overflow:'hidden', transition:'all 0.35s var(--ease)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(4,145,169,0.18)'; }}  // ✅
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>

                {/* Thumbnail */}
                <div style={{ height:'200px', background: project.imageUrl ? `url(${project.imageUrl}) center/cover` : gradients[i % gradients.length], position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {!project.imageUrl && (
                    <>
                      <div style={{ fontFamily:'var(--font-display)', fontSize:'6rem', fontWeight:900, color: thumbAccents[i % thumbAccents.length]+'22', lineHeight:1, userSelect:'none' }}>
                        {project.title.charAt(0)}
                      </div>
                      {/* Grid ✅ adapté fond clair */}
                      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)', backgroundSize:'32px 32px' }} />
                      <div style={{ position:'absolute', bottom:'1.25rem', left:'1.75rem', width:'7px', height:'7px', background: thumbAccents[i % thumbAccents.length], borderRadius:'50%', boxShadow:`0 0 10px ${thumbAccents[i % thumbAccents.length]}` }} />
                    </>
                  )}
                  {/* Bottom fade ✅ */}
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.08) 100%)' }} />

                  {project.featured && (
                    <div style={{ position:'absolute', top:'1rem', left:'1rem', padding:'0.22rem 0.75rem', background:'var(--emerald)', color:'var(--void)', fontFamily:'var(--font-mono)', fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', borderRadius:'100px', zIndex:2 }}>
                      Featured
                    </div>
                  )}

                  {/* Action links ✅ fond adapté */}
                  <div style={{ position:'absolute', top:'1rem', right:'1rem', display:'flex', gap:'0.4rem', zIndex:2 }}>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        style={{ width:'34px', height:'34px', background:'rgba(255,255,255,0.85)', border:'1px solid var(--border-mid)', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--fog)', transition:'all 0.25s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--emerald)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--emerald)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.color = 'var(--fog)'; e.currentTarget.style.borderColor = 'var(--border-mid)'; }}>
                        <Github size={13} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        style={{ width:'34px', height:'34px', background:'rgba(255,255,255,0.85)', border:'1px solid var(--border-mid)', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--fog)', transition:'all 0.25s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--emerald)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--emerald)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.color = 'var(--fog)'; e.currentTarget.style.borderColor = 'var(--border-mid)'; }}>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

                <div style={{ padding:'1.75rem' }}>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', fontWeight:700, color:'var(--white)', marginBottom:'0.7rem', lineHeight:1.2 }}>{project.title}</h3>
                  <p style={{ color:'var(--fog)', fontSize:'0.9rem', lineHeight:1.8, marginBottom:'1.25rem' }}>{project.description}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                    {project.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length > 3 && (
          <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.5 }} style={{ display:'flex', justifyContent:'center', marginTop:'3rem' }}>
            <button onClick={() => setShowAll(!showAll)}
              style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.9rem 2.5rem', background:'transparent', border:'1px solid var(--border)', borderRadius:'4px', color:'var(--fog)', fontFamily:'var(--font-mono)', fontSize:'0.85rem', letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.3s var(--ease)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--emerald)'; e.currentTarget.style.color = 'var(--emerald)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--fog)'; }}>
              <span>{showAll ? 'Voir moins de projets' : 'Voir tous les projets'}</span>
              <ArrowUpRight size={16} style={{ transition:'transform 0.3s', transform: showAll ? 'rotate(90deg)' : 'none' }} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}