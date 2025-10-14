# ZERKER - Premium Pitch Deck

An ultra-premium, interactive web-based presentation for ZERKER's seed funding round. Built with Next.js and designed with AKQA-level sophistication for top-tier venture capital presentations.

## 🚀 Features

- **15 Premium Slides** with sophisticated data visualizations
- **Interactive Navigation** with keyboard shortcuts and smooth transitions
- **PDF Export** functionality for investor distribution
- **Responsive Design** maintaining perfect 16:9 aspect ratio
- **Premium Animations** with cubic-bezier transitions
- **VC-Optimized Layout** with clear problem → solution → market flow

## 📊 Slide Structure

1. **Title** - The Media Verification Operating System
2. **Problem** - AI's accessibility has broken digital trust
3. **Solution** - Media verification operating system
4. **Market Opportunity** - Technological/economic/regulatory drivers
5. **Market Size** - $1.2M ARR milestone path
6. **Product Roadmap** - 3-phase evolution timeline
7. **Technology Moat** - DARPA intelligence + CNN data
8. **Developer Ecosystem** - Elite university partnerships
9. **Go-to-Market** - Lighthouse strategy
10. **Competition** - Feature comparison matrix
11. **Business Model** - Tiered enterprise contracts
12. **Team** - Founding team credentials
13. **Financial Projections** - 10-year growth model
14. **The Ask** - $2M seed round with milestones: $300k ARR from pilots, $1.2M ARR Y1 for Series A
15. **Contact** - Professional closing

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS with custom design system
- **Typography**: Inter font family (100-900 weights)
- **PDF Export**: jsPDF + html2canvas
- **Animations**: CSS transitions with cubic-bezier easing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd zerker-pitch-deck

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

### Navigation

- **Arrow Keys**: Navigate between slides
- **Mouse/Touch**: Click navigation arrows or slide indicators
- **Restart Button**: Jump back to slide 1
- **Export PDF**: Generate high-resolution PDF of entire deck

## 🎨 Design System

### Color Palette
- **Primary**: Electric Blue (#00AEEF)
- **Background**: Deep Charcoal (#0F0F0F)
- **Cards**: Dark Gray (#0A0A0A)
- **Text Primary**: Off-White (#F5F5F5)
- **Text Secondary**: Light Gray (#CCCCCC)
- **Accent**: Success Green (#00FF88)

### Typography
- **Titles**: 48-180px, font-black
- **Headers**: 24-56px, font-bold
- **Body**: 16-28px, font-light
- **Labels**: 12-16px, uppercase, tracked

### Components
- **MetricCard**: Data visualization with hover effects
- **AgentCard**: Product feature showcase
- **TimelineItem**: Roadmap visualization
- **TeamMember**: Professional team showcase
- **FundingAllocation**: Use of funds with progress bars

## 📱 Responsive Design

The deck maintains a strict 16:9 aspect ratio across all devices while being fully responsive. All UI elements are positioned outside the main content area to preserve the cinematic presentation format.

## 🔧 Customization

### Adding New Slides
1. Update `deckContent` array in `app/page.js`
2. Add specialized rendering logic in `SlideContent` component if needed
3. Update total slide count for navigation

### Modifying Design
- Colors: Update Tailwind color values throughout components
- Typography: Modify font sizes and weights in slide layouts
- Animations: Adjust transition durations and easing functions

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Self-Hosted
```bash
npm run build
npm start
```

## 🎯 Performance

- **Optimized Images**: All graphics are SVG or CSS-based
- **Minimal Bundle**: No external image dependencies
- **Fast Loading**: <2s initial load time
- **Smooth Animations**: 60fps transitions

## 📄 License

Private - All rights reserved.

## 🤝 Contact

For questions about this presentation or ZERKER:

**Revaz Tsivtsivadze**  
CEO & Co-Founder  
revaz@zerker.ai

---

*Built with precision for top-tier venture capital presentations.*