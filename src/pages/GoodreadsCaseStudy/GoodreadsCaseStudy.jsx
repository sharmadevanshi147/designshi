import styles from './GoodreadsCaseStudy.module.css'

const TAGS = ['Case Study', 'UX Design', 'Product Thinking', 'Design Thinking']

export default function GoodreadsCaseStudy() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.tagRow}>
          {TAGS.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <h1 className={styles.title}>
          Rebuilding A Global Experience Block By block – Goodreads, Reimagined
        </h1>

        <p className={styles.subtitle}>
          A UX redesign of the world's largest reading community — from heuristic teardown to a full component library and eleven rebuilt screen flows.
        </p>
      </div>
    </div>
  )
}
