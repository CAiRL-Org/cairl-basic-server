import Webinar, { IWebinar } from '../models/Webinar';

export class WebinarService {
  public async createWebinar(webinarData: IWebinar): Promise<IWebinar> {
    const webinar = new Webinar(webinarData);
    return await webinar.save();
  }

  public async getWebinars(): Promise<IWebinar[]> {
    return await Webinar.find();
  }

  public async getWebinarById(id: string): Promise<IWebinar | null> {
    return await Webinar.findById(id);
  }

  public async updateWebinar(id: string, webinarData: Partial<IWebinar>): Promise<IWebinar | null> {
    return await Webinar.findByIdAndUpdate(id, webinarData, { new: true });
  }

  public async deleteWebinar(id: string): Promise<IWebinar | null> {
    return await Webinar.findByIdAndDelete(id);
  }
}
