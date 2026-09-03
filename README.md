# Divya's Digital Canvas

BUILD A COMPLETE PERSONAL PORTFOLIO FROM SCRATCH
IMPORTANT: READ EVERYTHING BEFORE WRITING ANY CODE

Build a complete personal portfolio website for Divya Vikash, starting from scratch.

This must not look like a generic AI-generated developer portfolio.

The website should feel:

Creative
Editorial
Dark and ambient
Aesthetic
Personal
Experimental in a controlled way
Modern
Sophisticated
Interactive
Thoughtfully art-directed

However, it must NOT feel:

Cyberpunk
Neon
Futuristic sci-fi
Like a HUD
Like a hacker terminal website
Like a dashboard
Like a SaaS landing page
Like a glowing AI interface
Like a purple/blue gradient template
Like a generic portfolio with cards stacked everywhere

The design should feel like a digital creative portfolio with subtle computational and 3D elements, not a "futuristic developer website."

1. TECH STACK — STRICT REQUIREMENT

Use:

React
JavaScript only
Three.js
React Three Fiber
@react-three/drei
CSS / Tailwind if appropriate for the project
DO NOT USE TYPESCRIPT.

No .ts files.

No .tsx files.

Use:

.js
.jsx

The code should remain clean, componentized, and understandable.

Do not overengineer the application.

2. THEMES — TWO COMPLETE VISUAL THEMES

The portfolio must have a fully functional theme toggle.

There should be:

DARK THEME

Dark, warm, ambient, cinematic.

Suggested palette:

Background: #11110f
Deep background: #0b0b09
Surface: #191916
Surface elevated: #22221e

Primary text: #f2f0e9
Secondary text: #aaa79e
Muted text: #716f68

Border:
rgba(255,255,255,0.08)

Subtle accent:
desaturated warm grey / muted olive

The dark theme should feel like:

Warm charcoal
A quiet gallery
Soft ambient depth
Paper and ink translated digitally

Not pure black.

Not blue-black.

Not neon.

LIGHT THEME — VERY IMPORTANT

The light theme should be one of the strongest parts of the website.

Do NOT simply turn the background white.

Create a refreshing pale yellow / warm cream ambient aesthetic.

Suggested direction:

Background: #f5f0d8
Deep surface: #ece4c4
Surface: #fffbea

Primary text: #24231d
Secondary text: #656258
Muted text: #8a8575

Accent:
muted olive / warm brown / subtle mustard

The light mode should feel like:

Pale yellow sunlight
Warm paper
Morning light
A creative notebook
Calm and refreshing
Editorial

Avoid sterile white.

Avoid bright yellow everywhere.

The pale yellow atmosphere should come through subtle background gradients, lighting, texture, and surfaces.

3. OVERALL DESIGN LANGUAGE

The portfolio should have a clear visual identity.

Use:

Strong typography
Large editorial headings
Interesting layouts
Asymmetry where appropriate
Generous whitespace
Subtle texture
Fine borders
Ambient gradients
Depth
Carefully placed 3D elements

Avoid:

Every section being a rounded rectangle
Every piece of information being inside a card
Repetitive layouts
Excessive glassmorphism
Excessive blur
Excessive shadows
Excessive border radius

Each section should have its own visual composition.

The website should feel like a journey, not a stack of identical sections.

4. TYPOGRAPHY

Typography is extremely important.

Use a clean modern sans-serif for major text.

Use a monospace font sparingly for:

Metadata
Dates
Technologies
Small labels
Coding statistics

Suggested direction:

Primary: Inter / Manrope / similar clean editorial sans
Mono: JetBrains Mono

Do not make everything uppercase.

Use uppercase monospace labels sparingly.

Use very large typography for major statements.

5. SITE FLOW AND SECTION ORDER

Use this exact overall flow:

1. Navbar

2. Hero
   └── Interactive 3D "Know About Me" interface on the right

3. Selected Work / Projects

4. About / Education

5. Skills & Technical Toolkit

6. Coding Journey / Problem Solving
   └── Codolio-inspired statistics cards

7. Certificates

8. Contact

9. Footer
   IMPORTANT

There is NO separate Achievement section.

The coding accomplishments should be represented through the Coding Journey section.

