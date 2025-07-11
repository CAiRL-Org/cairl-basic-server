import Newsletter, { INewsletter } from "../models/Newsletter";
import { sendEmail } from "../utils/sendEmail";

export class NewsletterService {
  public async subscribe(
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    occupation: string,
    org: string,
    country: string,
    interests: string[]
  ): Promise<INewsletter> {
    const newSubscriber = new Newsletter({
      email,
      firstName,
      lastName,
      gender,
      occupation,
      org,
      country,
      interests,
    });
    const savedSubscriber = await newSubscriber.save();

    const emailSubject = "Subscription Confirmation";
    const emailHtml = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for subscribing!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 20px 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://res.cloudinary.com/dnyouhvwj/image/upload/v1750176660/footer-logo_jgk1wb.png" alt="Company Logo" width="150">
    </div>
    
    <div class="content">
        <h1>Thank You for Subscribing!</h1>
        
        <p>Dear ${firstName},</p>
        
        <p>We're delighted to welcome you to our community! You've successfully subscribed to our newsletter using the email address: <strong>${email}</strong>.</p>
        
        <p>As a subscriber, you'll receive:</p>
        <ul>
            <li>Our latest news and updates</li>
            <li>Exclusive offers and promotions</li>
            <li>Helpful tips and resources</li>
        </ul>
        
        <p>We promise to only send you valuable content and never spam your inbox.</p>
        
        <center>
            <a href="https://cairl.org" class="button">Visit Our Website</a>
        </center>
        
        <p>If you did not request this subscription, please <a href="https://cairl.org/unsubscribe?email=${email}">click here to unsubscribe</a>.</p>
        
        <p>Thank you again for your interest in our services!</p>
        
        <p>Best regards,<br>The CAiRL Team</p>
    </div>
    
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} CAiRL. All rights reserved.</p>
        <p>
            <a href="https://cairl.org/privacy">Privacy Policy</a> | 
            <a href="https://cairl.org/terms">Terms of Service</a>
        </p>
        <p>CAiRL, T-Hub 2.0, Hyderabad, Telangana 500081</p>
    </div>
</body>
</html>
    `;

    await sendEmail({ to: email, subject: emailSubject, html: emailHtml });

    return savedSubscriber;
  }

  public async getAllSubscribers(): Promise<INewsletter[]> {
    return await Newsletter.find();
  }

  public async checkSubscription(email: string): Promise<boolean> {
    const subscriber = await Newsletter.findOne({ email });
    return !!subscriber;
  }
}
