import { createApp } from 'vue'
import App from './App.vue'
import WarningDiv from './components/WarningDiv.vue';
import './index.css'

const app = createApp(App);
app.component("WarningDiv",WarningDiv);
app.mount('#app');
