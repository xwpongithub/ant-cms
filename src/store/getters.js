import variables from '@/styles/js-variables.scss'

export default {
  cssVars: () => variables,
  sidebarCollapsed: state => state.app.sidebarCollapsed
}
