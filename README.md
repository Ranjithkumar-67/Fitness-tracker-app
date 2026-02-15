# 🏃‍♂️ 75kg Journey - Complete Fitness Tracking System

A **production-ready, full-featured fitness tracking web application** designed specifically for your weight loss journey from 99.8kg to 75kg.

## 🌟 Features

### 📊 Dashboard & Analytics
- **Real-time weight tracking** with interactive charts
- **Progress visualization** showing your journey from start to goal
- **Streak tracking** to keep you motivated
- **Daily checklist** for quick habit tracking
- **Statistics cards** showing current status and remaining goals

### 📝 Daily Activity Logging
- Complete meal tracking (6 meals/day)
- Water intake monitoring (visual glass tracker)
- Exercise and activity logging
- Mood and energy level tracking
- Sleep time recording
- Notes for wins and challenges

### 🍽️ Meal Planning
- **Pre-configured weekly meal plans** tailored to your needs
- Calorie-optimized meals (1,500-1,600 kcal/day)
- **Greens, cereals, and sprouts rotation**
- Automatic shopping list generation
- Weekly meal rotation system

### 💪 Exercise Tracking
- Morning workout routines (15 minutes)
- Targeted exercises for thighs, butt, and mid-section
- Weekend activity plans
- **Built-in workout timer** with alerts
- Exercise duration tracking

### 📸 Progress Tracking
- **Photo upload** for before/after comparisons
- Monthly progress photos
- **Measurements tracking** (chest, waist, hip, thigh)
- Visual progress charts
- Milestone tracking system

### 📧 Email Automation
- **Automated weekly email reports** (via EmailJS)
- Monthly summary emails
- Customizable report timing
- Comprehensive weekly statistics

### 📥 Data Management
- **Excel export** with multiple sheets:
  - Daily Logs
  - Weight Progress
  - Measurements
  - Weekly Summary
  - Meal Tracking
- Data backup & restore
- Import/export functionality
- **Auto-save** every minute
- Local storage persistence

### 🔔 Smart Reminders
- Wake up reminder (6:15 AM)
- Workout reminder (6:20 AM)
- Meal time reminders (breakfast, lunch, dinner)
- Evening snack reminder (4:00 PM)
- Sleep reminder (10:30 PM)
- Browser notifications support

## 🚀 Quick Start

### Option 1: Direct Use (No Installation Required)

1. **Download all files** to a folder
2. **Open `index.html`** in any modern web browser
3. **Start logging!** No server needed!

### Option 2: Local Server (Recommended for Development)

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

### Option 3: Deploy to Web

#### Deploy to Netlify (Free)
1. Go to [Netlify](https://www.netlify.com/)
2. Drag and drop the entire folder
3. Your app is live!

#### Deploy to Vercel (Free)
```bash
npm install -g vercel
vercel
```

#### Deploy to GitHub Pages
1. Create a GitHub repository
2. Push all files
3. Enable GitHub Pages in settings
4. Access at: `https://yourusername.github.io/repo-name`

## 📦 What's Included

```
fitness-tracker-app/
├── index.html          # Main application HTML
├── styles.css          # Complete styling (responsive)
├── app.js              # Full JavaScript functionality
├── README.md           # This file
└── package.json        # NPM configuration (optional)
```

## 🔧 Setup Email Automation

### EmailJS Configuration (Free Tier Available)

1. **Create EmailJS Account**
   - Visit: https://www.emailjs.com/
   - Sign up for free account

2. **Setup Email Service**
   - Add email service (Gmail recommended)
   - Get your Service ID

3. **Create Email Template**
   - Create a new template
   - Use these variables in your template:
     ```
     {{to_name}}
     {{week_number}}
     {{current_weight}}
     {{weight_lost}}
     {{remaining}}
     {{days_logged}}
     {{avg_water}}
     {{total_exercise}}
     {{greens_days}}
     {{sprouts_days}}
     ```

4. **Configure in App**
   - Go to Settings page
   - Click "Setup Email Reports"
   - Enter your Service ID, Template ID, and Public Key
   - Enable weekly/monthly reports

### Sample Email Template

```
Hello {{to_name}},

Here's your Week {{week_number}} Progress Report:

Weight Progress:
- Current Weight: {{current_weight}}kg
- Weight Lost: {{weight_lost}}kg
- Remaining: {{remaining}}kg to goal

This Week's Statistics:
- Days Logged: {{days_logged}}/7
- Average Water Intake: {{avg_water}} glasses/day
- Total Exercise: {{total_exercise}} minutes
- Days with Greens: {{greens_days}}
- Days with Sprouts: {{sprouts_days}}

Keep up the great work! You're making progress! 💪

Best regards,
Your Fitness Tracker
```

## 📊 Excel Export Details

The app exports **5 comprehensive sheets**:

1. **Daily Logs** - All daily entries with complete data
2. **Weight Progress** - Weight tracking with calculations
3. **Measurements** - Body measurements over time
4. **Weekly Summary** - Aggregated weekly statistics
5. **Meal Tracking** - All meals logged

### Export Features:
- Automatic date formatting
- Calculated fields (progress %, weight lost, etc.)
- Weekly averages
- Clean, professional formatting

## 💾 Data Storage

### Local Storage
- All data saved in browser's localStorage
- **Auto-save every 60 seconds**
- Manual save on form submission
- Data persists across sessions

### Backup Options
1. **Automatic Backup** - Use "Backup Data" button to download JSON
2. **Excel Export** - Regular Excel exports for external storage
3. **Import Data** - Restore from JSON backup

### Data Privacy
- **100% client-side** - No data sent to servers
- **Your data stays on your device**
- Backups can be stored locally or in personal cloud

## 🎨 Features Breakdown

### Dashboard Analytics
```javascript
- Current Weight Display
- Target Weight Tracking
- Days Streak Calculator
- Progress Percentage
- Weight Change from Start
- Interactive Weight Chart (Chart.js)
- Today's Checklist (8 items)
- Quick Action Buttons
```

### Daily Logging System
```javascript
- Date Selection
- Weight Entry (Sunday tracking)
- 5 Measurement Fields
- 6 Meal Entries
- Water Intake (Visual Tracker)
- 5 Exercise Checkboxes
- Greens/Sprouts Tracking
- Mood & Energy Levels
- Sleep Time Tracking
- Wins & Challenges Notes
```

### Meal Planning
```javascript
- 7-Day Meal Plan (Week 1)
- 6 Meals per Day
- Calorie Information
- Greens/Cereals/Sprouts Rotation
- Shopping List Generator
- Multiple Week Support
```

### Exercise System
```javascript
- Morning Routine (15 min)
- Evening Options
- Targeted Exercises:
  * Thighs (4 exercises)
  * Butt (4 exercises)
  * Mid-section (4 exercises)
- Weekend Plans
- Workout Timer (built-in)
```

## 📱 Mobile Responsive

The app is **fully responsive** and works on:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px - 1920px)
- ✅ Tablet (768px - 1366px)
- ✅ Mobile (320px - 768px)

