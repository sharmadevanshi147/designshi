import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './GoodreadsCaseStudy.module.css'

const EXPO = [0.16, 1, 0.3, 1]

/* ── Project metadata ── */
const META = [
  { label: 'Role', value: 'UX Designer' },
  { label: 'Duration', value: '8 Weeks' },
  { label: 'Tools', value: 'Figma, FigJam' },
  { label: 'Platform', value: 'Mobile App' },
]

/* ── Competitive analysis ── */
const COMPETITORS = [
  { name: 'StoryGraph', color: '#C4B5FD', textColor: '#3B1F7E', desc: 'AI-powered recommendations and detailed reading stats, but a small community limits discovery.' },
  { name: 'Libby', color: '#6EE7B7', textColor: '#064E3B', desc: 'Free library integration with clean UI. Lacks social features and reading progress tracking.' },
  { name: 'Kindle', color: '#FCA5A5', textColor: '#7F1D1D', desc: 'Largest ebook ecosystem with deep catalog. Walled garden with almost no social layer.' },
  { name: 'Apple Books', color: '#93C5FD', textColor: '#1E3A5F', desc: 'Beautiful native reading experience and curated collections. No community features at all.' },
  { name: 'Literal', color: '#FCD34D', textColor: '#78350F', desc: 'Modern, minimal UI with quote sharing. Tiny user base limits social discovery potential.' },
  { name: 'Fable', color: '#F9A8D4', textColor: '#831843', desc: 'Book club focused with social-first design. Limited catalog and niche audience.' },
  { name: 'Bookly', color: '#5EEAD4', textColor: '#134E4A', desc: 'Excellent reading timer and habit tracking. No discovery engine or community features.' },
  { name: 'Basmo', color: '#A5B4FC', textColor: '#312E81', desc: 'Rich reading journal with detailed notes and quotes. No recommendations or social graph.' },
]

/* ── Research insights ── */
const INSIGHTS = [
  { stat: '73%', title: 'Poor Recommendations', desc: 'Find Goodreads suggestions irrelevant to their actual taste', color: '#C4B5FD', textColor: '#3B1F7E' },
  { stat: '82%', title: 'Social Discovery', desc: 'Discover books through friends & social media, not algorithms', color: '#6EE7B7', textColor: '#064E3B' },
  { stat: '61%', title: 'Challenge Retention', desc: 'Annual reading challenge is the #1 reason users stay on the platform', color: '#FCA5A5', textColor: '#7F1D1D' },
  { stat: '89%', title: 'UI Feels Dated', desc: 'Describe the current interface as cluttered, outdated, and overwhelming', color: '#93C5FD', textColor: '#1E3A5F' },
  { stat: '3.2★', title: 'Rating Fatigue', desc: 'Average rating across all books — the 5-star system lacks nuance', color: '#FCD34D', textColor: '#78350F' },
  { stat: '45%', title: 'Profile Abandonment', desc: 'Rarely update their profiles due to confusing and uninspiring UX', color: '#F9A8D4', textColor: '#831843' },
  { stat: '78%', title: 'Search Frustration', desc: 'Finding specific books or authors is unnecessarily difficult', color: '#5EEAD4', textColor: '#134E4A' },
  { stat: '67%', title: 'Progress Tracking', desc: 'Most requested feature improvement: better reading progress tools', color: '#A5B4FC', textColor: '#312E81' },
]

/* ── How Might We ── */
const HMW = [
  'How might we make book discovery feel serendipitous rather than algorithmic?',
  'How might we make tracking reading progress feel rewarding and delightful?',
  'How might we create meaningful social connections around shared reading experiences?',
  'How might we help readers express nuanced opinions beyond simple star ratings?',
]

