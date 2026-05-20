import { useEffect, useState, useRef } from 'react';
import './index.css';

/* ===== Scroll Reveal Hook ===== */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.reveal-stagger').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ===== Animated Counter Hook ===== */
function useCounter(target, duration = 2000, shouldStart) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let start = 0;
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, shouldStart]);
  return count;
}

/* ===== Parallax Hook ===== */
function useParallax(speed = 0.3) {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = (window.innerHeight - rect.top) * speed;
      ref.current.style.transform = `translateY(${scrolled * 0.05}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);
  return ref;
}

/* ===== Cursor Glow ===== */
function CursorGlow() {
  useEffect(() => {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
    const move = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', move);
    const animate = () => {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      glow.style.transform = `translate(${glowX}px, ${glowY}px)`;
      requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener('mousemove', move); glow.remove(); };
  }, []);
  return null;
}

/* ===== Scroll Progress Bar ===== */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight = h.scrollHeight - h.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

/* ===== Back to Top Button ===== */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`back-to-top${show ? ' show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 15l6-6 6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

/* ===== NAVBAR ===== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container">
        <a href="#" className="nav-logo">
          <span className="logo-text">BANGMETRIC</span>
          <span className="logo-mark">C</span>
        </a>
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          <a href="#intro" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#build" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#results" onClick={() => setMenuOpen(false)}>Industries</a>
          <a href="#jumpstarts" onClick={() => setMenuOpen(false)}>Resources</a>
          <a href="#why" onClick={() => setMenuOpen(false)}>Careers</a>
          <span className="nav-dropdown">Lorem Ipsum <span className="nav-chevron">▾</span></span>
        </div>
        <a href="#cta" className="nav-cta">
          Get In Touch
          <span className="nav-cta-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </a>
        <div className={`hamburger${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>
  );
}

/* ===== HERO ===== */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-orbs">
          <span className="orb orb-1"></span>
          <span className="orb orb-2"></span>
          <span className="orb orb-3"></span>
        </div>
        <h1>IT Service Management</h1>
        <div className="hero-shine"></div>
      </div>
    </section>
  );
}

/* ===== INTRO ===== */
function Intro() {
  return (
    <section className="intro section-pad" id="intro">
      <div className="container">
        <div className="intro-left reveal-left">
          <h2>Designed from the<br />employee and<br />business back.<br />Built on <span>ServiceNow</span></h2>
        </div>
        <div className="intro-right reveal-right">
          <p>Most organizations don't have an ITSM tool problem; they have a flow problem. Ticket-centric thinking, siloed processes, and surface-level metrics create noise instead of results. At BANGMETRIC, we design IT services from the employee and business back, then bring that design to life on ServiceNow ITSM.</p>
          <p>We focus on improving flow, reducing friction, and resolving issues, not just routing them. ServiceNow is the platform we build on. Experience-led, outcome-driven design is what makes it work in the real world.</p>
        </div>
      </div>
    </section>
  );
}

/* ===== JUMPSTARTS ===== */
function Jumpstarts() {
  return (
    <section className="jumpstarts section-pad" id="jumpstarts">
      <div className="container">
        <div className="jumpstarts-header">
          <div className="left reveal">
            <h2>Our ITSM Jumpstarts</h2>
            <p className="jumpstarts-sub">(Fast, Without the Compromise)</p>
            <p className="jumpstarts-desc">They're structured, designled pathways that keep momentum high and quality intact.</p>
          </div>
          <div className="right reveal-scale">
            <img src="/assets/Rectangle 410 (2).png" alt="3D Crystal" />
          </div>
        </div>
        <div className="jumpstarts-cards">
          <div className="jump-card reveal">
            <h3>45-Day ITSM</h3>
            <p>A clean, effective baseline that actually improves flow:<br />Incident, Request, core Catalog, Knowledge, practical SLAs,<br />Major Incident basics, and a portal that reduces effort.<br /><br /><strong>Fast to value. Built right the first time.</strong></p>
          </div>
          <div className="jump-card alt reveal" style={{ transitionDelay: '.15s' }}>
            <h3>60-Day ITSM</h3>
            <p>For teams ready to go beyond the basics:<br />Problem &amp; Change, Service Operations Workspace, Virtual Agent,<br />and a rightsized CMDB/CSDM</p>
          </div>
        </div>
        <div className="download-wrap">
          <a href="#cta" className="download-btn">Download Now</a>
        </div>
      </div>
    </section>
  );
}

