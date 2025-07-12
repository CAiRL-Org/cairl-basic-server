# Email Configuration Guide

## Overview

This application uses Nodemailer to send emails. In development mode, it uses Ethereal Email (a fake SMTP service) for testing. In production mode, it's configured to use Gmail SMTP.

## Development Environment

In development mode, the application automatically creates a test account with Ethereal Email. You don't need to configure anything. When an email is sent, you'll see a preview URL in the logs that you can use to view the email.

## Production Environment with Gmail

To use Gmail in production, you need to set up an App Password. This is because Google has disabled the "Less Secure Apps" option, and regular passwords won't work with SMTP anymore.

### Step 1: Enable 2-Step Verification

1. Go to your Google Account: [https://myaccount.google.com/](https://myaccount.google.com/)
2. Select "Security" from the left navigation panel
3. Under "Signing in to Google," select "2-Step Verification"
4. Follow the steps to turn on 2-Step Verification

### Step 2: Create an App Password

1. Go to your Google Account: [https://myaccount.google.com/](https://myaccount.google.com/)
2. Select "Security" from the left navigation panel
3. Under "Signing in to Google," select "App passwords" (you'll only see this option if 2-Step Verification is enabled)
4. At the bottom, select "Select app" and choose "Mail"
5. Select "Select device" and choose "Other"
6. Enter a name (e.g., "CAiRL Server")
7. Select "Generate"
8. The app password is the 16-character code that appears on your screen
9. Copy this password (without spaces)

### Step 3: Configure Environment Variables

Add the following variables to your `.env` file:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_APP_PASSWORD=your16characterapppassword
EMAIL_FROM=your_gmail_address@gmail.com
```

## Troubleshooting

### 500 Internal Server Error

If you're getting a 500 Internal Server Error when sending emails in production:

1. Make sure you've set up an App Password correctly
2. Verify that `EMAIL_APP_PASSWORD` is set in your environment variables
3. Check that 2-Step Verification is enabled on your Google account
4. Look at the server logs for more detailed error messages

### Email Not Being Delivered

1. Check your spam/junk folder
2. Verify that your Gmail account doesn't have any sending limits or restrictions
3. Make sure your Gmail account hasn't been flagged for suspicious activity

### SMTP Connection Errors

1. Verify that your firewall or network isn't blocking outgoing SMTP connections
2. Check that the `EMAIL_HOST`, `EMAIL_PORT`, and `EMAIL_SECURE` settings are correct
3. Try using port 587 with `EMAIL_SECURE=false` as an alternative configuration

## Alternative Email Providers

If you prefer not to use Gmail, you can configure the application to use other email providers:

### SendGrid

```
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=your_sendgrid_api_key
EMAIL_FROM=your_verified_sender@example.com
```

### Mailgun

```
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=postmaster@your_domain.mailgun.org
EMAIL_PASS=your_mailgun_password
EMAIL_FROM=your_verified_sender@your_domain.com
```