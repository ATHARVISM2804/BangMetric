import { useEffect, useState } from 'react';
import './index.css';

/* ===== Scroll Reveal Hook ===== */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
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
        <h1>IT Service Management</h1>
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
          <div className="thinks-line-svg">
            <svg width="100%" height="100%" viewBox="0 0 1180 430" preserveAspectRatio="none">
              <path d="M 80 120 L 340 310 L 590 120 L 840 310 L 1100 120" fill="none" stroke="#C4B5FD" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="think-node" style={{ left: '6.7%', top: '120px' }}>
            <div className="think-dot"></div>
            <div className="think-text top-text">
              <p className="think-content"><strong>Value streams<br />over ticket queues</strong></p>
            </div>
          </div>

          <div className="think-node" style={{ left: '28.8%', top: '310px' }}>
            <div className="think-dot"></div>
            <div className="think-text bottom-text">
              <p className="think-content"><strong>Rightsized, right<br />now</strong> (what you need today,<br />expandable tomorrow)</p>
            </div>
          </div>

          <div className="think-node" style={{ left: '50%', top: '120px' }}>
            <div className="think-dot"></div>
            <div className="think-text top-text">
              <p className="think-content"><strong>Flow metrics over vanity<br />metrics</strong> (MTTD/MTTR, FCR,<br />change failure rate, employee<br />effort)</p>
            </div>
          </div>

          <div className="think-node" style={{ left: '71.2%', top: '310px' }}>
            <div className="think-dot"></div>
            <div className="think-text bottom-text">
              <p className="think-content"><strong>AI with intent</strong> (triage,<br />insight, knowledge,<br />change risk)</p>
            </div>
          </div>

          <div className="think-node" style={{ left: '93.2%', top: '120px' }}>
            <div className="think-dot"></div>
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
      <div className="container">
        <h2 className="reveal">What We Build with ServiceNow ITSM</h2>
        <div className="build-cards">

          <div className="build-card reveal-left">
            <div className="build-card-img">
              <img src="/assets/Vector 45.png" alt="Core ITSM" />
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
              <img src="/assets/Vector 44.png" alt="Intelligence &amp; Automation" />
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
            <div className="result-card reveal" key={i} style={{ transitionDelay: `${i * .1}s` }}>
              <img src={item.icon} alt={item.stat} />
              <h4>{item.stat}</h4>
              <p>{item.desc}</p>
            </div>
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
    </>
  );
}