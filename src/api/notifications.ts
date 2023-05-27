import { api } from './_base';
export const getUnreadNotifications = async () =>
    api.get<Notification>("/notifications?unreadOnly=true");

export const getAllNotifications = async () =>
    api.get<Notification>("/notifications");
