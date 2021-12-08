export default {
  namespaced: true,
  state: {
    menuOpenKeys: [],
    sidebarCollapsed: false
  },
  mutations: {
    setMenuOpenKeys(state, keys) {
      state.menuOpenKeys = keys
    },
    setSidebarCollapsed(state, collapsed) {
      state.sidebarCollapsed = collapsed
    }
  }
}
