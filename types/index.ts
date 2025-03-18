import type { DayjsType } from '@/plugins/dayjs'
import type { DemoAPI } from '~/apis/demo'

enum BuildENV {
  development = 'development',
  production = 'production',
}

enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
}

declare module '#app' {
  interface NuxtApp {
    $dayjs: DayjsType
    $demoAPI: DemoAPI
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $dayjs: DayjsType
    $demoAPI: DemoAPI
  }
}

export { BuildENV, HTTPMethod }
