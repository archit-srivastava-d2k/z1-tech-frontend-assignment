# Project README

## Technology Choices
- **Next.js 15** → For modern React features and optimized performance.  
- **TypeScript** → For type safety and better developer experience.  
- **Tailwind CSS v4** → For utility-first, fast, and maintainable styling.  
- **GSAP + ScrollTrigger + Lenis** → For smooth animations, scroll-based triggers, and fluid scrolling.  

## Challenges Faced & Solutions
- **Continuous Marquee Animation** → Solved using GSAP infinite loop animation.  
- **Scroll Animation Stuck Issues** → Fixed by restructuring ScrollTrigger and adjusting container heights.  
- **Lenis Smooth Scroll Conflicts** → Resolved by syncing GSAP’s ticker with Lenis scroll.  

## Animation Implementation
- Used **GSAP timeline** with ScrollTrigger to pin and animate sections.  
- Implemented **continuous left-moving marquee** for dynamic UI feel.  
- Word-by-word text reveal animations for better storytelling.  

## Time Allocation Breakdown
- **Setup & Configuration** → 2 hrs  
- **UI Development (Tailwind + Layouts)** → 3 hrs  
- **GSAP Animations (ScrollTrigger + Marquee)** → 3 hrs  
- **Debugging & Refinements** → 2 hrs  

## How to Run the Project

### 1. Clone the Repository
```bash
git clone <repo-url>
cd <project-folder>
2. Install Dependencies
npm install

3. Run Development Server
npm run dev


Open → http://localhost:3000

4. Build for Production
npm run build
npm start


✅ Built with Next.js 15 + TypeScript + Tailwind v4 + GSAP/ScrollTrigger + Lenis


Do you want me to also add **demo screenshots/GIFs section** (so recruiter can see animations quickly) or keep it text-only?
