import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import InputText from 'primevue/inputtext';


const app = createApp(App); 
app.use(PrimeVue);
app.component('InputText', InputText);
app.mount('#app');