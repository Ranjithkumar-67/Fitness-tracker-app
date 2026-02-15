# 📧 Email Automation Setup Guide

This guide will help you set up automated weekly and monthly email reports for your fitness tracker.

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up"** (Free tier available)
3. Verify your email address
4. Login to your dashboard

### Step 2: Add Email Service

1. Click **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (Recommended - Easy setup)
   - Outlook
   - Yahoo
   - Custom SMTP
4. Click **"Connect Account"**
5. **For Gmail:**
   - Login with your Gmail account
   - Allow EmailJS to send emails
   - Note down your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Click **"Email Templates"** in sidebar
2. Click **"Create New Template"**
3. **Template Name:** "Weekly Fitness Report"
4. **Use this template:**

```
Subject: Your Week {{week_number}} Fitness Progress Report 🏃‍♂️

Hello {{to_name}},

Congratulations on completing Week {{week_number}} of your fitness journey!

📊 WEIGHT PROGRESS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Current Weight: {{current_weight}} kg
• Weight Lost So Far: {{weight_lost}} kg 🎉
• Remaining to Goal (75kg): {{remaining}} kg
• Progress: You're {{progress_percent}}% to your goal!

📈 THIS WEEK'S STATS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Days Logged: {{days_logged}}/7
• Average Water Intake: {{avg_water}} glasses/day 💧
• Total Exercise: {{total_exercise}} minutes 💪
• Days with Greens: {{greens_days}}/7 🥬
• Days with Sprouts: {{sprouts_days}}/7 🌱
• Average Energy Level: {{avg_energy}}/10 ⚡

🎯 NEXT WEEK'S GOALS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Log all 7 days
✓ Drink 12+ glasses of water daily
✓ Exercise at least 30 minutes/day
✓ Eat greens every day
✓ Include sprouts in at least 5 meals

💡 WEEKLY TIP:
Remember: Consistency beats perfection! Every small step counts.
Your body is transforming - keep going! 🌟

📊 VIEW DETAILED PROGRESS:
Open your fitness tracker to see charts and detailed analytics.

Keep crushing it! You're doing amazing! 💪

Best regards,
Your Fitness Tracking System

---
Journey Started: {{start_date}}
Target: 75kg
You've got this! 🎯
```

5. Click **"Save"**
6. Note down your **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key

1. Click **"Account"** in sidebar
2. Go to **"API Keys"** tab
3. Copy your **Public Key** (e.g., `pk_abc123xyz`)

### Step 5: Configure in App

1. Open your Fitness Tracker app
2. Go to **"Settings"** page
3. Click **"Setup Email Reports"** button
4. Enter the following:
   - **Service ID:** (from Step 2)
   - **Template ID:** (from Step 3)
   - **Public Key:** (from Step 4)
5. Click **"Save Configuration"**
6. Enable **"Send Weekly Progress Report"** checkbox
7. Set your preferred **report time** (default: 8:00 AM)
8. Click **"Save All Settings"**

## 🎨 Email Template Customization

### Available Variables

Use these variables in your email template:

#### User Info
- `{{to_name}}` - User's name
- `{{to_email}}` - User's email
- `{{start_date}}` - Journey start date

#### Current Progress
- `{{week_number}}` - Current week number
- `{{current_weight}}` - Latest weight in kg
- `{{weight_lost}}` - Total weight lost from start
- `{{remaining}}` - Weight remaining to goal
- `{{progress_percent}}` - Percentage of goal achieved

#### Weekly Stats
- `{{days_logged}}` - Days logged this week (out of 7)
- `{{avg_water}}` - Average water glasses per day
- `{{total_exercise}}` - Total exercise minutes
- `{{greens_days}}` - Days greens were eaten
- `{{sprouts_days}}` - Days sprouts were eaten
- `{{avg_energy}}` - Average energy level (1-10)

### Example Templates

#### Motivational Template
```
🎊 Week {{week_number}} - You're Crushing It!

Hey {{to_name}}! 👋

You've lost {{weight_lost}}kg so far! That's incredible! 💪

Only {{remaining}}kg more to reach your 75kg goal!

This week you:
✓ Logged {{days_logged}} days
✓ Drank {{avg_water}} glasses of water daily
✓ Exercised {{total_exercise}} minutes total

Keep this momentum going! You're unstoppable! 🔥
```

#### Detailed Analytics Template
```
📊 WEEKLY FITNESS ANALYTICS - WEEK {{week_number}}

Dear {{to_name}},

WEIGHT TRACKING:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Start: 99.8 kg
Current: {{current_weight}} kg (-{{weight_lost}}kg)
Target: 75.0 kg ({{remaining}}kg to go)
Progress: {{progress_percent}}%

COMPLIANCE METRICS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Logging: {{days_logged}}/7 days ({{logging_percent}}%)
Hydration: {{avg_water}}/12 glasses ({{water_percent}}%)
Exercise: {{total_exercise}}/210 min ({{exercise_percent}}%)
Nutrition: {{greens_days}}/7 greens, {{sprouts_days}}/7 sprouts

RECOMMENDATIONS:
{{#if low_water}}⚠️ Increase water intake{{/if}}
{{#if low_exercise}}⚠️ Add more exercise{{/if}}
{{#if low_greens}}⚠️ Eat more greens{{/if}}

Stay consistent! 💪
```

