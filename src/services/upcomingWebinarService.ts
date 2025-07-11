import UpcomingWebinar from '../models/UpcomingWebinar';

const getAllUpcomingWebinars = async () => {
  const upcomingWebinars = await UpcomingWebinar.find({});
  return upcomingWebinars;
};

const createUpcomingWebinar = async (webinarData: any) => {
  const newWebinar = await UpcomingWebinar.create(webinarData);
  return newWebinar;
};

const getUpcomingWebinarById = async (id: string) => {
  const upcomingWebinar = await UpcomingWebinar.findById(id);
  return upcomingWebinar;
};

const updateUpcomingWebinar = async (id: string, webinarData: any) => {
  const upcomingWebinar = await UpcomingWebinar.findByIdAndUpdate(id, webinarData, { new: true });
  return upcomingWebinar;
};

const deleteUpcomingWebinar = async (id: string) => {
  const upcomingWebinar = await UpcomingWebinar.findByIdAndDelete(id);
  return upcomingWebinar;
};

export { getAllUpcomingWebinars, createUpcomingWebinar, getUpcomingWebinarById, updateUpcomingWebinar, deleteUpcomingWebinar };
