import styles from './GoodreadsCaseStudy.module.css'

const TAGS = ['Case Study', 'UX Design', 'Product Thinking', 'Design Thinking']

const OVERVIEW_PARAGRAPHS = [
  "Goodreads is a book-cataloguing and social-reading platform used by millions of readers worldwide. Its core loop is simple: mark a book as Want to Read, Currently Reading, or Read, and share that progress with a community. Beyond cataloguing, the app tries to make reading feel social and motivating through reading challenges, curated lists, and giveaways.",
  "As a long-time user and reader, I kept running into the same wall: the functionality was there, but the experience around it felt flat. That gap between what the app does and how it feels to use it became the seed for this project.",
]

const ROLE_ITEMS = [
  'UX Research — surveys, interviews, and synthesis',
  'User Flow Mapping & Information Architecture',
  'User Persona & Empathy Mapping',
  'Wireframing (low to high fidelity)',
  'UX/UI Design — design system, component library, and final workflow',
]

const PROBLEM_BULLETS = [
  'No warm, welcoming onboarding — new users are dropped straight into a dense interface with no orientation',
  'A flat overall aesthetic with little visual hierarchy or personality',
  'Weak, generic recommendations rather than something that feels personal',
  'Friction in connecting with other readers',
  'A steep learning curve for a fairly simple core task',
]

const FINAL_SCREENS = [
  {
    title: 'Onboarding',
    desc: "Illustrated onboarding screens introduce the core value props — the cover scanner, discovery, and social reading — before the user ever sees a form.",
    src: '/designshi/Goodreads/goodreads-screen-onboarding.svg',
  },
  {
    title: 'Language, Login & Signup',
    desc: "Added a language-selection step ahead of login/signup, plus a cleaner, single-column signup flow with clear password and identity fields — an accessibility gap the original app didn't address at all.",
    src: '/designshi/Goodreads/goodreads-screen-login-signup.svg',
  },
  {
    title: 'Dashboard',
    desc: "A dynamic home dashboard surfaces live reading-challenge progress, a genre slider, and update cards from friends — replacing a sidebar that previously buried these front and center.",
    src: '/designshi/Goodreads/goodreads-screen-dashboard.svg',
  },
  {
    title: 'Messaging',
    desc: "Rebuilt messaging with a dedicated 'send picture' action, chat search, and background customization — turning book-talk DMs into something closer to a real social feature.",
    src: '/designshi/Goodreads/goodreads-screen-messaging.svg',
  },
  {
    title: 'Profile',
    desc: "Customizable shelves, top-genre highlights, and update history, all built on the same card system used elsewhere in the app.",
    src: '/designshi/Goodreads/goodreads-screen-profile.svg',
  },
  {
    title: 'Shelves',
    desc: "Dedicated pages per shelf (Currently Reading, Read & Experienced, To Be Read) with a built-in modal for adding recommended books directly from a shelf.",
    src: '/designshi/Goodreads/goodreads-screen-shelves.svg',
  },
  {
    title: 'Discover',
    desc: "Rebuilt around genre and aesthetic-based browsing and friend-based recommendations, with editorial content (news, interviews, featured lists) supporting rather than leading.",
    src: '/designshi/Goodreads/goodreads-screen-discover.svg',
  },
  {
    title: 'About a Book',
    desc: "Ratings, community reviews, and description-first layout, with read-along, preview, and purchase actions all accessible without leaving the page.",
    src: '/designshi/Goodreads/goodreads-screen-about-book.svg',
  },
  {
    title: 'Reading Challenge',
    desc: "A dedicated progress page with a visual completion tracker and a running list of books read that year — designed to make the challenge feel like a shared, visible achievement rather than a background stat.",
    src: '/designshi/Goodreads/goodreads-screen-reading-challenge.svg',
  },
  {
    title: 'Friends & Groups',
    desc: "Simplified friend-adding via contacts, Instagram, or a shareable invite link — removing friction from what should be the easiest part of a social app.",
    src: '/designshi/Goodreads/goodreads-screen-friends-groups.svg',
  },
  {
    title: 'Add Updates',
    desc: "A streamlined flow for posting progress updates with images and captions, so sharing a thought about a book takes seconds, not a dig through menus.",
    src: '/designshi/Goodreads/goodreads-screen-add-updates.svg',
  },
  {
    title: 'Bookstagram',
    desc: "Bookstagram lets users share book-related content — including reels-style video — directly to Instagram from within Goodreads, and pull their own Instagram content back into the app. It closes a loop that a lot of readers were already doing manually (posting shelfies and book reels to Instagram, then separately updating Goodreads) and gives the 'bookstagram' aesthetic community a native home inside the app itself.",
    src: '/designshi/Goodreads/goodreads-screen-bookstagram.svg',
  },
  {
    title: 'Preview Book',
    desc: "Book Preview lets users read the first 10 pages of a book directly from the Book About page, allowing them to explore the writing style, tone, and content before deciding to read or purchase it. It removes the need to search for previews elsewhere, helping readers make more informed choices while keeping the entire discovery experience within the app.",
    src: '/designshi/Goodreads/goodreads-screen-preview-book.svg',
  },
  {
    title: 'Save Annotations',
    desc: "Bookstagram lets users share book-related content — including reels-style video — directly to Instagram from within Goodreads, and pull their own Instagram content back into the app. It closes a loop that a lot of readers were already doing manually (posting shelfies and book reels to Instagram, then separately updating Goodreads) and gives the 'bookstagram' aesthetic community a native home inside the app itself.",
    src: '/designshi/Goodreads/goodreads-screen-save-annotations.svg',
  },
]