/* ── User personas ── */
const PERSONAS = [
  {
    name: 'Priya', type: 'The Avid Reader', age: '28 · Software Engineer', emoji: '📚',
    color: '#C4B5FD',
    desc: 'Reads 50+ books a year. Loves data, tracking, and discovering new authors. Frustrated by irrelevant recommendations and clunky progress tracking.',
    goals: ['Accurate book recommendations', 'Reading insights & statistics', 'Seamless progress tracking'],
  },
  {
    name: 'Marcus', type: 'The Social Reader', age: '34 · Teacher', emoji: '💬',
    color: '#6EE7B7',
    desc: 'Runs two book clubs. Loves discussing themes, sharing quotes, and connecting with fellow readers. Wants better group features.',
    goals: ['Easy club management', 'Threaded discussions', 'Shared reading lists'],
  },
  {
    name: 'Elena', type: 'The Casual Browser', age: '22 · Student', emoji: '🌱',
    color: '#FCA5A5',
    desc: 'Reads occasionally. Discovers books through BookTok and friends. Needs a simple, inviting UI that doesn\'t overwhelm.',
    goals: ['Simple, beautiful interface', 'Friend recommendations', 'Quick "Want to Read" adds'],
  },
]

/* ── Information architecture ── */
const IA_TABS = [
  { tab: 'Discover', icon: '🔍', items: ['For You', 'Trending', 'Genres', 'New Releases', 'Staff Picks'] },
  { tab: 'My Books', icon: '📖', items: ['Currently Reading', 'Want to Read', 'Read', 'DNF', 'Custom Shelves'] },
  { tab: 'Social', icon: '👥', items: ['Feed', 'Book Clubs', 'Friends', 'Discussions', 'Challenges'] },
  { tab: 'Profile', icon: '👤', items: ['Stats & Insights', 'Reviews', 'Quotes', 'Lists', 'Settings'] },
]

/* ── Design system palette ── */
const PALETTE = [
  { name: 'Forest', hex: '#1B4332' },
  { name: 'Cream', hex: '#FEFAE0' },
  { name: 'Sage', hex: '#588157' },
  { name: 'Terracotta', hex: '#BC6C25' },
  { name: 'Midnight', hex: '#0F172A' },
  { name: 'Ivory', hex: '#FAF9F6' },
]

/* ═══════════════════════════════════════
   Helper components
   ═══════════════════════════════════════ */

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

/* Phone frame with notch + screen content */
function PhoneFrame({ children, className }) {
  return (
    <div className={`${styles.screenPhone} ${className || ''}`}>
      <div className={styles.screenNotch} />
      <div className={styles.screenContent}>
        {children}
      </div>
    </div>
  )
}

/* ── Mini app screens (CSS-rendered) ── */

function DiscoverScreen() {
  return (
    <>
      <div className={styles.miniHeader}>Discover</div>
      <div className={styles.miniSearch} />
      <div className={styles.miniLabel}>For You</div>
      <div className={styles.miniBookRow}>
        <div className={styles.miniBook} style={{ background: '#1B4332' }} />
        <div className={styles.miniBook} style={{ background: '#BC6C25' }} />
        <div className={styles.miniBook} style={{ background: '#588157' }} />
        <div className={styles.miniBook} style={{ background: '#0F172A' }} />
      </div>
      <div className={styles.miniLabel}>Trending</div>
      <div className={styles.miniBookRow}>
        <div className={styles.miniBook} style={{ background: '#7F1D1D' }} />
        <div className={styles.miniBook} style={{ background: '#3B1F7E' }} />
        <div className={styles.miniBook} style={{ background: '#134E4A' }} />
        <div className={styles.miniBook} style={{ background: '#831843' }} />
      </div>
      <MiniTabBar active={0} />
    </>
  )
}

function BookDetailScreen() {
  return (
    <>
      <div className={styles.miniBookWide} style={{ background: 'linear-gradient(135deg, #1B4332, #588157)' }} />
      <div className={styles.miniHeader} style={{ fontSize: '0.75rem' }}>The Great Gatsby</div>
      <div className={styles.miniLabel}>F. Scott Fitzgerald</div>
      <div className={styles.miniStar}>★★★★☆</div>
      <div className={styles.miniBtn}>Want to Read</div>
      <div style={{ fontSize: '0.4375rem', color: '#888', lineHeight: 1.4, fontFamily: 'var(--font-body)' }}>
        A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan...
      </div>
      <MiniTabBar active={0} />
    </>
  )
}

