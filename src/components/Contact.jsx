// src/components/Contact.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactAPI } from '../services/api';

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.length < 2) e.name = 'Nom requis (min. 2 caractères)';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message requis (min. 10 caractères)';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await contactAPI.send(form);
      setSent(true);
      toast.success('Message envoyé avec succès !');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.message || "Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.9rem 1.1rem',
    background: 'var(--deep)',
    border: `1px solid ${errors[field] ? '#e57373' : 'var(--border)'}`,
    borderRadius: '4px',
    color: 'var(--white)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.3s',
    resize: field === 'message' ? 'vertical' : 'none',
  });

  const onFocus  = (e) => { e.target.style.borderColor = 'var(--emerald)'; e.target.style.boxShadow = '0 0 0 3px var(--emerald-dim)'; };
  const onBlur   = (field) => (e) => { e.target.style.borderColor = errors[field] ? '#e57373' : 'var(--border)'; e.target.style.boxShadow = 'none'; };

  return (
    <section id="contact" ref={ref} style={{
      padding: 'var(--section-pad) 0',
      background: 'var(--void)',
      borderTop: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse at top, rgba(45,212,160,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Big decorative number */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '-5%', left: '-4%',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(180px,22vw,360px)',
        fontWeight: 900, color: 'transparent',
        WebkitTextStroke: '1px rgba(45,212,160,0.04)',
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>05</div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '6rem',
          alignItems: 'start',
        }} className="contact-grid">

          {/* ── Left ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="section-eyebrow">05 — Contact</p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}>
                Travaillons
                <br />
                <em style={{ color: 'var(--emerald)', fontStyle: 'italic', fontWeight: 300 }}>ensemble</em>
              </h2>

              <div className="divider" />

              <p style={{ color: 'var(--fog)', lineHeight: 1.9, marginBottom: '3rem', marginTop: '1.25rem', fontSize: '0.97rem' }}>
                Vous avez un projet en tête ? Une idée à concrétiser ? Je suis disponible pour collaborer sur des projets passionnants.
              </p>

              {[
                { icon: Mail,  label: 'Email',        value: 'fatimatabintaniang8@gmail.com' },
                { icon: Phone, label: 'Téléphone',    value: '+221 76 729 82 66' },
                { icon: MapPin,label: 'Localisation', value: 'Dakar, Sénégal' },
              ].map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
                >
                  <div style={{
                    width: '44px', height: '44px',
                    border: '1px solid var(--border-mid)',
                    borderRadius: '6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--emerald)',
                    background: 'var(--emerald-dim)',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: 'var(--mist)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      {label}
                    </div>
                    <div style={{ color: 'var(--white)', fontSize: '0.95rem' }}>{value}</div>
                  </div>
                </motion.div>
              ))}

              {/* Availability badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.5rem 1.1rem',
                border: '1px solid var(--border-mid)',
                borderRadius: '100px',
                background: 'var(--emerald-dim)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--emerald)',
                letterSpacing: '0.08em',
                marginTop: '0.5rem',
              }}>
                <span style={{ width: '7px', height: '7px', background: 'var(--emerald)', borderRadius: '50%', animation: 'pulse 2s infinite', display: 'inline-block' }} />
                Disponible — réponse sous 24h
              </div>
            </motion.div>
          </div>

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '4rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border-mid)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <CheckCircle size={52} style={{ color: 'var(--emerald)', margin: '0 auto 1.5rem', display: 'block' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--white)', marginBottom: '1rem' }}>
                  Message envoyé !
                </h3>
                <p style={{ color: 'var(--fog)', marginBottom: '2rem' }}>
                  Je vous répondrai dans les plus brefs délais.
                </p>
                <button onClick={() => setSent(false)} className="btn-outline">
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                padding: '2.5rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, var(--emerald), var(--copper), transparent)',
                }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: 'var(--mist)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Votre nom"
                      style={inputStyle('name')}
                      onFocus={onFocus}
                      onBlur={onBlur('name')}
                    />
                    {errors.name && <p style={{ color: '#e57373', fontSize: '0.74rem', marginTop: '0.3rem' }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: 'var(--mist)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="votre@email.com"
                      style={inputStyle('email')}
                      onFocus={onFocus}
                      onBlur={onBlur('email')}
                    />
                    {errors.email && <p style={{ color: '#e57373', fontSize: '0.74rem', marginTop: '0.3rem' }}>{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: 'var(--mist)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Sujet
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="Objet de votre message"
                    style={inputStyle('subject')}
                    onFocus={onFocus}
                    onBlur={onBlur('subject')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: 'var(--mist)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Message *
                  </label>
                  <textarea
                    rows={6}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Décrivez votre projet..."
                    style={{ ...inputStyle('message'), resize: 'vertical' }}
                    onFocus={onFocus}
                    onBlur={onBlur('message')}
                  />
                  {errors.message && <p style={{ color: '#e57373', fontSize: '0.74rem', marginTop: '0.3rem' }}>{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
                >
                  {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                  <Send size={15} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(45,212,160,0.4)} 50%{opacity:0.7;box-shadow:0 0 0 6px rgba(45,212,160,0)} }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
