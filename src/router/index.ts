import { createRouter, createWebHistory } from 'vue-router'
import Reservation from '~/views/reservation';
import Clients from '~/views/clients'
import Chats from '~/views/chats'
import Instructors from '~/views/instructors';
import shootRange from '~/views/shootRange';
import CalendarWidget from '~/views/calendarWidget';
import Home from '~/views/home';
import Kxo from '~/views/kxo';
import Settings from '~/views/settings';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...Reservation, ...Clients, ...Chats, ...Instructors, ...shootRange, ...CalendarWidget, ...Home, ...Kxo, ...Settings],
})

export default router
