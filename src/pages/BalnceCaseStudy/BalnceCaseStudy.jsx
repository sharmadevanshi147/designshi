import { CaseStudyBack, CaseStudyPager } from '../../components/CaseStudyNav/CaseStudyNav'
import Footer from '../../components/Footer/Footer'
import styles from './BalnceCaseStudy.module.css'

// Hero + cover + overview + plan + information architecture + design system + final product pulled from Figma. Rest of the page still pending more of the Figma.

const TAGS = ['Hackathon Case', 'Created Under 24 Hours', 'UX Design', 'UI Development']

const OVERVIEW_PARAGRAPHS = [
  "In April 2024, our team had the opportunity to participate in North India's largest hackathon. Within just 24 hours, we were challenged to conceptualize, design, develop, and present a fully functional product through two rigorous rounds of judging.",
  "Our solution, Balnce, was a direct-to-consumer application designed to reward users for reducing their screen time. Rather than discouraging technology altogether, we wanted to encourage healthier digital habits by making mindful usage rewarding.",
  "At a time when endless doomscrolling had become the norm, we saw an opportunity to use technology as a tool for positive behavioral change. The product encouraged users to spend less time consuming content passively and more time engaging in meaningful offline activities. By introducing focus sessions, personalized goals, and a reward system, Balnce aimed to counter the cycle of instant gratification and promote a healthier relationship with digital devices.",
]

const PLAN_INTRO = "With the limited time on our hands, we proposed to go forward with a simple Problem, Process, Product, Impact framework:"

const PLAN_ITEMS = [
  {
    label: 'Problem',
    body: "Excessive screen time has become an increasingly common challenge, often leading to mindless content consumption at the expense of productivity, hobbies, and overall well-being. We wanted to explore how technology itself could encourage healthier digital habits by making mindful device usage rewarding rather than restrictive.",
  },
  {
    label: 'Process',
    body: "Given the 24-hour timeline, we adopted a simple Problem → Process → Product → Impact framework to stay focused and move quickly. We began by mapping the user journey and information architecture on paper before rapidly translating ideas into interactive designs. Throughout the hackathon, we continuously validated features against a single question: Would this genuinely motivate users to spend less time on their phones? This iterative approach helped us prioritize essential functionality while delivering a cohesive end-to-end experience within the time constraint.",
  },
  {
    label: 'Product',
    body: "Balnce is a digital wellness application that helps users build healthier screen-time habits through personalized goals, focus sessions, usage analytics, and a gamified rewards system. By tracking screen time and rewarding consistent progress with redeemable offers, the app transforms digital well-being into an engaging and motivating experience instead of relying solely on restrictions.",
  },
  {
    label: 'Impact',
    body: "Within 24 hours, our team successfully designed and developed a working product that was presented through two rounds of judging at North India's largest hackathon. The project received a nomination for an MLH Track Award, validating both the strength of the product concept and our ability to rapidly transform an idea into a functional user experience under extreme time constraints.",
  },
]

