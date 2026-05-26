import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './ProjectPage.module.css'

const EXPO = [0.16, 1, 0.3, 1]

const PROJECTS = {
  telemedpro: {
    title: 'Telemedpro',
    subtitle: 'Healthcare Platform to improve patient care',
    year: '2024',
    role: 'Lead UX Designer',
    duration: '6 months',
    team: 'Solo + Engineering',
    color: '#C3F6FF',
    accent: '#00bcd4',
    tags: ['Healthcare UX', 'Telemedicine', 'Mobile', 'Web'],
    overview:
      'A comprehensive telemedicine platform designed to connect patients with healthcare providers, reducing wait times and improving health outcomes through intuitive, empathy-first design.',
    problem:
      'Patients in tier-2 cities struggled to access quality healthcare due to geographic barriers, long wait times, and confusing existing apps. Providers needed a tool that fit naturally into their clinical workflows without adding cognitive load.',
    process: [
      { phase: '01 Discover', desc: 'Conducted 20+ user interviews with patients and doctors. Mapped existing journeys, identified friction points around booking, waiting, and follow-ups.' },
      { phase: '02 Define', desc: 'Synthesized research into empathy maps and "How Might We" statements. Prioritized reducing the booking-to-consultation time and simplifying medication tracking.' },
      { phase: '03 Design', desc: 'Created 80+ wireframes, 3 rounds of iterations. Built an accessible component library. Ran usability testing with 8 participants per round.' },
      { phase: '04 Deliver', desc: 'Shipped the design system, handed off to engineering with annotated specs. Post-launch: 40% reduction in drop-off during booking flow.' },
    ],
    outcomes: [
      { metric: '40%', label: 'Drop-off reduction' },
      { metric: '20+', label: 'Research participants' },
      { metric: '80+', label: 'Screens designed' },
      { metric: '3×', label: 'Testing rounds' },
    ],
    learnings:
      'Healthcare UX demands a delicate balance: reassuring patients while empowering providers. Every design decision must account for high-stress moments. This project sharpened my instinct for "calm design" — interfaces that work when users most need clarity.',
  },
  medsync: {
    title: 'MedSync',
    subtitle: 'Appointment scheduling & clinic management',
    year: '2023',
    role: 'UX Designer',
    duration: '4 months',
    team: 'Product team of 4',
    color: '#FFE4F3',
    accent: '#ea5db4',
    tags: ['Product Design', 'Healthcare', 'SaaS', 'B2B'],
    overview:
      'Streamlined booking and patient management for multi-specialty clinics, reducing no-shows by 40% through smart reminders, waitlist intelligence, and an intuitive scheduling flow.',
    problem:
      'Clinics relied on phone calls and paper registers for bookings. Patients forgot appointments. Staff spent 2+ hours daily on manual scheduling. The existing digital tool had a 70% abandonment rate during setup.',
    process: [
      { phase: '01 Discover', desc: 'Shadowed 5 clinic receptionists for a full day each. Ran contextual inquiry to understand real scheduling chaos — double bookings, last-minute cancellations, walk-ins.' },
      { phase: '02 Define', desc: 'Created service blueprints mapping frontstage patient experience to backstage clinic operations. Identified 12 critical pain points to address.' },
      { phase: '03 Design', desc: 'Designed a drag-and-drop calendar, smart waitlist, automated reminders, and a patient self-booking portal. Prioritised speed — a booking should take under 30 seconds.' },
      { phase: '04 Deliver', desc: 'Launched MVP in 3 clinics. Collected 30-day data: 40% fewer no-shows, 60% reduction in manual scheduling time.' },
    ],
    outcomes: [
      { metric: '40%', label: 'Fewer no-shows' },
      { metric: '60%', label: 'Less manual work' },
      { metric: '30s', label: 'Target booking time' },
      { metric: '12', label: 'Pain points resolved' },
    ],
    learnings:
      'The real users were receptionists, not patients. Designing for the stressed, multitasking frontline worker fundamentally changed my approach. Speed and error recovery became the north star — not aesthetic polish.',
  },
  healthvault: {
    title: 'HealthVault',
    subtitle: 'Personal health records & monitoring dashboard',
    year: '2023',
    role: 'Product UX Designer',
    duration: '3 months',
    team: 'Solo',
    color: '#FFF3C4',
    accent: '#f59e0b',
    tags: ['Dashboard', 'Data UX', 'Patient-Centred', 'Mobile'],
    overview:
      'A patient-centred dashboard empowering individuals to own their health data, track vitals over time, and share records securely with their care providers in one place.',
    problem:
      'Patients received test results from different labs in different formats, stored in different apps or paper. When visiting a new doctor, they had no consolidated record. Health data felt alien and overwhelming.',
    process: [
      { phase: '01 Discover', desc: 'Interviewed 15 patients managing chronic conditions. Key insight: people wanted to "feel in control" of their health, not just see numbers. Emotion before information.' },
      { phase: '02 Define', desc: 'Designed around three core jobs-to-be-done: understand my health, share with my doctor, and track my progress. Everything else was secondary.' },
      { phase: '03 Design', desc: 'Created a visual timeline of health events, trend graphs for vitals, secure sharing with QR codes, and plain-language interpretations of test results.' },
      { phase: '04 Deliver', desc: 'Prototype tested with 8 participants. 7/8 could successfully import a record and share it within 2 minutes without guidance.' },
    ],
    outcomes: [
      { metric: '7/8', label: 'Task success rate' },
      { metric: '2min', label: 'To share records' },
      { metric: '15+', label: 'Research interviews' },
      { metric: '3', label: 'Core user jobs served' },
    ],
    learnings:
      'Health data is deeply personal. People don\'t want a medical database — they want a story of their health. Leading with empathy and narrative over raw data was the pivotal design decision here.',
  },
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = PROJECTS[slug]

  if (!project) return <Navigate to="/" replace />

  return (
    <div className={styles.page}>

      {/* ── Back navigation ── */}
      <nav className={styles.backNav}>
        <Link to="/" className={styles.backBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/>
          </svg>
          Back to work
        </Link>
      </nav>

      {/* ── Hero ── */}
      <motion.div
        className={styles.hero}
        style={{ backgroundColor: project.color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.heroInner}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EXPO }}
          >
            <div className={styles.heroPills}>
              {project.tags.map(t => (
                <span key={t} className={styles.heroPill}>{t}</span>
              ))}
            </div>
            <h1 className={styles.heroTitle}>{project.title}</h1>
            <p className={styles.heroSub}>{project.subtitle}</p>
          </motion.div>

          <motion.div
            className={styles.heroMeta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: EXPO }}
          >
            {[
              { label: 'Year', value: project.year },
              { label: 'Role', value: project.role },
              { label: 'Duration', value: project.duration },
              { label: 'Team', value: project.team },
            ].map(({ label, value }) => (
              <div key={label} className={styles.metaItem}>
                <span className={styles.metaLabel}>{label}</span>
                <span className={styles.metaValue}>{value}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative accent bar */}
        <div className={styles.accentBar} style={{ background: project.accent }} />
      </motion.div>

      {/* ── Content ── */}
      <div className={styles.content}>

        {/* Overview */}
        <Section delay={0}>
          <h2 className={styles.sectionLabel}>Overview</h2>
          <p className={styles.overview}>{project.overview}</p>
        </Section>

        {/* Problem */}
        <Section delay={0.1}>
          <h2 className={styles.sectionLabel}>The Problem</h2>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon} style={{ background: project.accent }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r="1" fill="white" stroke="none"/>
              </svg>
            </div>
            <p className={styles.problemText}>{project.problem}</p>
          </div>
        </Section>

        {/* Process */}
        <Section delay={0.15}>
          <h2 className={styles.sectionLabel}>The Process</h2>
          <div className={styles.processGrid}>
            {project.process.map((step, i) => (
              <motion.div
                key={step.phase}
                className={styles.processCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EXPO }}
              >
                <div className={styles.processNum} style={{ color: project.accent }}>
                  {step.phase.split(' ')[0]}
                </div>
                <h3 className={styles.processPhase}>{step.phase.split(' ').slice(1).join(' ')}</h3>
                <p className={styles.processDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Placeholder screens */}
        <Section delay={0.2}>
          <h2 className={styles.sectionLabel}>Design Screens</h2>
          <div className={styles.screensGrid}>
            {['Main Flow', 'Dashboard', 'Detail View', 'Mobile'].map((label, i) => (
              <motion.div
                key={label}
                className={styles.screenPlaceholder}
                style={{ background: project.color }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: EXPO }}
              >
                <span className={styles.screenEmoji}>🖥️</span>
                <span className={styles.screenLabel}>{label}</span>
                <span className={styles.screenNote}>Screens coming soon</span>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Outcomes */}
        <Section delay={0.25}>
          <h2 className={styles.sectionLabel}>Outcomes</h2>
          <div className={styles.outcomes}>
            {project.outcomes.map(({ metric, label }) => (
              <div key={label} className={styles.outcome}>
                <span className={styles.outMetric} style={{ color: project.accent }}>{metric}</span>
                <span className={styles.outLabel}>{label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Learnings */}
        <Section delay={0.3}>
          <h2 className={styles.sectionLabel}>What I Learned</h2>
          <blockquote className={styles.learning}>
            "{project.learnings}"
          </blockquote>
        </Section>

        {/* Navigation */}
        <div className={styles.bottomNav}>
          <Link to="/" className={styles.navBack}>
            ← Back to all work
          </Link>
          <Link to="/#contact" className={styles.navContact}>
            Let's work together →
          </Link>
        </div>

      </div>
    </div>
  )
}

function Section({ children, delay = 0 }) {
  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.7, ease: EXPO, delay }}
    >
      {children}
    </motion.section>
  )
}