## 🎯 Usage Tips

### Getting Started
1. **First time setup**:
   - Go to Settings
   - Enter your name and email
   - Confirm starting weight (99.8kg)
   - Set start date

2. **Daily Routine**:
   - Log your data each day
   - Check off daily checklist
   - Review dashboard progress

3. **Weekly Tasks**:
   - Weigh yourself (Sundays)
   - Take measurements (bi-weekly)
   - Export data to Excel

4. **Monthly Tasks**:
   - Upload progress photos
   - Review milestone progress
   - Backup your data

### Best Practices
- ✅ Log data at end of each day
- ✅ Be honest with entries
- ✅ Weekly Excel exports for backup
- ✅ Upload photos monthly
- ✅ Review progress weekly
- ✅ Use reminders feature

## 🔐 Browser Compatibility

Tested and working on:
- ✅ Google Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

Minimum Requirements:
- Modern browser (2020+)
- JavaScript enabled
- LocalStorage support
- 10MB free storage

## 🛠️ Customization

### Colors
Edit `styles.css` - `:root` variables:
```css
--primary: #4F46E5;        /* Change main color */
--success: #10B981;        /* Change success color */
--warning: #F59E0B;        /* Change warning color */
```

### Meal Plans
Edit `app.js` - `mealPlans` object to customize meals

### Exercise Routines
Edit `app.js` - `exercises` object in `showExerciseTab()`

### Reminders
Edit `app.js` - `setupDailyReminders()` function

## 📈 Analytics & Insights

The app tracks:
- Daily weight progress
- Weekly averages
- Measurement changes
- Habit compliance
- Streak tracking
- Water intake patterns
- Exercise consistency
- Meal adherence

## 🤝 Support

### Troubleshooting

**Data not saving?**
- Check browser localStorage is enabled
- Try different browser
- Export data and reimport

**Charts not showing?**
- Wait for data to populate
- Refresh the page
- Check browser console for errors

**Email not sending?**
- Verify EmailJS configuration
- Check Service ID and Template ID
- Ensure email is set in Settings

**Excel export not working?**
- Ensure XLSX library loaded
- Check browser compatibility
- Try different browser

## 📄 License

This project is **open source** and free to use for personal fitness tracking.

## 🎉 Roadmap

Future enhancements planned:
- [ ] Cloud sync option
- [ ] Mobile app version
- [ ] Calorie calculator
- [ ] Barcode food scanner
- [ ] Social sharing
- [ ] AI meal suggestions
- [ ] Video exercise guides
- [ ] Voice logging

## 💡 Tips for Success

1. **Consistency is key** - Log every day
2. **Be honest** - Accurate data = better insights
3. **Review weekly** - Check your progress
4. **Adjust as needed** - Modify plans based on results
5. **Celebrate wins** - Acknowledge small victories
6. **Stay motivated** - Use streak tracking
7. **Backup regularly** - Export data weekly
8. **Use reminders** - Enable notifications

## 🏆 Achievement System

Track your milestones:
- ✅ First week completed
- ✅ 1kg lost
- ✅ 5kg lost
- ✅ 10kg lost
- ✅ 15kg lost
- ✅ 20kg lost
- ✅ Goal achieved (75kg)!

## 📞 Contact

For issues or suggestions:
- Create GitHub issue
- Email support
- Community forum

---

**Built with** ❤️ **for your fitness journey**

**Technologies Used:**
- Pure JavaScript (Vanilla JS)
- Chart.js for charts
- SheetJS (XLSX) for Excel export
- EmailJS for email automation
- Local Storage API for data persistence
- Responsive CSS Grid & Flexbox

**Version:** 1.0.0  
**Last Updated:** February 2026

---

## 🎯 Your Goal: 99.8kg → 75kg

**You've got this! Every day is a step closer to your goal!** 💪

Start your journey today!