export default function BalnceCaseStudy() {
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
                Building an application under 24 Hours - Balnce
              </p>
              <p className={styles.subtitle}>
                Turn screen time into tangible rewards.
              </p>
            </div>
          </div>

          <div className={styles.coverFrame}>
            <img
              className={styles.coverImage}
              src="/designshi/Balnce/balnce-cover.svg"
              alt="Balnce app splash screen shown on an iPhone"
            />
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.blockTitle}>Overview</h2>
          <div className={styles.subsection}>
            {OVERVIEW_PARAGRAPHS.map(p => (
              <p key={p} className={styles.body}>{p}</p>
            ))}
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>My Role</h3>
            <p className={styles.body}>
              Given the 24-hour time constraint, I took on multiple responsibilities as a senior member of the team. I was responsible for feature planning, information architecture, product design, and partial frontend development. My focus was on quickly translating the product vision into a cohesive user experience while ensuring the team could execute efficiently within the limited timeframe.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.blockTitle}>Plan</h2>
          <div className={styles.subsection}>
            <p className={styles.bodyStrong}>{PLAN_INTRO}</p>
            {PLAN_ITEMS.map(item => (
              <div key={item.label} className={styles.planItem}>
                <p className={styles.planLabel}>{item.label}</p>
                <p className={styles.body}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.blockTitle}>Information Architecture</h2>
          <div className={styles.systemStack}>
            <p className={styles.body}>
              This notebook page is exactly how the product began. In the middle of the hackathon, ideas moved faster than design tools, so the entire information architecture was mapped on paper before evolving into the final product. I've kept it here because it reflects the thinking process, not just the outcome.
            </p>
            <img
              className={styles.iaImage}
              src="/designshi/Balnce/balnce-ia.svg"
              alt="Hand-drawn information architecture sketch on notebook paper, mapping the app's screen flow"
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.blockTitle}>Design System Decisions</h2>
          <div className={styles.systemStack}>
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Typography</h3>
              <p className={styles.body}>
                With only 24 hours to build the product, every design decision had to be intentional and quick. We chose Merriweather Sans for the logo to give the brand a distinctive identity, while Outfit was selected for the interface because of its readability and strong accessibility across mobile devices. Font sizes and typography followed mobile accessibility guidelines from the outset.
              </p>
            </div>

            <div className={styles.systemLogoBlock}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Logo</h3>
                <p className={styles.body}>Simple Text Based Logo in Merriweather Sans.</p>
              </div>
              <img
                className={styles.systemImage}
                src="/designshi/Balnce/balnce-logo.jpg"
                alt="Balnce wordmark logo shown on dark and light backgrounds"
              />
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Icon and Component Library</h3>
              <p className={styles.body}>
                For the interface, we adopted the Solar Icons library and built the product around a highly component-driven design system. Reusable components enabled us to maintain visual consistency while dramatically speeding up both design and development within the limited timeframe.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.blockTitle}>Final Product</h2>
          <p className={styles.body}>With the system in place, I rebuilt the app screen by screen:</p>

          <div className={styles.screenStack}>
            <div className={styles.screenBlock}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Authentications</h3>
                <p className={styles.body}>
                  Users can effortlessly create an account or log in to an existing one, with a streamlined authentication flow designed to make onboarding quick while maintaining account security.
                </p>
              </div>
              <img
                className={styles.screenImage}
                src="/designshi/Balnce/balnce-auth.jpg"
                alt="Login and sign-up screens for the Balnce app shown on three iPhones"
              />
            </div>

            <div className={styles.screenBlock}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Configurations</h3>
                <p className={styles.body}>
                  To personalize the experience, users begin by defining a daily screen-time goal and selecting the applications they wish to limit during focus sessions. These preferences serve as the foundation for tailored interventions, usage analytics, and a more intentional digital wellness journey.
                </p>
              </div>
              <img
                className={styles.screenImage}
                src="/designshi/Balnce/balnce-configurations.jpg"
                alt="Screen-time goal and app-picker configuration screens for the Balnce app shown on two iPhones"
              />
            </div>

            <div className={styles.screenBlock}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Permissions</h3>
                <p className={styles.body}>
                  To power personalized analytics and focus sessions, Balnce requests background usage permissions during onboarding. This enables accurate screen-time tracking and app usage monitoring while minimizing manual user effort.
                </p>
              </div>
              <img
                className={styles.screenImage}
                src="/designshi/Balnce/balnce-permissions.jpg"
                alt="App-picker screen with a background-permission system prompt for the Balnce app"
              />
            </div>

            <div className={styles.screenBlock}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Coins</h3>
                <p className={styles.body}>
                  Users earn Balnce Coins upon completing focus sessions and achieving their digital wellness goals. This gamified reward system reinforces positive habits, celebrates progress, and encourages long-term engagement with the platform.
                </p>
              </div>
              <img
                className={styles.screenImage}
                src="/designshi/Balnce/balnce-coins.jpg"
                alt="Reward screen showing a gold coin earned for completing a focus session in the Balnce app"
              />
            </div>

            <div className={styles.screenBlock}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Home</h3>
                <p className={styles.body}>
                  The home dashboard acts as the user's central productivity hub, presenting screen-time progress, earned rewards, activity streaks, and personalized recommendations in a single view while enabling users to quickly start their next focus session.
                </p>
              </div>
              <img
                className={styles.screenImage}
                src="/designshi/Balnce/balnce-home.jpg"
                alt="Home dashboard screen showing screen-time progress, points, streaks, and suggestions in the Balnce app"
              />
            </div>

            <div className={styles.screenBlock}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Offers</h3>
                <p className={styles.body}>
                  The offers section curates personalized partner deals based on users' engagement and reward eligibility, making it easy to discover relevant discounts while extending the value of their digital wellness journey.
                </p>
              </div>
              <img
                className={styles.screenImage}
                src="/designshi/Balnce/balnce-offers.jpg"
                alt="Personalized partner offers screen for the Balnce app"
              />
            </div>

            <div className={styles.screenBlock}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>User Profile</h3>
                <p className={styles.body}>
                  The profile section serves as a centralized settings hub where users can manage their account, update daily screen-time goals, customize notifications, modify app restrictions, and personalize their digital wellness experience.
                </p>
              </div>
              <img
                className={styles.screenImage}
                src="/designshi/Balnce/balnce-profile.jpg"
                alt="User profile and settings screen for the Balnce app"
              />
            </div>

            <div className={styles.screenBlock}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Rewards</h3>
                <p className={styles.body}>
                  The Rewards hub enables users to redeem Balnce Coins earned through focus sessions for exclusive partner offers and discounts, reinforcing positive digital habits through meaningful real-world incentives.
                </p>
              </div>
              <img
                className={styles.screenImage}
                src="/designshi/Balnce/balnce-rewards.jpg"
                alt="Rewards hub screen showing redeemable partner offers for the Balnce app"
              />
            </div>

            <div className={styles.screenBlock}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Analytics</h3>
                <p className={styles.body}>
                  The analytics dashboard enables users to monitor their digital habits through weekly screen-time trends, goal progress, and app-wise usage insights, helping them identify patterns, measure improvement, and make more mindful technology choices.
                </p>
              </div>
              <img
                className={styles.screenImage}
                src="/designshi/Balnce/balnce-analytics.jpg"
                alt="Weekly screen-time analytics and app usage breakdown screen for the Balnce app"
              />
            </div>

            <div className={styles.screenBlock}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Homescreen Widget</h3>
                <p className={styles.body}>
                  The home screen widget provides users with real-time visibility into their daily screen-time progress, offering effortless access to key metrics while encouraging mindful device usage without requiring them to open the app.
                </p>
              </div>
              <img
                className={styles.screenImage}
                src="/designshi/Balnce/balnce-widget.svg"
                alt="iPhone home screen showing the Balnce screen-time progress widget"
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.blockTitle}>Final Product and Outcome</h2>
          <div className={styles.subsection}>
            <p className={styles.body}>
              Balnce was conceived, designed, and developed within 24 hours for North India's largest hackathon, where it earned a nomination for an MLH Track Award. The project was built during a time when design-to-development workflows and AI-assisted UI generation were still in their infancy, making the entire product a hands-on exploration of rapid product thinking, UX design, and implementation.
            </p>
            <p className={styles.body}>
              Looking back, there are many aspects I would refine today. However, I've intentionally chosen to preserve the project in its original form as a snapshot of my design process at that point in time, when AI served only as a tool for early ideation rather than execution. It stands as a reminder of how I've grown as a designer and how my workflow has evolved alongside advances in AI.
            </p>
          </div>
        </section>
      <CaseStudyPager slug="balnce" />
      </div>
    </div>

    <Footer />
    </>
  )
}
