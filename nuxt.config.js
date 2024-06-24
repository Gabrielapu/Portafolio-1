import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'portafolio-front',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@sweetalert2/theme-material-ui',
    '@/assets/globalClasses.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/filters/filters.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',      
      '~/components/base/BaseTable',
      '~/components/base/BaseDotsMenu',
      '~/components/base/BaseSkeletonLoader',
      '~/components/base/BaseFiltersMenu',
      '~/components/base/BaseItemSelector',
      '~/components/base/BaseDeleteSelectedItems',
      '~/components/base/BaseCrudDialog',
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dayjs',
    'vue-sweetalert2/nuxt/no-css',
  ],

  dayjs: {
    locales: ['es'],
    defaultLocale: 'es',
    plugins: [
      'weekOfYear',
      'isBetween'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_API_URL || 'http://localhost:8000/api/',
  },

  router: {
    middleware: [
      'checkIfForm',
      'checkNoNavbar',
      'auth'
    ],
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken1,
          warning: colors.yellow.accent4
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {    
    // Disable HMR messages
    hotMiddleware: {
      client: {
        noInfo: true,
      },
    },
  },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access',
          maxAge: 60 * 60 * 24, // 1 Dia
          global: true,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
          maxAge: 60 * 60 * 24, // 1 Dia
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: '/login/', method: 'post' },
          refresh: { url: '/refresh/', method: 'post' },
          user: false,
          logout: false
        },
      }
    },
    redirect: {
      login: '/login',
      home: '/',
      logout: '/login'
    }
  }
}
