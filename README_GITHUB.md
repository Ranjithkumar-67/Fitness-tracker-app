# 🏃‍♂️ 75kg Fitness Journey Tracker

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/fitness-tracker)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/fitness-tracker)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

> **Production-ready fitness tracking web application** for weight loss journey from 99.8kg to 75kg. Track meals, exercise, progress, and get automated weekly reports!

## ✨ Features

- 📊 **Real-time Dashboard** - Weight tracking, progress charts, streak counter
- 📝 **Daily Activity Logging** - 6 meals/day, water intake, exercise, mood
- 🍽️ **Meal Planning** - Pre-configured plans with shopping lists
- 💪 **Exercise Tracking** - Workout routines with built-in timer
- 📸 **Progress Photos** - Before/after comparison system
- 📥 **Excel Export** - 5 comprehensive sheets with all data
- 📧 **Email Automation** - Weekly progress reports
- 📱 **Mobile Optimized** - Perfect for Samsung S21 FE & similar devices
- 💾 **Auto-save** - Never lose your data
- 🔒 **Privacy First** - 100% client-side, no servers

## 🚀 Quick Deploy

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Or click: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/fitness-tracker)

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Or drag & drop to: https://app.netlify.com/drop

### Deploy to Render

1. Push to GitHub
2. Connect Render.com to your repo
3. Render auto-detects `render.yaml`
4. Click "Deploy"

## 📦 Installation

### Option 1: Use Locally (No Installation)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/fitness-tracker.git