#### Simple Summary Template
```
Week {{week_number}} Summary 📈

Hi {{to_name}},

Weight: {{current_weight}}kg ({{weight_lost}}kg lost!)
Exercise: {{total_exercise}} minutes
Water: {{avg_water}} glasses/day

Goal: {{remaining}}kg to go!

Keep going! 🎯
```

## 📅 Scheduling Options

### Automatic Weekly Reports

The app checks every minute if it's Sunday and sends the report automatically.

**Configuration:**
1. Enable "Send Weekly Progress Report" in Settings
2. Set preferred time (e.g., 8:00 AM)
3. The app will send every Sunday at that time

### Manual Reports

**Send Report Anytime:**
1. Go to Dashboard
2. Click "Setup Email Reports"
3. Click "Send Weekly Report Now"

### Monthly Reports

**Setup Monthly Reports:**
1. Create another template called "Monthly Summary"
2. Use Template ID in settings
3. Enable "Send Monthly Summary Report"
4. Reports sent on 1st of each month

## 🔧 Advanced Configuration

### Multiple Email Services

You can set up different services for different reports:

1. **Service 1:** Gmail for weekly reports
2. **Service 2:** Outlook for monthly reports

Each template can use a different service.

### Custom Styling

Add HTML to your templates:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #4F46E5;">Week {{week_number}} Report</h1>
  <div style="background: #f3f4f6; padding: 20px; border-radius: 10px;">
    <h2>Weight: {{current_weight}}kg</h2>
    <p>Lost: <strong style="color: #10B981;">{{weight_lost}}kg</strong></p>
  </div>
</div>
```

### Testing Your Template

1. Go to EmailJS Template editor
2. Click **"Test It"** button
3. Fill in sample values
4. Click **"Send Test Email"**
5. Check your inbox

## 🛡️ Security & Privacy

### Best Practices

1. **Never share your Public Key publicly**
2. **Use environment variables** for production
3. **Enable EmailJS security features:**
   - Domain restrictions
   - Rate limiting
   - Email verification

### EmailJS Free Tier Limits

- **200 emails/month** (Free)
- Upgrade for more:
  - Basic: 1,000 emails/month
  - Professional: 10,000 emails/month

### Data Privacy

- EmailJS only sends data you configure
- No personal data stored on EmailJS servers
- All data remains in your app's localStorage

## 🐛 Troubleshooting

### Email Not Sending

**Problem:** Emails not received

**Solutions:**
1. Check spam/junk folder
2. Verify Service ID, Template ID, Public Key
3. Check EmailJS dashboard for error logs
4. Ensure email address is set in Settings
5. Test template in EmailJS dashboard

### Template Variables Not Working

**Problem:** Variables showing as `{{variable_name}}`

**Solutions:**
1. Ensure variable names match exactly
2. Check app is passing correct data
3. Test in EmailJS with sample data
4. Verify template syntax

### Rate Limit Exceeded

**Problem:** "Rate limit exceeded" error

**Solutions:**
1. Check EmailJS monthly limit
2. Reduce frequency of test emails
3. Upgrade EmailJS plan if needed

## 📱 Mobile Notifications

In addition to emails, enable browser notifications:

1. Grant notification permission when prompted
2. App sends reminders at set times:
   - 6:15 AM - Wake up
   - 6:20 AM - Workout
   - 8:30 AM - Breakfast
   - 1:00 PM - Lunch
   - 4:00 PM - Evening snack
   - 8:30 PM - Dinner
   - 10:30 PM - Sleep

## 🎯 Best Practices

1. **Test First:** Send test emails before enabling automation
2. **Weekly Reports:** Enable for consistent motivation
3. **Review Dashboard:** Use emails as summary, app for details
4. **Backup Data:** Email reports serve as backup record
5. **Adjust Timing:** Set report time when you check email

## 📊 Sample Email Report

Here's what your weekly email will look like:

---

**Subject:** Your Week 5 Fitness Progress Report 🏃‍♂️

Hello John,

Congratulations on completing Week 5 of your fitness journey!

📊 WEIGHT PROGRESS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Current Weight: 95.2 kg
• Weight Lost So Far: 4.6 kg 🎉
• Remaining to Goal (75kg): 20.2 kg
• Progress: You're 18.5% to your goal!

📈 THIS WEEK'S STATS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Days Logged: 7/7
• Average Water Intake: 13.2 glasses/day 💧
• Total Exercise: 245 minutes 💪
• Days with Greens: 7/7 🥬
• Days with Sprouts: 6/7 🌱
• Average Energy Level: 7.5/10 ⚡

Keep crushing it! You're doing amazing! 💪

---

## 🎓 Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [HTML Email Best Practices](https://templates.mailchimp.com/resources/email-template-guide/)
- [Email Template Testing Tools](https://www.emailonacid.com/)

## 💬 Support

Need help? Contact:
- EmailJS Support: support@emailjs.com
- App Issues: Create GitHub issue

---

**Happy Tracking!** 🎉

Your automated reports will keep you motivated and accountable throughout your 75kg journey!
