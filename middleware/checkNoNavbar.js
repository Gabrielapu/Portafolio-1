import { NO_NAVBAR_PAGES } from '@/enums'

export default ({ route, store }) => {
  if (NO_NAVBAR_PAGES.includes(route.name)){
    store.commit('global/setIsHome', true);
  }
  else {
    store.commit('global/setIsHome', false);
  }
};