Do not create an "Achievements" heading.

6. NAVBAR

Create a clean, elegant navigation.

Suggested links:

DV

Work
About
Skills
Coding
Certificates
Contact

Theme Toggle

The navbar should be:

Minimal
Elegant
Responsive
Sticky or intelligently fixed

Do not use:

Numbered navigation
Status labels
"System Online"
Fake technical terminology
Decorative sci-fi elements

On mobile, create a properly designed mobile menu.

Do not simply squash desktop navigation.

7. HERO SECTION — THE MOST CREATIVE SECTION

The hero must immediately establish the personality of the website.

LEFT SIDE

Display:

Small introduction
Computer Science Student
Lovely Professional University
Main heading
Divya Vikash
Main statement

Use something along the direction of:

I like understanding how things work beneath the surface — so I learn by building.

This should be visually strong.

Below this:

View My Work
GitHub
LinkedIn

Use only verified information.

Do not invent social links.

8. HERO RIGHT SIDE — INTERACTIVE 3D "KNOW ABOUT ME" EXPERIENCE

This is the major interactive feature of the portfolio.

IMPORTANT

This should NOT be a generic spinning 3D object.

Create an interactive Three.js composition that feels like a 3D navigation / information object.

Think of it as:

A sculptural digital interface floating beside the hero.

The user should see a subtle 3D environment containing an interactive object or structure.

Possible visual direction:

Floating layered panels
Abstract architectural geometry
Circular navigation rings
Spatial cards
Soft 3D planes
A central object surrounded by interactive labels

One prominent interaction should be:

KNOW ABOUT ME

When the user enters or clicks this interaction, they can access a text input.

The user can type questions / commands about Divya.

For example:

who are you?
what do you study?
what are you working on?
show your skills
tell me about MiniDB
coding stats
education

The system should generate an appropriate response.

IMPORTANT IMPLEMENTATION DETAIL

This is NOT supposed to be a fake AI chatbot with made-up information.

The responses should be generated from a structured local knowledge base containing verified portfolio information.

The experience can use:

keyword matching
intent matching
predefined knowledge responses
command parsing

If an actual AI API is not configured, do not pretend AI is responding.

Create intelligent local responses.

Example:

User:
tell me about WDTE
Response:

Explain the verified WDTE project.

User:
what languages do you know?
Response:

Use the verified skills.

User:
who are you?
Response:

Give a concise factual introduction.

VISUAL DESIGN OF THIS INTERACTION

Do not make it look like:

A hacker terminal
Green terminal text
Cyberpunk console
Sci-fi command center

Instead, make it feel like:

A conversational object
A digital artifact
A spatial information interface
An interactive editorial installation

The input can be simple and elegant.

The Three.js object should subtly react when:

The user moves the mouse
The interface is opened
A response appears

No aggressive animation.

No fast spinning.

No neon.

9. THREE.JS STYLE

Three.js should be used as a creative atmospheric tool.

Use:

Soft geometry
Subtle wireframes
Layered surfaces
Ambient lighting
Gentle camera movement
Slow parallax
Theme-aware materials

Avoid:

Neon particle galaxies
Space scenes
Planets
Random spinning cubes
Fast rotation
Gaming aesthetics

The 3D world should feel like part of the visual identity.

10. PROJECTS SECTION — SELECTED WORK

This is one of the most important sections.

Use these verified projects.

PROJECT 01
Student Management System

July 2025

Developed a Java-based console application to manage student records and academic information, including:

Marks
Attendance
Fees
Payments
Courses

Implemented:

OOP principles
ArrayList-based data management
CRUD operations
Searching
Sorting
Validation
Basic reporting
File-based persistence
Tech
Java
OOP
ArrayList
File Handling
PROJECT 02
MiniDB

July 2025

Developing a C++ based in-memory relational database system using OOP principles.

The project includes:

Database architecture
Database component
Table component
Schema component
Column component
Row component
Typed data system using std::variant
Schema validation
Constraint validation
CRUD operations
Tech
C++
OOP
STL
std::variant
PROJECT 03
WDTE — Why Does This Exist?

August 2025

Developed an AI-powered UI reverse-engineering platform that analyzes uploaded interface screenshots to:

