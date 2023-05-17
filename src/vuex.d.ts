import { AuthenticatedUser } from '@/types';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
    interface State {
        user?: AuthenticatedUser;
        token?: string;
    }

    // eslint-disable-next-line no-unused-vars
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
