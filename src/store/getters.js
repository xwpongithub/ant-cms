import variables from '@/styles/js-variables.scss'

export default {
  cssVars: () => variables,
  menuOpenKeys: state => state.app.menuOpenKeys,
  sidebarCollapsed: state => state.app.sidebarCollapsed,
  tagsViewList: state => state.app.tagsViewList
}
