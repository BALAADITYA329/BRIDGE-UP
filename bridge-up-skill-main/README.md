# Skill Bridge

Build a full-stack web application called "BridgeUp" that addresses India's last-mile skill development gap for first-generation learners in Tier 2/3 cities and rural areas.

🎯 CORE PURPOSE A platform that connects rural/semi-urban youth with:

* Bite-sized, offline-friendly skill courses

* Regional language support (Telugu, Hindi, Tamil)

* Peer-to-peer mentorship matching

* Local gig/job opportunity listings

📄 PAGES TO BUILD

1. HOME PAGE

   * Hero section with a problem statement and CTA ("Start Learning Free")

   * Stats bar: "2M+ learners", "500+ skills", "12 languages"

   * Featured skill tracks (cards with icons)

   * Testimonials from rural learners

   * Simple, low-data-friendly design

2. SKILL EXPLORER PAGE

   * Filter by: Category, Language, Duration, Offline Available

   * Skill cards with: Title, Level (Beginner/Inter/Advanced), Duration, Learners enrolled, Download for Offline badge

   * Categories: Digital Literacy, Agriculture Tech, Handicrafts, Construction, Healthcare, Finance Basics

3. LEARNER DASHBOARD

   * Progress tracker (courses in progress, completed)

   * Daily streak + micro-learning widget (5-min lesson of the day)

   * Badges earned

   * Mentor match suggestion card

4. MENTOR CONNECT PAGE

   * Search mentors by skill/domain

   * Mentor cards: Name, Skill, Location, Rating, Availability

   * "Request a Session" button

   * Filter: Online / In-person / WhatsApp-based

5. OPPORTUNITY BOARD

   * Local gig listings and apprenticeships

   * Filter by: District, Skill, Pay Type (daily/monthly/project)

   * Post an Opportunity (for employers/NGOs)

🎨 DESIGN GUIDELINES

* Color palette: Warm saffron (#F4A300), deep teal (#0D7377), off-white (#FAF9F6)

* Font: Clean, readable — use Poppins or Noto Sans (supports Indic scripts)

* Mobile-first, lightweight UI (assume 2G/3G users)

* Use simple icons, avoid heavy animations

* Accessibility: High contrast, large tap targets

🛠️ TECH STACK (suggested)

* Frontend: React.js + Tailwind CSS

* Use dummy/mock data for all listings and users

* No backend required — all state managed in React

* Make it fully responsive (mobile + desktop)

✅ SAMPLE MOCK DATA TO INCLUDE

* 6 skill courses across different categories

* 4 mentor profiles

* 5 job/gig listings

* 1 learner profile (pre-logged in for demo)

💡 EXTRA TOUCHES (if possible)

* WhatsApp share button on each course card

* "Download for Offline" toggle (visual only)

* Language switcher in navbar (EN / తెలుగు / हिंदी)

* A simple onboarding quiz: "What do you want to learn?" that recommends a skill track

In the same prompt create a login page where the user can login with a unique user ID and password, make sure that the certificates are only can be downloaded when the certification courses are completed, and the chatbot should be accessible with messages and questions. And create a AI chatbot where you can interact using messages and ask doubts regarding the courses or course syllabus and also can create a resume builder feature where it can create a professional level resume for job applications

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bridge-up-skill.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bf28b6ff-9a90-4017-a8dc-87b7414987bd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
