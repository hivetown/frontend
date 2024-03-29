import { api } from './_base';
import { BaseItems, Notification } from '@/types';
export const getUnreadNotifications = async () =>
    api.get<BaseItems<Notification>>('/notifications?unreadOnly=true');

export const getAllNotifications = async (page?: number, pageSize?: number) =>
    api.get<BaseItems<Notification>>('/notifications?unreadOnly=false', {
        params: { page, pageSize },
    });
export const postRead = async (id: number) =>
    api.post<Notification>(`/notifications/${id}/read`);
export const postUnread = async (id: number) =>
    api.post<Notification>(`/notifications/${id}/unread`);
export const deleteNotification = async (id: number) =>
    api.delete<Notification>(`/notifications/${id}`);
