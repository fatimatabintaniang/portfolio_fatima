// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Menu } from 'lucide-react';

const links = [
  { href: '#hero',       label: 'Accueil' },
  { href: '#about',      label: 'À propos' },
  { href: '#skills',     label: 'Compétences' },
  { href: '#projects',   label: 'Projets' },
  { href: '#experience', label: 'Expérience' },
  { href: '#contact',    label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState('#hero');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>

          <motion.a href="#hero" initial={{ opacity:0,x:-16 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.6 }}
            style={{ fontFamily:'var(--font-display)', fontSize:'1.35rem', fontWeight:700, color:'var(--white)', letterSpacing:'-0.02em' }}>
            Fatimata<span style={{ color:'var(--emerald)', fontWeight:300, fontStyle:'italic' }}> Binta</span>
          </motion.a>

          <motion.ul className="nav-desktop" initial={{ opacity:0,y:-8 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6, delay:0.15 }}
            style={{ display:'flex', listStyle:'none', gap:'2.5rem', alignItems:'center' }}>
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setActive(link.href)}
                  style={{ fontFamily:'var(--font-body)', fontSize:'0.82rem', fontWeight: active===link.href ? 600 : 400, letterSpacing:'0.06em', textTransform:'uppercase', color: active===link.href ? 'var(--emerald)' : 'var(--fog)', position:'relative', transition:'color 0.25s' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--emerald)'}
                  onMouseLeave={e => e.currentTarget.style.color= active===link.href ? 'var(--emerald)' : 'var(--fog)'}>
                  {link.label}
                  {active === link.href && (
                    <motion.span layoutId="nav-underline" style={{ position:'absolute', bottom:'-3px', left:0, height:'1px', width:'100%', background:'var(--emerald)', borderRadius:'1px' }} />
                  )}
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.a href="/cv.pdf"  className="nav-desktop"
            initial={{ opacity:0,x:16 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.6, delay:0.3 }}
            style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'0.6rem 1.4rem', background:'transparent', border:'1px solid var(--emerald)', color:'var(--emerald)', fontFamily:'var(--font-body)', fontSize:'0.78rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', borderRadius:'2px', transition:'all 0.3s', cursor:'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--emerald-dim)'; e.currentTarget.style.boxShadow='0 0 20px rgba(45,212,160,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.boxShadow='none'; }}>
            <Download size={14} /> Télécharger CV
          </motion.a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="burger-btn" aria-label="Menu"
            style={{ background:'none', border:'1px solid var(--border-mid)', borderRadius:'4px', cursor:'pointer', display:'none', alignItems:'center', justifyContent:'center', width:'40px', height:'40px', color:'var(--white)' }}>
            {menuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div key="mob" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}
            style={{ position:'fixed', inset:0, background:'var(--void)', zIndex:150, display:'flex', flexDirection:'column', padding:'2rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'3rem' }}>
              <span style={{ fontFamily:'var(--font-display)', fontSize:'1.35rem', fontWeight:700, color:'var(--white)' }}>
                Fatimata<span style={{ color:'var(--emerald)', fontStyle:'italic', fontWeight:300 }}> Binta</span>
              </span>
              <button onClick={() => setMenuOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--white)' }}><X size={24}/></button>
            </div>
            <nav style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:'0.25rem' }}>
              {links.map((link,i) => (
                <motion.a key={link.href} href={link.href} initial={{ opacity:0,x:-20 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.06 }}
                  onClick={() => { setActive(link.href); setMenuOpen(false); }}
                  style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,7vw,2.8rem)', fontWeight:700, color: active===link.href ? 'var(--emerald)' : 'var(--white)', padding:'0.6rem 0', borderBottom:'1px solid var(--border)', transition:'color 0.2s' }}>
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <a href="/cv.pdf" download className="btn-primary" style={{ alignSelf:'flex-start', marginTop:'2rem' }}>
              <Download size={15}/> Télécharger mon CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}