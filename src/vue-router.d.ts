import 'vue-router';

declare module 'vue-router' {
    // eslint-disable-next-line no-unused-vars
    interface RouteMeta {
        requiresAuth?: boolean;
        requiredPermissions?: number;
        requiredProducer?: boolean;
    }
}
