import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    needAuth?: boolean;
    showInNavigation?: boolean;
    routeTitle?: string;
    routeIcon?: string;
    order?: number;
  }
}
