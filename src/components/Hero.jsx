// src/components/Hero.jsx
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';

export default function Hero() {
  return (
    <section id="hero" style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden',
      background:'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(45,212,160,0.04) 0%, transparent 60%)' }}>

      {/* Grid lines */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(45,212,160,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(45,212,160,0.025) 1px,transparent 1px)', backgroundSize:'80px 80px', pointerEvents:'none' }} />

      {/* Blobs */}
      {[{ w:500,h:500,c:'rgba(45,212,160,0.07)',t:'-10%',r:'5%',d:'0s' }, { w:380,h:380,c:'rgba(232,147,90,0.05)',b:'10%',l:'-5%',d:'-7s' }].map((b,i) => (
        <div key={i} style={{ position:'absolute', width:b.w, height:b.h, borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none',
          background:`radial-gradient(circle,${b.c} 0%,transparent 70%)`,
          ...(b.t ? { top:b.t } : { bottom:b.b }),
          ...(b.r ? { right:b.r } : { left:b.l }),
          animation:`blobFloat 14s ease-in-out ${b.d} infinite` }} />
      ))}

      {/* Big number */}
      <div aria-hidden style={{ position:'absolute', top:'50%', right:'-4%', transform:'translateY(-50%)', fontFamily:'var(--font-display)', fontSize:'clamp(200px,28vw,420px)', fontWeight:900, color:'transparent', WebkitTextStroke:'1px rgba(45,212,160,0.04)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>01</div>

      <div className="container" style={{ position:'relative', zIndex:1, paddingTop:'9rem', paddingBottom:'5rem' }}>
        <div className="hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 400px', gap:'5rem', alignItems:'center' }}>

          <div>
            {/* Available badge */}
            <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1 }}
              style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem', padding:'0.4rem 1rem', border:'1px solid var(--border-mid)', borderRadius:'100px', background:'var(--emerald-dim)', fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--emerald)', letterSpacing:'0.1em', marginBottom:'1.5rem' }}>
              <span style={{ width:'6px', height:'6px', background:'var(--emerald)', borderRadius:'50%', animation:'pulse 2s infinite', display:'inline-block' }} />
              Disponible pour de nouveaux projets
            </motion.div>

            <motion.h1 initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2, duration:0.8 }}
              style={{ fontFamily:'var(--font-display)', fontSize:'clamp(3rem,7.5vw,6rem)', fontWeight:900, lineHeight:1.04, letterSpacing:'-0.03em', marginBottom:'1.5rem' }}>
              <span style={{ display:'block', color:'var(--white)' }}>Créer.</span>
              <span style={{ display:'block', color:'var(--emerald)', fontStyle:'italic', fontWeight:300 }}>Innover.</span>
              <span style={{ display:'block', color:'var(--fog)', fontWeight:300 }}>Inspirer.</span>
            </motion.h1>

            <motion.p initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.35 }}
              style={{ fontFamily:'var(--font-body)', fontSize:'1.05rem', color:'var(--fog)', maxWidth:'500px', lineHeight:1.9, marginBottom:'2.5rem' }}>
              Développeuse{' '}
              <span style={{ color:'var(--copper)', fontWeight:600 }}>
                <TypeAnimation sequence={['Full Stack passionnée',2200,'React & Node.js',2200,'UI / UX enthousiaste',2200,'Résolveur de problèmes',2200]} repeat={Infinity} />
              </span>
              {' '}— je transforme vos idées en expériences digitales mémorables.
            </motion.p>

            <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.45 }}
              style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'3rem' }}>
              <a href="#projects" className="btn-primary"><ArrowDown size={15}/>Voir mes projets</a>
              <a href="/cv.pdf" download className="btn-outline"><Download size={15}/>Télécharger CV</a>
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
              style={{ display:'flex', gap:'1.5rem', alignItems:'center' }}>
              {[{ Icon:Github,  href:'https://github.com',   label:'GitHub' },
                { Icon:Linkedin,href:'https://linkedin.com', label:'LinkedIn' },
                { Icon:Mail,    href:'#contact',             label:'Email' }].map(({ Icon,href,label }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--mist)', transition:'color 0.25s' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--emerald)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--mist)'}>
                  <Icon size={17}/>{label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div initial={{ opacity:0,scale:0.94,x:30 }} animate={{ opacity:1,scale:1,x:0 }} transition={{ duration:1,delay:0.25 }}
            style={{ position:'relative' }} className="hero-image-wrap">
            <div style={{ position:'absolute', inset:'-24px', border:'1px solid rgba(45,212,160,0.04)', borderRadius:'8px' }} />
            <div style={{ position:'absolute', inset:'-12px', border:'1px solid var(--border-mid)', borderRadius:'6px' }} />
            {['tl','tr','bl','br'].map(c => (
              <div key={c} style={{ position:'absolute', width:'20px', height:'20px', zIndex:2,
                ...(c.includes('t') ? { top:'-1px' } : { bottom:'-1px' }),
                ...(c.includes('l') ? { left:'-1px' } : { right:'-1px' }),
                borderTop:    c.includes('t') ? '2px solid var(--emerald)' : 'none',
                borderBottom: c.includes('b') ? '2px solid var(--emerald)' : 'none',
                borderLeft:   c.includes('l') ? '2px solid var(--emerald)' : 'none',
                borderRight:  c.includes('r') ? '2px solid var(--emerald)' : 'none',
              }} />
            ))}
            <div style={{ position:'relative', zIndex:1, borderRadius:'4px', overflow:'hidden', aspectRatio:'4/5' }}>
              <img src={profileImg} alt="Fatimata Binta" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(8,11,15,0.5) 0%,transparent 50%)' }} />
            </div>
            {[{ value:'3+', label:"Ans d'exp.", top:'12%',  right:'-68px' },
              { value:'20+',label:'Projets',    bottom:'18%',right:'-68px' }].map(s => (
              <motion.div key={s.label} initial={{ opacity:0,x:16 }} animate={{ opacity:1,x:0 }} transition={{ delay:1 }}
                style={{ position:'absolute', ...s, background:'var(--surface-2)', border:'1px solid var(--border-mid)', borderRadius:'6px', padding:'0.75rem 1.1rem', textAlign:'center', minWidth:'80px', zIndex:3 }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1.75rem', color:'var(--emerald)', fontWeight:700, lineHeight:1 }}>{s.value}</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--mist)', letterSpacing:'0.1em', marginTop:'0.2rem' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.6 }}
        style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.4rem', color:'var(--mist)', fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.18em' }}>
        <span>SCROLL</span>
        <motion.div animate={{ y:[0,5,0] }} transition={{ repeat:Infinity, duration:1.4 }}><ArrowDown size={13}/></motion.div>
      </motion.div>

      <style>{`
        @keyframes blobFloat { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-25px) scale(1.04)} 66%{transform:translate(-15px,18px) scale(0.97)} }
        @keyframes pulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(45,212,160,0.4)} 50%{opacity:0.7;box-shadow:0 0 0 6px rgba(45,212,160,0)} }
        @media(max-width:900px){ .hero-grid{grid-template-columns:1fr!important} .hero-image-wrap{display:none} }
      `}</style>
    </section>
  );
}