# Open in browser
cd fitness-tracker
open index.html
```

### Option 2: Run Local Server

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

## 📱 Mobile Setup (Samsung S21 FE)

1. Open the app in **Chrome** or **Samsung Internet**
2. Tap the menu (⋮)
3. Select **"Add to Home Screen"**
4. Tap **"Add"**
5. App installs like native app! 📲

## 🎯 First Time Setup

1. Open the app
2. Click **Settings** tab
3. Fill in your details:
   - Name
   - Email
   - Starting weight: 99.8 kg
   - Target weight: 75.0 kg
4. Click **Save All Settings**
5. Start logging! 🎉

## 📊 What Gets Tracked

| Category | Details |
|----------|---------|
| **Weight** | Weekly tracking (Sundays) |
| **Meals** | 6 meals/day with descriptions |
| **Water** | 12-14 glasses target |
| **Exercise** | Minutes & types |
| **Greens** | Daily intake |
| **Sprouts** | Daily intake |
| **Sleep** | Sleep & wake times |
| **Mood** | Energy levels |
| **Measurements** | Chest, waist, hip, thigh |
| **Photos** | Monthly progress |

## 🔧 Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Charts**: Chart.js
- **Excel**: SheetJS (XLSX)
- **Email**: EmailJS
- **Storage**: LocalStorage API
- **PWA**: Manifest + Service Worker ready

## 📁 Project Structure

```
fitness-tracker/
├── index.html              # Main application
├── styles.css              # All styling (mobile-optimized)
├── app.js                  # Complete functionality
├── manifest.json           # PWA manifest
├── vercel.json            # Vercel config
├── netlify.toml           # Netlify config
├── render.yaml            # Render config
├── package.json           # NPM config
├── .gitignore             # Git ignore rules
├── README.md              # This file
├── QUICKSTART.md          # 60-second guide
├── USER_GUIDE.md          # Complete manual
├── EMAIL_SETUP_GUIDE.md   # Email automation
├── DEPLOYMENT_GUIDE.md    # Hosting options
└── PROJECT_SUMMARY.md     # Technical docs
```

## 🎨 Features Breakdown

### Dashboard
- Current weight display
- Progress percentage
- Days streak counter
- Interactive weight chart
- Today's checklist (8 items)
- Quick action buttons

### Daily Log
- Date selection
- Weight entry (Sundays)
- 6 meal inputs
- Water intake tracker (visual)
- Exercise checkboxes
- Greens/sprouts tracking
- Mood & energy sliders
- Sleep time recording
- Notes section

### Meal Plan
- 7-day weekly plans
- Greens rotation (spinach, fenugreek, amaranth, etc.)
- Cereals rotation (brown rice, oats, ragi)
- Sprouts recipes
- Shopping list generator

### Exercise
- Morning workout (15 min circuit)
- Targeted exercises (thighs, butt, mid-section)
- Weekend plans
- Workout timer with alerts

### Progress
- Photo upload (front, side, back)
- Before/after comparison
- Measurements chart
- Milestone tracking

### Settings
- Profile management
- Email report configuration
- Reminder settings
- Data export/import
- Backup system

## 📧 Email Automation Setup

1. Create free account at [EmailJS.com](https://www.emailjs.com/)
2. Add email service (Gmail recommended)
3. Create email template
4. Get Service ID, Template ID, Public Key
5. Enter in app Settings
6. Enable weekly reports
7. Get automated emails every Sunday! 📬

Full guide: [EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md)

## 📥 Data Export

**Excel Export includes 5 sheets:**
1. Daily Logs - All entries
2. Weight Progress - Weight tracking with calculations
3. Measurements - Body measurements over time
4. Weekly Summary - Aggregated statistics
5. Meal Tracking - All meals logged

Click **"Export to Excel"** button in Settings or Dashboard!

## 🔒 Privacy & Security

- ✅ 100% client-side application
- ✅ No data sent to servers
- ✅ All data stays on your device
- ✅ No cookies, no tracking
- ✅ No registration required
- ✅ Export data anytime
- ✅ Delete data anytime

## 📱 Mobile Optimization

Optimized for:
- Samsung S21 FE (1080 x 2340)
- iPhone 13 Pro (1170 x 2532)
- Google Pixel 6 (1080 x 2400)
- All modern smartphones

Features:
- Bottom navigation (easier thumb reach)
- Large touch targets (44px minimum)
- Optimized font sizes
- Responsive images
- Touch gestures
- PWA installable

## 🌐 Browser Support

- ✅ Chrome 90+ (Desktop & Mobile)
- ✅ Firefox 88+
- ✅ Safari 14+ (macOS & iOS)
- ✅ Edge 90+
- ✅ Samsung Internet
- ✅ Opera 76+

## 🎯 Your Journey

```
START:    99.8 kg
TARGET:   75.0 kg
TO LOSE:  24.8 kg
TIME:     12 months
RATE:     0.5-1 kg/week
```

## 📚 Documentation

- 📖 [QUICKSTART.md](QUICKSTART.md) - Get started in 60 seconds
- 📘 [USER_GUIDE.md](USER_GUIDE.md) - Complete user manual
- 📧 [EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md) - Email automation
- 🚀 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Hosting options
- 📊 [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Technical details

## 🐛 Troubleshooting

**Data not saving?**
- Check localStorage is enabled
- Don't use Incognito mode
- Export data weekly as backup

**Charts not showing?**
- Log data for 2-3 days first
- Refresh the page
- Try different browser

**Excel not exporting?**
- Use Chrome (recommended)
- Check browser allows downloads
- Ensure data is logged

**Email not working?**
- Verify EmailJS credentials
- Check spam folder
- See EMAIL_SETUP_GUIDE.md

## 💡 Pro Tips

1. **Log Daily** - Consistency is key!
2. **Weekly Export** - Backup to Excel every Sunday
3. **Take Photos** - Monthly progress photos
4. **Review Progress** - Check dashboard weekly
5. **Stay Consistent** - Small steps daily
6. **Use Reminders** - Enable notifications
7. **Follow Meal Plan** - 80-90% compliance
8. **Exercise Daily** - 30+ minutes

## 🤝 Contributing

This is a personal fitness tracker, but you can:
- Fork for your own journey
- Customize meal plans
- Add new exercises
- Create your own themes
- Share improvements

## 📄 License

MIT License - Free to use, modify, distribute

## 🎉 Success Stories

Track your progress and share your success! 💪

**Your journey from 99.8kg to 75kg starts NOW!**

## 📞 Support

- 📖 Read [USER_GUIDE.md](USER_GUIDE.md)
- 🐛 Check [Troubleshooting](#troubleshooting)
- 💬 Open GitHub Issue
- 📧 Email support

## 🌟 Acknowledgments

Built with:
- Chart.js for beautiful charts
- SheetJS for Excel export
- EmailJS for email automation
- Font Awesome for icons
- Love and dedication! ❤️

---

**⭐ Star this repo if it helps your fitness journey!**

**🚀 Deploy now and start your transformation!**

**💪 You've got this!**

---

Made with ❤️ for your fitness journey from 99.8kg to 75kg 🎯
