import styles from './BalnceCaseStudy.module.css'

// PLACEHOLDER CONTENT — structure mirrors FoldHealthCaseStudy.
// Swap in real copy/images once a Figma link is provided for this project.

const TAGS = ['Case Study', 'UX Design', 'Product Thinking', 'Wellness']

const BALNCE_PLATFORM_ITEMS = [
  'Daily mood and habit tracking',
  'Guided breathing and mindfulness sessions',
  'Personalized wellness reminders',
  'Progress trends across mental and physical health',
  'A calming, distraction-free interface',
]

const KEY_WORKS = [
  {
    title: 'Onboarding that meets people where they are',
    desc: [
      "Placeholder: a short, empathetic onboarding flow that asks about a user's current habits and goals before showing them any features, so the app feels tailored from the first screen rather than generic.",
    ],
    src: null,
  },
  {
    title: 'A calmer way to track daily check-ins',
    desc: [
      "Placeholder: redesigned the daily check-in to take under 30 seconds, replacing dense forms with a small set of mood and habit taps that still feed rich trend data over time.",
    ],
    src: null,
  },
]

const PROCESS_PARAGRAPHS = [
  "Placeholder: describe how work typically starts for this project — who defines requirements, and how you turn them into a design brief.",
  "Placeholder: describe your day-to-day process — research, flows, wireframes, and how you validate direction before high-fidelity design.",
  "Placeholder: describe your handoff and iteration process, and any tools (Figma, prototyping, AI-assisted workflows) that shape how you work.",
]

export default function BalnceCaseStudy() {
  return (
    <div className={styles.page}>
      <div className={styles.mainColumn}>
        <div className={styles.contentWrap}>
          <div className={styles.hero}>
            <div className={styles.tagRow}>
              {TAGS.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>

            <div className={styles.headingBlock}>
              <p className={styles.title}>
                Finding Balance in Everyday Wellness
              </p>
              <p className={styles.subtitle}>
                A wellness app designed to help users build healthy habits, track their mental and physical well-being, and find balance through intuitive, calming design.
              </p>
            </div>
          </div>

          <div className={styles.coverFrame}>
            <span className={styles.coverPlaceholderLabel}>Cover image pending</span>
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.blockTitle}>Overview</h2>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>What is Balnce?</h3>
            <p className={styles.body}>Balnce's platform includes:</p>
            <ul className={styles.bulletList}>
              {BALNCE_PLATFORM_ITEMS.map(item => (
                <li key={item} className={styles.body}>{item}</li>
              ))}
            </ul>
            <p className={styles.body}>
              Placeholder: describe the goal of the product — what shift in behavior or feeling it's designed to create for users.
            </p>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>My process</h3>
            {PROCESS_PARAGRAPHS.map(p => (
              <p key={p} className={styles.body}>{p}</p>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.bigBlock}>
            <h2 className={styles.blockTitle}>Key Works</h2>
            <div className={styles.keyWorksStack}>
              {KEY_WORKS.map(work => (
                <div key={work.title} className={styles.keyWorkCard}>
                  <div className={styles.subsection}>
                    <h3 className={styles.subsectionTitle}>{work.title}</h3>
                    {work.desc.map(p => (
                      <p key={p} className={styles.body}>{p}</p>
                    ))}
                  </div>
                  {work.src ? (
                    <img className={styles.keyWorkImage} src={work.src} alt={`${work.title} screens`} />
                  ) : (
                    <div className={styles.keyWorkImagePlaceholder}>
                      <span className={styles.coverPlaceholderLabel}>Image pending</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.bigBlock}>
            <h2 className={styles.blockTitle}>What I Learnt</h2>
            <p className={styles.body}>
              Placeholder: reflect on what this project taught you — a design principle, a constraint you navigated, or a shift in how you approach similar problems now.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
