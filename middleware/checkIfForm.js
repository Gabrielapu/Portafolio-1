import { FORM_PAGES } from '@/enums'

export default ({ route, store }) => {
    if (FORM_PAGES.includes(route.name)){
      store.commit('global/setIsForm', true);
    }
    else {
      store.commit('global/setIsForm', false);
    }
  };