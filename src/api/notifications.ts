import { api } from './_base';
export const getUnreadNotifications = async () =>
    api.get<Notification>('/notifications?unreadOnly=true');

export const getAllNotifications = async (page?: number, pageSize?: number) =>
    api.get<Notification>('/notifications', {
        params: { page, pageSize },
    });
export const postRead = async (id: number) =>
    api.post<Notification>(`/notifications/${id}/read`);
export const postUnread = async (id: number) =>
    api.post<Notification>(`/notifications/${id}/unread`);
