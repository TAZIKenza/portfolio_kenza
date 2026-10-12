import { useEffect, useRef, useState } from 'react'
import {
  profile, education, experience, projects, skills, certifications,
} from './data.js'

const POSES = ['center', 'left', 'right', 'up', 'down', 'up-left', 'up-right', 'down-left', 'down-right']

// 8 secteurs de 45° autour du visage ; tout près du visage → de face
function pickPose(dx, dy) {
  if (Math.hypot(dx, dy) < 120) return 'center'
  const a = (Math.atan2(dy, dx) * 180) / Math.PI // 0 = droite, 90 = bas
  if (a >= -22.5 && a < 22.5) return 'right'
  if (a >= 22.5 && a < 67.5) return 'down-right'
  if (a >= 67.5 && a < 112.5) return 'down'
  if (a >= 112.5 && a < 157.5) return 'down-left'
  if (a >= 157.5 || a < -157.5) return 'left'
  if (a >= -157.5 && a < -112.5) return 'up-left'
  if (a >= -112.5 && a < -67.5) return 'up'
  return 'up-right'
}

const BUBBLES = {
  center: 'Hi, I\u2019m right here!',
  left: 'Anyone on the left?',
  right: 'I see you on the right!',
  up: 'Looking at the menu?',
  down: 'My work is down there.',
  'up-left': 'Looking for the menu?',
  'up-right': 'Looking for the menu?',
  'down-left': 'Heading to my work?',
  'down-right': 'Heading to my work?',
}