Identify visible UI components
Trace components back to user needs
Explore UX reasoning
Explore product decisions

Built an evidence-based analysis workflow with:

Feature detection
5-stage analytical pipeline
7-part feature breakdown
Observed vs inferred reasoning boundaries
Responsive dark/light themes
Tech
JavaScript
CSS
Gemini API 11. PROJECT VISUAL DESIGN

Do NOT use a boring three-card grid.

Create a more creative editorial experience.

Suggested structure:

The project section starts with:

SELECTED WORK

Things I built to understand
how things work.

Then create large project experiences.

Possible interaction:

One project occupies the main visual focus
Project number appears as an oversized background element
Project information is arranged asymmetrically
Navigation between projects is smooth
Each project has a different subtle visual composition

For example:

01

Student
Management
System

A Java console application...

Java / OOP / ArrayList / File Handling

Use restrained animations as projects enter the viewport.

Do not use neon cards.

Do not use fake project links.

12. ABOUT + EDUCATION SECTION

Combine personal context and education in an editorial way.

Education information
Lovely Professional University

Punjab, India

Bachelor of Technology
Computer Science and Engineering

CGPA: 9.64

Since August 2025
Satyam International

Patna, Bihar

Intermediate

88%

April 2022 – March 2024
New Era High School

Patna, Bihar

Matriculation

98%

April 2020 – March 2022
ABOUT VISUAL DIRECTION

Do not make this a boring timeline.

Create something more creative.

Possible concept:

"The path so far"

Use a visual path / editorial progression across the screen.

Education entries can exist along a subtle route.

The route should feel:

Calm
Graphic
Editorial

Not like a neon timeline.

On the side, include a concise personal statement.

Do not invent an extensive biography.

Keep it grounded.

13. SKILLS SECTION — MAKE IT VISUALLY INTERESTING

Verified skills include:

Languages
C++
JavaScript
C
Java
Python
Frameworks / Web
HTML
CSS
Tools / Platforms
PostgreSQL
MongoDB
Git
GitHub

Do not use:

Skill percentages
Progress bars
Circular proficiency charts
"95% React"
Fake expertise ratings

Instead, make the section feel like a technical toolkit.

Possible design:

A dynamic typography wall.

Skills are arranged in clusters.

Hovering a technology subtly reveals:

Its category
Related projects

For example:

Hovering C++ could subtly reference MiniDB.

Hovering Java could reference Student Management System.

Hovering JavaScript could reference WDTE.

This creates actual relationships rather than meaningless skill bars.

14. CODING JOURNEY SECTION — REPLACES ACHIEVEMENTS
    THERE MUST NOT BE A SECTION CALLED ACHIEVEMENTS.

Instead create:

CODING JOURNEY

or

PROBLEM SOLVING

This section should be inspired by the Codolio style of presenting competitive programming activity.

The goal is to show coding activity through beautiful data cards.

Verified information:

Solved 500+ coding questions across different platforms
Participated in LeetCode Biweekly Contest 96
Received the 100 Days Badge on LeetCode
Participated in Starters 76 Div 3
VISUAL STRUCTURE

Create a visually interesting statistics layout.

For example:

Large primary card
500+

Problems Solved
Across coding platforms

Then supporting cards:

LEETCODE

100 Days
Badge Earned
CONTESTS

Biweekly Contest 96
COMPETITIVE PROGRAMMING

Starters 76
Division 3

But do NOT make these generic dashboard cards.

Make them feel integrated into the editorial design.

Potential creative direction:

Different card sizes
Slightly asymmetric masonry composition
Large numbers
Monospace metadata
Platform-inspired subtle visual motifs

No neon.

No fake live API data.

15. CERTIFICATES SECTION

The portfolio DOES include certificates.

Use verified certificates:

Programming using C++
Infosys Springboard
13 hours
Computer Programming
NeoColab
6 months
Mastering Data Structures and Algorithms using C and C++
Abdul Bari — Udemy
76 hours
VISUAL DESIGN

Do not use huge certificate cards.

Possible concept:

A clean archive / shelf / document layout.

Each certificate could appear like:

01

Programming using C++

Infosys Springboard

13 HOURS

With subtle interaction on hover.

