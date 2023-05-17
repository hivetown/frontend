import { createApp } from 'vue';
import ErrorPopup from '@/components/errors/ErrorPopup.vue';

export function createPopup(message: string, type: string) {
    const WarningPopupComponent = createApp(ErrorPopup, { message, type });
    const warningPopupInstance = WarningPopupComponent.mount(
        document.createElement('div')
    );

    document.body.appendChild(warningPopupInstance.$el);

    setTimeout(() => {
        document.body.removeChild(warningPopupInstance.$el);
    }, 3000);
}