function Avatar() {
  const box = useRef(null)
  const tilt = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const [pose, setPose] = useState({ cur: 'center', prev: 'center' })
  const [moved, setMoved] = useState(false)

  useEffect(() => {
    POSES.forEach((n) => {
      const im = new Image()
      im.src = `/avatar/${n}.webp`
      im.decode?.().catch(() => {})
    })

    const onMove = (e) => {
      const r = box.current.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height * 0.38 // niveau des yeux
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      target.current = {
        x: Math.max(-1, Math.min(1, dx / (window.innerWidth / 2))),
        y: Math.max(-1, Math.min(1, dy / (window.innerHeight / 2))),
      }
      const next = pickPose(dx, dy)
      setMoved(true)
      setPose((p) => (p.cur === next ? p : { cur: next, prev: p.cur }))
    }
    window.addEventListener('pointermove', onMove)

    // petit mouvement doux de tout le buste vers le curseur
    let raf, x = 0, y = 0
    const loop = () => {
      x += (target.current.x - x) * 0.08
      y += (target.current.y - y) * 0.08
      if (tilt.current) {
        tilt.current.style.transform =
          `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 3}deg) translate(${x * 10}px, ${y * 6}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="avatar-wrap" ref={box}>
      <div className="bubble" key={moved ? pose.cur : 'idle'}>
        {moved ? BUBBLES[pose.cur] : 'Move your cursor to call me'}
      </div>
      <div className="avatar" ref={tilt}>
        {POSES.map((n) => (
          <img
            key={n}
            src={`/avatar/${n}.webp`}
            alt={n === 'center' ? `Avatar of ${profile.firstName}` : ''}
            fetchPriority={n === 'center' ? 'high' : undefined}
            decoding="async"
            className={n === pose.cur ? 'cur' : n === pose.prev ? 'prev' : ''}
            draggable="false"
          />
        ))}
      </div>
    </div>
  )
}

const ICONS = {
  ai: <path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />,
  dev: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />,
  tools: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />,
  iot: <path d="M9 7h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />,
  doc: <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6" />,
  briefcase: <path d="M3 8h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zM8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />,
  pin: <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
  globe: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />,
}

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  )
}

const SECTIONS = [
  ['education', 'Education'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['certifications', 'Certifications'],
  ['contact', 'Contact'],
]

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.4
      let current = ''
      SECTIONS.forEach(([id]) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      })
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) current = 'contact'
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return active
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      className={`to-top ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
function EmailMenu() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)
  const to = profile.email
  const subject = encodeURIComponent('Internship opportunity')

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(to)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  return (
    <div className="email-menu" ref={ref}>
      <button className="btn dark" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        Email me
      </button>
      {open && (
        <div className="menu-pop">
          <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}`} target="_blank" rel="noreferrer">Gmail</a>
          <a href={`https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}`} target="_blank" rel="noreferrer">Outlook</a>
          <a href={`mailto:${to}?subject=${subject}`}>Default mail app</a>
          <button onClick={copy}>{copied ? 'Copied!' : `Copy ${to}`}</button>
        </div>
      )}
    </div>
  )
}
export default function App() {
  const { firstName, lastName } = profile
  const active = useActiveSection()
    const navRef = useRef(null)
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const el = nav.querySelector('a.on')
    const left = el ? el.offsetLeft - (nav.clientWidth - el.offsetWidth) / 2 : 0
    nav.scrollTo({ left, behavior: 'smooth' })
  }, [active])
  return (
    <>
            <nav className="nav" ref={navRef}>
        {SECTIONS.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>
        ))}
      </nav>

      <header className="hero">
        <div className="blob" />
        <div className="hero-text">
          <p className="hi">Hi, I'm</p>
          <h1>
            <span>{firstName}</span>
            <em>{lastName}</em>
          </h1>
          <h2>{profile.title}</h2>
          <p className="pill">{profile.status}</p>
          <p className="intro">{profile.intro}</p>
          <div className="btns">
            <a className="btn dark" href="#projects">View my projects</a>
            <a className="btn line" href="#contact">Get in touch</a>
          </div>
        </div>
        <Avatar />
      </header>

      <section id="education" className="section">
        <h3>Education</h3>
        <div className="list">
          {education.map((e) => (
            <article key={e.title} className="item">
              <div className="row">
                <h4>{e.title}</h4>
                <span className="date">{e.date}</span>
              </div>
              <p className="sub">{e.place}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="section">
        <h3>Experience</h3>
        <div className="list">
          {experience.map((e) => (
            <article key={e.role + e.date} className="item">
              <div className="row">
                <h4>{e.role}</h4>
                <span className="date">{e.date}</span>
              </div>
              <p className="sub">{e.company}</p>
              <p>{e.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <h3>Projects</h3>
        <div className="cards">
          {projects.map((p) => (
            <article key={p.name} className="card">
              <div className="row">
                <h4>{p.name}</h4>
                <span className="date">{p.year}</span>
              </div>
              <div className="tags small">
                {p.stack.map((t) => <span key={t}>{t}</span>)}
              </div>
              <p>{p.text}</p>
              <div className="card-btns">
                {p.github && (
                  
              
                  <a className="mini dark" href={p.github} target="_blank" rel="noreferrer">
                  View on GitHub →
                  </a>
                )}
                {p.demo && (
                  <a className="mini line" href={p.demo} target="_blank" rel="noreferrer">Live demo →</a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section">
        <h3>Skills</h3>
        <div className="skills">
          {skills.map((g) => (
            <div key={g.group} className="skill-card">
              <div className="skill-head">
                <span className="ico"><Icon name={g.icon} /></span>
                <h4>{g.group}</h4>
              </div>
              <div className="chips">
                {g.items.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
        
      </section>

      <section id="certifications" className="section">
        <h3>Certifications</h3>
        <div className="certs">
          {certifications.map((c) => (
            <article key={c.name} className="cert">
              <div className="cert-logo">
        {c.logo ? <img src={c.logo} alt={`${c.issuer} logo`} /> : <span>{c.issuer[0]}</span>}
</div>
              <div className="cert-body">
                <h4>{c.name}</h4>
                <p className="sub">{c.issuer} · {c.year}</p>
                <div className="card-btns">
                  {c.link && (
                    <a className="mini dark" href={c.link} target="_blank" rel="noreferrer">View credential →</a>
                  )}
                  {c.image && (
                    <a className="mini line" href={c.image} target="_blank" rel="noreferrer">View certificate</a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <div className="contact">
          <div className="contact-main">
            <p className="hi">Let's talk</p>
            <h3>Let's build something intelligent together.</h3>
            <p className="lead">
              I'm looking for an end-of-studies internship in 2027 in data science and AI.
              Based in {profile.location}.
            </p>
            <div className="btns">
              <EmailMenu />
              <a className="btn line" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="btn line" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
          <div className="cv-card">
            <h4>Quick facts</h4>
            <ul className="facts">
              <li>
                <span className="ico"><Icon name="briefcase" /></span>
                <div><b>Looking for</b><p>End-of-studies internship · 2027</p></div>
              </li>
              <li>
                <span className="ico"><Icon name="pin" /></span>
                <div><b>Based in</b><p>{profile.location}</p></div>
              </li>
             
            </ul>
          </div>
        </div>
      </section>
      <BackToTop />
      <footer>© {new Date().getFullYear()} {firstName} {lastName}</footer>
    </>
  )
}
