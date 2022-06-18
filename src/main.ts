import App from './App.svelte';
import { useRegisterSW } from 'virtual:pwa-register/svelte';

const app: App = new App({ target: document.body });

useRegisterSW({ immediate: true });

export default app;
