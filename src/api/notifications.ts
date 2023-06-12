import { api } from './_base';
export const getUnreadNotifications = async () =>
    api.get('/notifications?unreadOnly=true');

export const getAllNotifications = async (page?: number, pageSize?: number) =>
    api.get('/notifications', {
        params: { page, pageSize },
    });
export const postRead = async (id: number) =>
    api.post<Notification>(`/notifications/${id}/read`);
export const postUnread = async (id: number) =>
    api.post<Notification>(`/notifications/${id}/unread`);