/* ===== THINKS DIFFERENTLY ===== */
function ThinksDifferently() {
  return (
    <section className="thinks section-pad" id="thinks">
      <div className="container">
        <h2 className="reveal">How BANGMETRIC Thinks Differently</h2>

        <div className="thinks-diagram-container reveal-scale" style={{ transitionDelay: '0.1s' }}>
          <div className="thinks-bg-glow"></div>
          <div className="thinks-line-svg">
            <svg width="100%" height="100%" viewBox="0 0 1180 430" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.4"/>
                  <stop offset="50%" stopColor="#A491EB" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.4"/>
                </linearGradient>
              </defs>
              <path className="thinks-path" d="M 80 120 L 340 310 L 590 120 L 840 310 L 1100 120" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="think-node" style={{ left: '6.7%', top: '120px' }}>
            <div className="think-dot"></div>
            <div className="think-pulse"></div>
            <div className="think-text top-text">
              <p className="think-content"><strong>Value streams<br />over ticket queues</strong></p>
            </div>
          </div>

          <div className="think-node" style={{ left: '28.8%', top: '310px' }}>
            <div className="think-dot"></div>
            <div className="think-pulse"></div>
            <div className="think-text bottom-text">
              <p className="think-content"><strong>Rightsized, right<br />now</strong> (what you need today,<br />expandable tomorrow)</p>
            </div>
          </div>

          <div className="think-node" style={{ left: '50%', top: '120px' }}>
            <div className="think-dot"></div>
            <div className="think-pulse"></div>
            <div className="think-text top-text">
              <p className="think-content"><strong>Flow metrics over vanity<br />metrics</strong> (MTTD/MTTR, FCR,<br />change failure rate, employee<br />effort)</p>
            </div>
          </div>

          <div className="think-node" style={{ left: '71.2%', top: '310px' }}>
            <div className="think-dot"></div>
            <div className="think-pulse"></div>
            <div className="think-text bottom-text">
              <p className="think-content"><strong>AI with intent</strong> (triage,<br />insight, knowledge,<br />change risk)</p>
            </div>
          </div>

          <div className="think-node" style={{ left: '93.2%', top: '120px' }}>
            <div className="think-dot"></div>
            <div className="think-pulse"></div>
            <div className="think-text top-text">
              <p className="think-content"><strong>Resolution over<br />SLA theatre</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== WHAT WE BUILD ===== */
function WhatWeBuild() {
  return (
    <section className="build section-pad" id="build">
      <div className="build-ambient">
        <span className="ambient-orb a-orb-1"></span>
        <span className="ambient-orb a-orb-2"></span>
      </div>
      <div className="container">
        <h2 className="reveal">What We Build with ServiceNow ITSM</h2>
        <div className="build-cards">

          <div className="build-card reveal-left">
            <div className="build-card-img">
              <img src="https://res.cloudinary.com/dmhabztbf/image/upload/v1779286177/WhatsApp_Image_2026-05-20_at_5.27.28_PM_vkmtjd.jpg" alt="Core ITSM" />
            </div>
            <div className="build-card-text">
              <h3>Core ITSM, done deliberately:</h3>
              <ul>
                <li>Incident, Request, Problem, Change</li>
                <li>Service Catalog &amp; Employee-friendly Portal</li>
                <li>Major Incident, OnCall, clean comms &amp; roles</li>
                <li>Knowledge that's actually used (not shelfware)</li>
                <li>Service Operations Workspace for cross-team visibility</li>
                <li>CMDB/CSDM, rightsized to support change and impact analysis (no bloat)</li>
              </ul>
            </div>
          </div>

          <div className="build-card reveal-right">
            <div className="build-card-img">
              <img src="https://res.cloudinary.com/dmhabztbf/image/upload/v1779286177/WhatsApp_Image_2026-05-20_at_5.29.50_PM_ckehbf.jpg" alt="Intelligence &amp; Automation" />
            </div>
            <div className="build-card-text">
              <h3>Intelligence &amp; Automation, applied where it helps:</h3>
              <ul>
                <li>Predictive assignment &amp; classification</li>
                <li>GenAI for summaries, KB drafts, and guided resolution notes</li>
                <li>Change risk scoring and better approvals</li>
                <li>Signals into incident and noise reduction (where ITOM/AIOps is in scope)</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ===== RESULTS ===== */
function ResultCard({ icon, stat, desc, delay }) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.3 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="result-card reveal" ref={cardRef} style={{ transitionDelay: `${delay}s` }}>
      <div className="result-icon-wrap">
        <img src={icon} alt={stat} />
      </div>
      <h4 className={visible ? 'animate-in' : ''}>{stat}</h4>
      <p>{desc}</p>
    </div>
  );
}
function Results() {
  const items = [
    { icon: '/assets/Icon-for-web 1 (1).png', stat: '20–40%', desc: 'faster MTTR' },
    { icon: '/assets/Icon-for-web 2 (1).png', stat: '15–30%', desc: 'higher first contact resolution' },
    { icon: '/assets/Icon-for-web. 1 (2).png', stat: '25%+ analyst', desc: 'productivity improvement' },
    { icon: '/assets/Icon-for-web..... 1 (1).png', stat: 'Fewer emergency', desc: 'changes & lower change failure rate' },
    { icon: '/assets/Icon-for-web1 1 (1).png', stat: 'Reduced cost per-', desc: 'ticket through clarity and automation' },
  ];
  return (
    <section className="results section-pad" id="results">
      <div className="container">
        <h2 className="reveal">The Results Our Clients See</h2>
        <p className="subtitle reveal">When ITSM is designed properly, the numbers move</p>
        <div className="results-grid">
          {items.map((item, i) => (
            <ResultCard key={i} {...item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== QUOTE ===== */
function Quote() {
  return (
    <section className="quote-section reveal">
      <div className="container">
        <blockquote>Not because we added more features<br />but because we removed friction.</blockquote>
      </div>
    </section>
  );
}

/* ===== BANGMETRIC WAY ===== */
function BangmetricWay() {
  const steps = [
    { label: ['Discover', '& Design'], desc: 'Map value streams, locate friction, align on outcomes and metrics that matter.', highlight: true },
    { label: ['Automate', 'What', 'Matters'], desc: 'Apply AI, Virtual Agent, and automation where they remove effort and add clarity.' },
    { label: ['Build for', 'Speed'], desc: 'Configure ITSM with intent—every field, workflow, and role supports resolution and flow.' },
    { label: ['Improve', 'Continuously'], desc: 'Operate with real signals (MTTR, FCR, change failure rate). Iterate without chaos.' },
  ];
  return (
    <section className="bm-way section-pad" id="bm-way">
      <div className="container">
        <h2 className="reveal">The BANGMETRIC Way</h2>
        <p className="subtitle reveal">When ITSM is designed properly, the numbers move</p>
        <div className="way-grid">
          {steps.map((s, i) => (
            <div className={`way-card reveal${s.highlight ? ' highlight' : ''}`} key={i} style={{ transitionDelay: `${i * .1}s` }}>
              <div className="way-card-dot"></div>
              <div className="way-card-label">
                {s.label.map((line, idx) => (
                  <div key={idx} className="label-line">{line}</div>
                ))}
              </div>
              <div className="way-card-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== WHY CHOOSE ===== */
function WhyChoose() {
  const points = [
    { title: 'Privately owned', desc: 'real accountability, no investor pressure, no bloated teams' },
    { title: 'Midmarket specialists', desc: 'world class capability without enterprise bloat' },
    { title: 'Out come obsessed', desc: 'we move MTTR, FCR, and change quality, not just sliders on a dashboard' },
    { title: 'End to end', desc: 'strategy, design, build, AI, optimisation. We own outcomes—not hours.' },
  ];
  return (
    <section className="why-choose section-pad" id="why">
      <div className="container">
        <div className="why-left reveal-left">
          <h2>Why Organizations<br />Choose BANGMETRIC</h2>
          <p>You're not looking for another implementer.</p>
          <img className="crystal-img" src="/assets/Rectangle 410 (3).png" alt="3D Crystal" />
        </div>
        <div className="why-right reveal-right">
          <h3>You're looking for a thinking partner.</h3>
          <div className="why-list">
            {points.map((pt, i) => (
              <div className="why-item" key={i}>
                <div className="why-dot"></div>
                <div className="why-item-text">
                  <p><strong>{pt.title}</strong> &mdash; {pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== CTA SECTION ===== */
function CTASection() {
  return (
    <section className="cta-section" id="cta">
      <div className="cta-inner">
        <img className="cta-bg-img" src="/assets/Group 161 (1).png" alt="" aria-hidden="true" />
        <div className="cta-content reveal-scale">
          <p>Read Customer Success Stories &amp; News on</p>
          <h2>IT Service Management</h2>
          <a href="#" className="cta-btn">Know More</a>
        </div>
      </div>
    </section>
  );
}

/* ===== FOOTER ===== */
function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="nav-logo footer-logo">
              <span className="logo-text">BANGMETRIC</span>
              <span className="logo-mark footer-mark">C</span>
            </a>
            <p className="footer-tagline">Elevate, Innovate, Dominate<br />With a <span className="bang">BANG!</span></p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>DISTURBA</h4>
              <a href="#">Job Coaching</a>
              <a href="#">Without any input</a>
              <a href="#">Nothing Suspicious</a>
            </div>
            <div className="footer-col">
              <h4>DISTURBAM</h4>
              <a href="#">Lorem Ipsum</a>
              <a href="#">Typesetting industry</a>
              <a href="#">Standard Dummy</a>
            </div>
            <div className="footer-col">
              <h4>DISTINGUISH</h4>
              <div className="contact-item">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" /></svg>
                <span>+8 123-476-924</span>
              </div>
              <div className="contact-item">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                <span>info.xyz@gmail.com</span>
              </div>
              <input type="email" placeholder="Email:" className="footer-email" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===== APP ===== */
export default function App() {
  useReveal();
  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Intro />
      <Jumpstarts />
      <ThinksDifferently />
      <WhatWeBuild />
      <Results />
      <Quote />
      <BangmetricWay />
      <WhyChoose />
      <CTASection />
      <Footer />
      <BackToTop />
    </>
  );
}