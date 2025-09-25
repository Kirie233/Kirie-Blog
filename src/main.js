import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import Toast from 'vue-toastification'
import { Buffer } from 'buffer';
window.Buffer = Buffer;

// 引入CSS
import './assets/base.css'
import './assets/main.css'
import 'vue-toastification/dist/index.css'
import 'highlight.js/styles/atom-one-dark.css'

const app = createApp(App)

const toastOptions = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,
  toastClassName: "custom-toast",
  bodyClassName: ["custom-toast-body"],
};

app.use(router)
app.use(MotionPlugin)
app.use(Toast, toastOptions)

app.mount('#app')