function MyBooksScreen() {
  const books = [
    { color: '#588157', title: 'Atomic Habits', progress: 72 },
    { color: '#BC6C25', title: 'Dune', progress: 34 },
    { color: '#1B4332', title: 'Project Hail Mary', progress: 100 },
  ]
  return (
    <>
      <div className={styles.miniHeader}>My Books</div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
        <span className={styles.miniBtn}>Reading</span>
        <span className={styles.miniLabel} style={{ padding: '5px 8px' }}>Want</span>
        <span className={styles.miniLabel} style={{ padding: '5px 8px' }}>Read</span>
      </div>
      {books.map(b => (
        <div key={b.title} className={styles.miniListItem}>
          <div className={styles.miniListThumb} style={{ background: b.color }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className={styles.miniListText}>{b.title}</div>
            <div className={styles.miniProgress}>
              <div className={styles.miniProgressFill} style={{ width: `${b.progress}%` }} />
            </div>
          </div>
        </div>
      ))}
      <MiniTabBar active={1} />
    </>
  )
}

function SocialScreen() {
  return (
    <>
      <div className={styles.miniHeader}>Social</div>
      <div className={styles.miniListItem}>
        <div className={styles.miniAvatar} style={{ background: '#C4B5FD' }} />
        <div className={styles.miniListText}>Alex rated ★★★★★ — Klara and the Sun</div>
      </div>
      <div className={styles.miniListItem}>
        <div className={styles.miniAvatar} style={{ background: '#6EE7B7' }} />
        <div className={styles.miniListText}>Sarah started reading Piranesi</div>
      </div>
      <div className={styles.miniListItem}>
        <div className={styles.miniAvatar} style={{ background: '#FCA5A5' }} />
        <div className={styles.miniListText}>Book Club — Tomorrow's discussion: Ch. 5</div>
      </div>
      <div className={styles.miniListItem}>
        <div className={styles.miniAvatar} style={{ background: '#93C5FD' }} />
        <div className={styles.miniListText}>Jay reviewed The Midnight Library</div>
      </div>
      <MiniTabBar active={2} />
    </>
  )
}

function ProgressScreen() {
  return (
    <>
      <div className={styles.miniHeader}>Reading Stats</div>
      <div className={styles.miniStatRow}>
        <div><span className={styles.miniStatNum}>24</span><span className={styles.miniStatLabel}>Books</span></div>
        <div><span className={styles.miniStatNum}>6.2k</span><span className={styles.miniStatLabel}>Pages</span></div>
        <div><span className={styles.miniStatNum}>18</span><span className={styles.miniStatLabel}>Day streak</span></div>
      </div>
      <div className={styles.miniLabel} style={{ marginTop: 8 }}>This Week</div>
      <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 40 }}>
        {[60, 80, 45, 90, 70, 30, 50].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 3 ? '#1B4332' : '#D1D5DB', borderRadius: 3 }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.375rem', color: '#999', fontFamily: 'var(--font-body)' }}>
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
      </div>
      <MiniTabBar active={3} />
    </>
  )
}

function ProfileScreen() {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div className={styles.miniAvatar} style={{ background: '#588157', width: 36, height: 36 }} />
        <div>
          <div className={styles.miniHeader} style={{ marginBottom: 0 }}>Priya S.</div>
          <div className={styles.miniLabel}>Joined 2022</div>
        </div>
      </div>
      <div className={styles.miniStatRow}>
        <div><span className={styles.miniStatNum}>142</span><span className={styles.miniStatLabel}>Books</span></div>
        <div><span className={styles.miniStatNum}>38</span><span className={styles.miniStatLabel}>Reviews</span></div>
        <div><span className={styles.miniStatNum}>12</span><span className={styles.miniStatLabel}>Lists</span></div>
      </div>
      <div className={styles.miniLabel} style={{ marginTop: 8 }}>Recent Activity</div>
      <div className={styles.miniListItem}>
        <div className={styles.miniListThumb} style={{ background: '#BC6C25' }} />
        <div className={styles.miniListText}>Rated Tomorrow, and Tomorrow... ★★★★★</div>
      </div>
      <div className={styles.miniListItem}>
        <div className={styles.miniListThumb} style={{ background: '#1B4332' }} />
        <div className={styles.miniListText}>Added Demon Copperhead to shelf</div>
      </div>
      <MiniTabBar active={3} />
    </>
  )
}

