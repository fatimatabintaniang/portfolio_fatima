// src/components/Footer.jsx
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background:'var(--void)', borderTop:'1px solid var(--border)', padding:'3rem 0' }}>
      <div className="container">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1.5rem' }}>
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', fontWeight:700, color:'var(--white)' }}>
              Fatimata <span style={{ color:'var(--emerald)', fontStyle:'italic', fontWeight:300 }}>Binta</span>
            </div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--mist)', letterSpacing:'0.1em', marginTop:'0.3rem' }}>
              © {new Date().getFullYear()} — Tous droits réservés
            </div>
          </div>

          <div style={{ display:'flex', gap:'0.75rem' }}>
            {[{ Icon:Github,  href:'https://github.com' }, { Icon:Linkedin, href:'https://linkedin.com' }, { Icon:Mail, href:'#contact' }].map(({ Icon,href },i) => (
              <motion.a key={i} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" whileHover={{ y:-3 }}
                style={{ width:'40px', height:'40px', border:'1px solid var(--border)', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--mist)', transition:'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.color='var(--emerald)'; e.currentTarget.style.borderColor='var(--emerald)'; e.currentTarget.style.background='var(--emerald-dim)'; }}
                onMouseLeave={e => { e.currentTarget.style.color='var(--mist)'; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='transparent'; }}>
                <Icon size={16}/>
              </motion.a>
            ))}
          </div>

          <motion.button whileHover={{ y:-3 }} onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
            style={{ display:'flex', alignItems:'center', gap:'0.5rem', background:'none', border:'1px solid var(--border)', borderRadius:'4px', padding:'0.6rem 1.2rem', color:'var(--mist)', fontFamily:'var(--font-mono)', fontSize:'0.7rem', letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.color='var(--emerald)'; e.currentTarget.style.borderColor='var(--emerald)'; }}
            onMouseLeave={e => { e.currentTarget.style.color='var(--mist)'; e.currentTarget.style.borderColor='var(--border)'; }}>
            <ArrowUp size={14}/> Haut de page
          </motion.button>
        </div>
      </div>
    </footer>
  );
}