Make it feel like an archive rather than a card collection.

16. CONTACT SECTION

Make the final section bold and memorable.

Large heading:

Let's build something
interesting.

Or another equally strong statement.

Use only verified contact information:

Email
divyavikash620@gmail.com
LinkedIn
linkedin.com/in/divya-vikash-518776384
GitHub
github.com/divyavikash620

Do not invent additional contact links.

Do not add fake resume links unless an actual resume asset exists.

17. FOOTER

Minimal.

Possible structure:

DV

Designed and built by Divya Vikash

2026

Keep it subtle.

18. RESPONSIVE DESIGN

The website must be intentionally designed for:

Desktop
Strong asymmetric layouts
Full Three.js experience
Editorial spacing
Tablet
Intelligent recomposition
Mobile
Simplified Three.js rendering
Proper navigation
No horizontal overflow
No overlapping elements
Large readable typography

Do not simply shrink desktop.

Design mobile separately where necessary.

19. MOTION

Use motion sparingly.

Allowed:

Fade reveals
Gentle vertical movement
Subtle text transitions
Small opacity changes
Slow ambient Three.js movement

Avoid:

Bouncing
Constant floating
Scale effects everywhere
Aggressive springs
Excessive scroll animations
Flashing effects

The site should feel calm and premium.

20. IMPORTANT PERFORMANCE RULES

Three.js must not destroy performance.

Use:

Optimized geometry
Limited objects
Responsive rendering
Lower complexity on mobile

Respect reduced motion where possible.

The canvas must not interfere with:

Scrolling
Clicking
Navigation
Text readability 21. COMPONENT STRUCTURE

Keep the project modular.

Suggested components:

Navbar
Hero
HeroScene
AboutInterface
Projects
ProjectItem
AboutEducation
Skills
CodingJourney
Certificates
Contact
Footer
ThemeToggle

For the interactive hero system:

KnowledgeBase
CommandInput
CommandResponse

Use JavaScript.

No TypeScript.

22. KNOWLEDGE BASE FOR THE HERO INTERACTION

Create a local structured knowledge base.

It should answer questions related to:

Divya
Education
Projects
Skills
Coding
Contact

Recognize natural language rather than requiring exact commands.

Examples:

who are you
tell me about yourself

→ Personal introduction.

what do you study
education
college

→ Education.

projects
what have you built

→ Project overview.

tell me about minidb

→ MiniDB.

wdte
why does this exist

→ WDTE.

coding
problem solving
leetcode

→ Coding Journey.

skills
technologies
languages

→ Skills.

If the question is not understood, respond elegantly:

I don't have an answer for that yet. Try asking about my projects, education, skills, or coding journey.

Do not fake AI intelligence.

23. FINAL DESIGN TEST

Before considering the website complete, verify:

Visual
No cyberpunk appearance
No neon
No futuristic HUD
No generic AI portfolio
Dark theme feels ambient
Light theme feels pale yellow, warm and refreshing
Typography is strong
Sections have different compositions
Three.js adds actual value
Content
All three verified projects are present
No fake projects
No separate Achievements section
Coding Journey replaces achievements
Certificates use verified information
Skills use verified information
Education uses verified information
No fake social links
Technical
React
JavaScript only
No TypeScript
Three.js implemented
React Three Fiber implemented
Theme toggle works
Responsive design works
Mobile Three.js is optimized
No console errors
FINAL INSTRUCTION

Do not rush into creating generic components.

First establish a strong visual system.

Then build every section individually with its own creative composition.

The portfolio should feel like a cohesive creative experience, where every section gives the user a different reason to keep scrolling.

The design must remain grounded and sophisticated.

Do not use neon.

Do not use cyberpunk.

Do not use futuristic sci-fi UI.

Do not create a generic portfolio template.

The strongest unique features of this portfolio should be:

The dark / pale-yellow dual theme
The interactive Three.js “Know About Me” experience in the hero
The editorial project presentation
The Codolio-inspired Coding Journey section
The fact that every section has its own creative composition while still feeling like one website.

Build this carefully from scratch and prioritize visual quality, creativity, responsiveness, and clean JavaScript architecture.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/81b6fed0-3210-498a-a07a-40832d735c58).

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
