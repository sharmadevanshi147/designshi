import { CaseStudyBack, CaseStudyPager } from '../../components/CaseStudyNav/CaseStudyNav'
import Footer from '../../components/Footer/Footer'
import styles from './FoldHealthCaseStudy.module.css'

const TAGS = ['Case Study', 'Healthcare', 'Enterprise UX', 'Product Design']

const FOLD_PLATFORM_ITEMS = [
  'Care team collaboration and communication',
  'Patient engagement (mobile app, messaging, reminders, forms)',
  'Workflow and clinical operations automation',
  'Population health and risk management',
  'EHR integrations',
  'Care management and quality metric tracking',
]

const KEY_WORKS = [
  {
    title: 'Reflection of Patient Electronic IDs in Patient App',
    desc: [
      "One of our clients wanted patients to access their digital insurance ID cards through the Fold Patient App, enabling faster check-ins at healthcare facilities and seamless access to pharmacy benefits associated with their insurance plans.",
      "At first glance, the request appeared straightforward. However, the complexity lay in the underlying ecosystem. Insurance plans had to be configured on the provider side with plan identifiers, cost-sharing information, eligibility details, and client-specific branding. Every field on the ID card originated from a different source. Some values were manually configured through the Plan Configuration interface, while others were derived from backend-generated files.",
      "To design the experience effectively, I first immersed myself in the insurance domain. I studied the terminology, understood the significance of each data point within a plan, and mapped how every element of the insurance ID would be generated and maintained across the system. This helped me identify the relationship between user-configurable fields, backend-managed data, and the final patient-facing experience.",
      "On the provider side, we designed an Insurance ID Definition workflow that included a live preview of the insurance card as administrators configured its contents. The interface supported multiple branded themes tailored to each client's visual identity, along with predefined themes for Third-Party Administrators (TPAs).",
      "On the patient side, the experience surfaced digital insurance IDs within the My Insurance IDs section of the Fold Patient App, allowing subscribers and their dependents to easily access their insurance cards whenever required.",
    ],
    src: '/designshi/FoldHealth/foldhealth-key-work-1.png',
  },
  {
    title: 'Simplifying Implementation - Teams Creation and Workflow Cloning',
    desc: [
      "A recurring pain point for the implementation team was configuring module access for large groups of providers. Many configurations required selecting the same set of 100+ providers repeatedly, making the process both time-consuming and error-prone.",
      "To eliminate this repetitive workflow, we introduced Provider Teams. Frequently used groups of providers could be saved once and reused whenever the same access configuration was needed. Instead of manually selecting over 100 providers every time, implementation teams could simply select the appropriate team, reducing hundreds of repetitive clicks and significantly speeding up the setup process.",
      "We also introduced a Clone Configuration feature for module access controls. Since many administrators required identical permission sets, users could duplicate an existing configuration and update only the assigned administrator instead of recreating the entire setup from scratch.",
      "Together, these improvements streamlined one of the most repetitive implementation workflows, saving hours of manual effort, reducing configuration time, and minimizing the risk of human error.",
    ],
    src: '/designshi/FoldHealth/foldhealth-key-work-2.png',
  },
  {
    title: 'AI facilitated Clinical Workflows',
    desc: [
      "One of the challenges we consistently encountered was helping clinicians navigate increasingly complex care workflows without adding to their cognitive load. Value based Practices often relied on advanced care management programs for their day to day workflows. These programs including a variety of complex steps like referrals, lab orders, and patient outreach. Each had their own nuances, configurations, and decision points. Designing these workflows   required understanding the clinical intent behind every interaction.",
      "To solve this, I spent time understanding how each program functioned operationally, understood the story of a patient enrolled in a program and a provider using the program how providers made decisions, and where AI could meaningfully reduce friction. I contributed to AI facilitation of these clinical workflows as well like providing a patient's chart synopsis with cites of each resource used for the synopsis. The goal was to ensure clinicians were presented with the right information, recommendations, and actions at the appropriate stage of the workflow while keeping the experience intuitive and configurable for different organizations.",
      "As our engineering teams began adopting AI-assisted development, I also started providing Claude Code with repository context, functional prototypes, and structured documentation alongside implementation tickets. This gave AI better context for generating code and reduced ambiguity during development. The result was a set of clinical workflows that were easier for providers to use, easier for engineers to implement, and better suited for future AI-assisted enhancements.",
    ],
    src: '/designshi/FoldHealth/foldhealth-key-work-3.png',
  },
  {
    title: 'Operational Workflows and Analytics',
    desc: [
      "As the platform grew, many operational workflows became highly configurable to support different healthcare organizations. Features like milestone configuration, resource management, consent handling, queue management, workflow cloning, Teams-based user assignment, communication preferences and sub workflows coming under program steps . For accurate data driver decisions facilitation for our clients, We also presented several analytics reports and worked to create Data backed UX Driven Reports for them.",
    ],
    src: '/designshi/FoldHealth/foldhealth-key-work-4.png',
  },
]

const PROCESS_PARAGRAPHS = [
  "At Fold, requirements were typically defined by Product Owners before being handed over to design. My role was to refine them from a UX perspective by understanding the problem, identifying gaps, and translating business requirements into intuitive user experiences.",
  "I begin by documenting every relevant detail of the requirement, breaking it down into user stories, edge cases, and process flows. Once I have a clear understanding of the problem, I sketch rough interaction flows to validate the experience before moving into visual design.",
  "Depending on the project's needs, I either develop high-fidelity interfaces in Figma or prototype directly using Claude to rapidly build AI-assisted interactive flows. This allows me to iterate quickly, validate ideas with stakeholders, and bridge the gap between design and implementation.",
]

export default function FoldHealthCaseStudy() {
  return (
    <>
    <div className={styles.page}>
      <div className={styles.mainColumn}>
        <div className={styles.contentWrap}>
          <CaseStudyBack />
          <div className={styles.hero}>
            <div className={styles.tagRow}>
              {TAGS.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>

            <div className={styles.headingBlock}>
              <p className={styles.title}>
                Redefining US Healthcare with FoldHealth
              </p>
              <p className={styles.subtitle}>
                Designing enterprise healthcare workflows across providers, patients, and care teams.
              </p>
            </div>
          </div>

          <div className={styles.coverFrame}>
            <img
              className={styles.coverImage}
              src="/designshi/FoldHealth/foldhealth-cover.png"
              alt="FoldHealth product illustration: care plan tracking, patient status, and automation flow around a provider"
            />
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.blockTitle}>Overview</h2>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>What is FoldHealth?</h3>
            <p className={styles.body}>Fold's platform includes:</p>
            <ul className={styles.bulletList}>
              {FOLD_PLATFORM_ITEMS.map(item => (
                <li key={item} className={styles.body}>{item}</li>
              ))}
            </ul>
            <p className={styles.body}>
              The goal is to help care teams shift from reactive, visit-based care to proactive, continuous, person-centered care, allowing providers to manage larger patient populations efficiently while improving health outcomes.
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
                  <img className={styles.keyWorkImage} src={work.src} alt={`${work.title} screens`} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>
        </section>
      <CaseStudyPager slug="foldhealth" />
      </div>
    </div>

    <Footer />
    </>
  )
}