function MiniTabBar({ active = 0 }) {
  return (
    <div className={styles.miniTab}>
      {[0, 1, 2, 3].map(i => (
        <div key={i} className={`${styles.miniTabDot} ${i === active ? styles.miniTabDotActive : ''}`} />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════
   Main component
   ═══════════════════════════════════════ */

export default function GoodreadsCaseStudy() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <motion.div
          className={styles.heroInner}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EXPO }}
        >
          {/* Phone mockup */}
          <div className={styles.phoneFrame}>
            <div className={styles.phoneNotch} />
            <div className={styles.phoneScreen}>
              <span className={styles.gLogo}>g</span>
              <span className={styles.logoText}>goodreads</span>
            </div>
          </div>

          <h1 className={styles.heroTitle}>Goodreads</h1>
          <p className={styles.heroSub}>
            Reimagining the reading experience for 150M+ readers worldwide
          </p>
        </motion.div>
      </section>

      {/* ── Meta bar ── */}
      <motion.div
        className={styles.meta}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: EXPO }}
      >
        {META.map(({ label, value }) => (
          <div key={label} className={styles.metaItem}>
            <span className={styles.metaLabel}>{label}</span>
            <span className={styles.metaValue}>{value}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Content ── */}
      <div className={styles.content}>

        {/* Overview */}
        <Section>
          <h2 className={styles.sectionLabel}>Overview</h2>
          <p className={styles.overview}>
            Goodreads — the world's largest platform for readers — hasn't seen a major
            design update since Amazon acquired it in 2013. With 150 million users
            struggling with outdated UI, irrelevant recommendations, and disconnected
            social features, this redesign reimagines the entire mobile experience from
            the ground up: modern aesthetics, smarter discovery, and meaningful social
            reading.
          </p>
        </Section>

        {/* Problem */}
        <Section delay={0.05}>
          <h2 className={styles.sectionLabel}>The Problem</h2>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r="1" fill="white" stroke="none"/>
              </svg>
            </div>
            <p className={styles.problemText}>
              Despite being the go-to platform for readers, Goodreads suffers from a
              cluttered, decade-old interface that makes book discovery feel like a chore.
              The recommendation engine is widely criticized, social features feel
              disconnected from reading, and basic tasks like tracking progress require
              too many steps. Users stay for the catalog — but the experience pushes them
              toward alternatives.
            </p>
          </div>
        </Section>

        {/* Competitive Analysis */}
        <Section delay={0.08}>
          <h2 className={styles.sectionLabel}>Competitive Analysis</h2>
          <div className={styles.compGrid}>
            {COMPETITORS.map((c, i) => (
              <motion.div
                key={c.name}
                className={styles.compCard}
                style={{ background: c.color, color: c.textColor }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: EXPO }}
              >
                <span className={styles.compName}>{c.name}</span>
                <span className={styles.compDesc}>{c.desc}</span>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Research Insights */}
        <Section delay={0.08}>
          <h2 className={styles.sectionLabel}>Research Insights</h2>
          <div className={styles.insightGrid}>
            {INSIGHTS.map((ins, i) => (
              <motion.div
                key={ins.title}
                className={styles.insightCard}
                style={{ background: ins.color, color: ins.textColor }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: EXPO }}
              >
                <span className={styles.insightStat}>{ins.stat}</span>
                <span className={styles.insightTitle}>{ins.title}</span>
                <span className={styles.insightDesc}>{ins.desc}</span>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Key Screens — first set */}
        <Section delay={0.1}>
          <h2 className={styles.sectionLabel}>Key Screens</h2>
          <div className={styles.screensSection}>
            <div className={styles.screensRow}>
              <div className={styles.screenWrapper}>
                <PhoneFrame><DiscoverScreen /></PhoneFrame>
                <span className={styles.screenLabel}>Discover</span>
              </div>
              <div className={styles.screenWrapper}>
                <PhoneFrame><BookDetailScreen /></PhoneFrame>
                <span className={styles.screenLabel}>Book Detail</span>
              </div>
              <div className={styles.screenWrapper}>
                <PhoneFrame><MyBooksScreen /></PhoneFrame>
                <span className={styles.screenLabel}>My Books</span>
              </div>
            </div>
          </div>
        </Section>

        {/* How Might We */}
        <Section>
          <h2 className={styles.sectionLabel}>How Might We</h2>
          <div className={styles.hmwList}>
            {HMW.map((q, i) => (
              <motion.div
                key={i}
                className={styles.hmwItem}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: EXPO }}
              >
                {q}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Personas */}
        <Section>
          <h2 className={styles.sectionLabel}>User Personas</h2>
          <div className={styles.personaGrid}>
            {PERSONAS.map((p, i) => (
              <motion.div
                key={p.name}
                className={styles.personaCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EXPO }}
              >
                <span className={styles.personaEmoji}>{p.emoji}</span>
                <span className={styles.personaName}>{p.name}</span>
                <span className={styles.personaType}>{p.type}</span>
                <span className={styles.personaAge}>{p.age}</span>
                <p className={styles.personaDesc}>{p.desc}</p>
                <ul className={styles.personaGoals}>
                  {p.goals.map(g => (
                    <li key={g} className={styles.personaGoal}>{g}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Information Architecture */}
        <Section>
          <h2 className={styles.sectionLabel}>Information Architecture</h2>
          <div className={styles.iaGrid}>
            {IA_TABS.map((tab, i) => (
              <motion.div
                key={tab.tab}
                className={styles.iaColumn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: EXPO }}
              >
                <div className={styles.iaTab}>{tab.icon} {tab.tab}</div>
                <ul className={styles.iaList}>
                  {tab.items.map(item => (
                    <li key={item} className={styles.iaItem}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Final Designs — second set of screens */}
        <Section>
          <h2 className={styles.sectionLabel}>Final Designs</h2>
          <div className={styles.screensSection}>
            <div className={styles.screensRow}>
              <div className={styles.screenWrapper}>
                <PhoneFrame><SocialScreen /></PhoneFrame>
                <span className={styles.screenLabel}>Social Feed</span>
              </div>
              <div className={styles.screenWrapper}>
                <PhoneFrame><ProgressScreen /></PhoneFrame>
                <span className={styles.screenLabel}>Reading Stats</span>
              </div>
              <div className={styles.screenWrapper}>
                <PhoneFrame><ProfileScreen /></PhoneFrame>
                <span className={styles.screenLabel}>Profile</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Design System */}
        <Section>
          <h2 className={styles.sectionLabel}>Design System</h2>
          <div className={styles.dsGrid}>
            {/* Typography */}
            <div className={styles.dsTypo}>
              <div className={styles.dsTypoLabel}>Typography</div>
              <div className={styles.dsFont}>
                <div className={styles.dsFontName}>Display — Fraunces</div>
                <div className={styles.dsFontSampleDisplay}>
                  Aa Bb Cc Dd Ee
                </div>
              </div>
              <div className={styles.dsFont}>
                <div className={styles.dsFontName}>Body — DM Sans</div>
                <div className={styles.dsFontSampleBody}>
                  Aa Bb Cc Dd Ee
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className={styles.dsColors}>
              <div className={styles.dsTypoLabel}>Color Palette</div>
              <div className={styles.dsColorGrid}>
                {PALETTE.map(c => (
                  <div key={c.name} className={styles.dsSwatch}>
                    <div className={styles.dsSwatchColor} style={{ background: c.hex }} />
                    <div className={styles.dsSwatchInfo}>
                      <span className={styles.dsSwatchName}>{c.name}</span>
                      <span className={styles.dsSwatchHex}>{c.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Reflections */}
        <Section>
          <h2 className={styles.sectionLabel}>Reflections</h2>
          <blockquote className={styles.reflections}>
            "Redesigning a product used by 150 million people taught me that great UX
            isn't about making things look modern — it's about respecting the mental
            models users have built over years while carefully introducing improvements
            that feel natural. The biggest lesson: when your research clearly shows what
            users need, trust it, even when it means challenging the status quo."
          </blockquote>
        </Section>

        {/* Bottom navigation */}
        <div className={styles.bottomNav}>
          <Link to="/" className={styles.navBack}>← Back to all work</Link>
          <Link to="/#contact" className={styles.navContact}>Let's work together →</Link>
        </div>

      </div>
    </div>
  )
}
