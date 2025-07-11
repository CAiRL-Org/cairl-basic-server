
import Newsletter, { INewsletter } from '../models/Newsletter';

export class NewsletterService {
  public async subscribe(email: string, firstName: string, lastName: string, gender: string, occupation: string, org: string, country: string, interests: string[]): Promise<INewsletter> {
    const newSubscriber = new Newsletter({ email, firstName, lastName, gender, occupation, org, country, interests });
    return await newSubscriber.save();
  }

  public async getAllSubscribers(): Promise<INewsletter[]> {
    return await Newsletter.find();
  }

  public async checkSubscription(email: string): Promise<boolean> {
    const subscriber = await Newsletter.findOne({ email });
    return !!subscriber;
  }
}