const HEURISTIC_CARDS = [
  { src: '/designshi/Goodreads/goodreads-heuristic-1.svg', alt: 'Heuristic evaluation card 1 of 4' },
  { src: '/designshi/Goodreads/goodreads-heuristic-2.svg', alt: 'Heuristic evaluation card 2 of 4' },
  { src: '/designshi/Goodreads/goodreads-heuristic-3.svg', alt: 'Heuristic evaluation card 3 of 4' },
  { src: '/designshi/Goodreads/goodreads-heuristic-4.svg', alt: 'Heuristic evaluation card 4 of 4' },
]

export default function GoodreadsCaseStudy() {
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
                Rebuilding A Global Experience - Goodreads, Reimagined
              </p>
              <p className={styles.subtitle}>
                A UX redesign of the world's largest reading community — from heuristic teardown to a full component library and eleven rebuilt screen flows.
              </p>
            </div>
          </div>

          <div className={styles.coverFrame}>
            <img
              className={styles.coverImage}
              src="/designshi/Goodreads/goodreads-cover.svg"
              alt="Goodreads app mockup — home screen shown on an iPhone"
            />
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>What is Goodreads?</h3>
            {OVERVIEW_PARAGRAPHS.map(p => (
              <p key={p} className={styles.body}>{p}</p>
            ))}
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>My Role</h3>
            <p className={styles.body}>This was a self-directed, end-to-end redesign. I owned:</p>

            <div className={styles.roleGrid}>
              {ROLE_ITEMS.map(item => (
                <div key={item} className={styles.roleCard}>
                  <p className={styles.roleCardText}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Problem</h2>

          <div className={styles.problemRow}>
            <div className={styles.problemText}>
              <p className={styles.problemBody}>
                As an avid reader, I turned to Goodreads for its promise of connecting with fellow book lovers. In practice, the experience felt lackluster — visually flat, impersonal, and short on the small delights that make an app feel alive. When I brought this up with other readers, I found the frustration wasn't just mine; it was shared. That's what turned a personal gripe into a design project.
              </p>

              <p className={styles.problemBody}>Digging into the app more critically, the gaps clustered into a few consistent themes:</p>

              <ul className={styles.problemBullets}>
                {PROBLEM_BULLETS.map(item => (
                  <li key={item} className={styles.problemBody}>{item}</li>
                ))}
              </ul>

              <p className={styles.problemBodyBold}>
                The knock-on effect on real users: the app is functionally trusted, but emotionally forgettable, leading to users conversion rate being lower where experience comes to matter. People complete tasks, but describe the experience as monotonous — and several felt the interface actively undersold how much the app can actually do.
              </p>
            </div>

            <div className={styles.problemImageCard}>
              <img
                className={styles.problemImage}
                src="/designshi/Goodreads/goodreads-app-icon.png"
                alt="Goodreads app icon"
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Plan</h2>
          <p className={styles.planIntro}>
            Before designing solutions, I ran the existing app through a heuristic pass grounded in a few specific principles, rather than a general 'this feels dated' impression:
          </p>

          <div className={styles.heuristicStack}>
            {HEURISTIC_CARDS.map(card => (
              <img key={card.src} className={styles.heuristicImage} src={card.src} alt={card.alt} />
            ))}
          </div>

          <div className={styles.timelineWrap}>
            <img
              className={styles.timelineImage}
              src="/designshi/Goodreads/goodreads-timeline.svg"
              alt="Timeline planned to understand the problem and scope the redesign"
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Research</h2>

          <div className={styles.researchFeedbackBlock}>
            <p className={styles.researchIntro}>Identifying What could have gone better:</p>
            <img
              className={styles.researchFeedbackImage}
              src="/designshi/Goodreads/goodreads-research-feedback.svg"
              alt="Survey feedback on what could be better about the app"
            />
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Survey (Quantitative)</h3>
            <p className={styles.researchBody}>
              I ran a survey to understand who actually uses the app and how satisfied they are with it, focused on journey satisfaction, ease of use, ramp-up time, and ongoing engagement. Most respondents fell in the 20–25 age range.
              <br /><br />
              <span className={styles.researchHighlight}>
                The standout signal: when asked how they typically feel while using the app, the two most common answers were 'bored' and 'frustrated' — not exactly the emotional register you want from a reading community.
              </span>
              <br /><br />
              Task efficiency ratings clustered in the middle of the scale, and satisfaction skewed lower than I expected for a platform this widely used.
            </p>
          </div>

          <img
            className={styles.researchScreensImage}
            src="/designshi/Goodreads/goodreads-research-screens.svg"
            alt="Research screenshots collected during the survey and interviews"
          />

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Interviews (Qualitative)</h3>
            <p className={styles.researchBody}>
              One-on-one interviews filled in the 'why' behind the numbers. I asked readers about their favorite genres and books to get an authentic read on who they are, then asked directly what could be better — everything from color and layout to missing functionality. The recurring theme: the app works, but it doesn't reflect the personality of the people using it.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.bigBlock}>
            <h2 className={styles.blockTitle}>User Persona</h2>
            <img
              className={styles.bigBlockImage}
              src="/designshi/Goodreads/goodreads-persona.svg"
              alt="User persona: Kashish Bhatia, 21, student and frequent reader — goals, frustrations, personality, and influences"
            />
          </div>

          <div className={styles.bigBlock}>
            <h2 className={styles.blockTitle}>Empathy Map</h2>
            <img
              className={styles.bigBlockImage}
              src="/designshi/Goodreads/goodreads-empathy-map.svg"
              alt="Empathy map covering seeing, hearing, doing and saying, thinking and feeling, gains, and pains"
            />
          </div>

          <div className={styles.bigBlock}>
            <h2 className={styles.blockTitle}>Information Architecture</h2>
            <img
              className={styles.bigBlockImage}
              src="/designshi/Goodreads/goodreads-ia.svg"
              alt="Information architecture diagram of the redesigned app"
            />
          </div>
        </section>

        <section className={styles.systemSection}>
          <h2 className={styles.blockTitle}>Design System Decisions</h2>

          <div className={styles.systemSubsections}>
            <div className={styles.systemSubsection}>
              <div className={styles.systemSubsectionText}>
                <h3 className={styles.systemHeading}>Typography</h3>
                <p className={styles.planIntro}>
                  I wanted to deviate a bit from the current style to make it more engaging, but keep the artistic minimal, elegant feel of the application.
                </p>
              </div>
              <img className={styles.systemImage} src="/designshi/Goodreads/goodreads-system-typography.svg" alt="Typography specimens: titles, fluid styles, pill text styles, and content styles" />
            </div>

            <div className={styles.systemSubsection}>
              <div className={styles.systemSubsectionText}>
                <h3 className={styles.systemHeading}>Color</h3>
                <p className={styles.planIntro}>
                  The ultimate design incorporates the retention of brown and beige as the brand's primary colors, complemented by the introduction of additional hues that harmonize with the existing palette.
                </p>
              </div>
              <img className={styles.systemImage} src="/designshi/Goodreads/goodreads-system-color.svg" alt="Color palette: neutral, primary, secondary, status, and accent colors" />
            </div>

            <div className={styles.systemSubsection}>
              <div className={styles.systemSubsectionText}>
                <h3 className={styles.systemHeading}>Icons</h3>
                <p className={styles.planIntro}>
                  I chose to use the Lucide icons library here. the icons from the library seemed cohesive with the proposed design system decisions.
                </p>
              </div>
              <img className={styles.systemImage} src="/designshi/Goodreads/goodreads-system-icons.svg" alt="Lucide icon set used across the redesign" />
            </div>

            <div className={styles.systemSubsection}>
              <div className={styles.systemSubsectionText}>
                <h3 className={styles.systemHeading}>Component Library</h3>
                <p className={styles.planIntro}>
                  I built a custom component library rather than styling each screen individually: one button system (primary/secondary/CTA), one card system (book cards, update cards, shelf cards), one input system (with built-in language-accessibility states), and one navigation system (top nav, sidebar, bottom bar) — all built from the same spacing and radius tokens. That's what makes eleven very different screens feel like one product.
                </p>
              </div>
              <img className={styles.systemImage} src="/designshi/Goodreads/goodreads-system-components.svg" alt="Component library: buttons, cards, inputs, and navigation built from shared design tokens" />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.bigBlock}>
            <h2 className={styles.blockTitle}>Initial Iterations</h2>
            <img
              className={styles.bigBlockImage}
              src="/designshi/Goodreads/goodreads-iterations.svg"
              alt="Initial low-fidelity iteration screens"
            />
          </div>

          <div className={styles.bigBlock}>
            <h2 className={styles.blockTitle}>Final Designs</h2>
            <div className={styles.systemSubsections}>
              {FINAL_SCREENS.map(screen => (
                <div key={screen.title} className={styles.systemSubsection}>
                  <div className={styles.systemSubsectionText}>
                    <h3 className={styles.systemHeading}>{screen.title}</h3>
                    <p className={styles.planIntro}>{screen.desc}</p>
                  </div>
                  <img className={styles.systemImage} src={screen.src} alt={`${screen.title} screen`} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.bigBlock}>
            <h2 className={styles.blockTitle}>Problems i Ran into</h2>
            <p className={styles.planIntro}>
              As this was a self directed case study, i ensured data collection but the dataset was quite small and so i couldnt count completely on it to cater to the interests of millions of users. At some point, backend considerations when arrived in the project arrived a bit too late as well so that was something i had to deal with later in the cycle.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
