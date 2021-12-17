import storage from 'good-storage'
import {SESSION_KEY_TAGS_VIEW, KEY_LANGUAGE} from '@/config/constant'

export default {
  namespaced: true,
  state: {
    menuOpenKeys: [],
    sidebarCollapsed: false,
    tagsViewList: storage.session.get(SESSION_KEY_TAGS_VIEW, []),
    language: storage.get(KEY_LANGUAGE, window.navigator.language.replaceAll('-', '_'))
  },
  mutations: {
    setMenuOpenKeys(state, keys) {
      state.menuOpenKeys = keys
    },
    setSidebarCollapsed(state, collapsed) {
      state.sidebarCollapsed = collapsed
    },
    addTagsView(state, tagView) {
      const tagsViewList = state.tagsViewList
      const hasTagView = tagsViewList.findIndex(
        item => item.name === tagView.name) > -1
      // 不存在才添加
      if (!hasTagView) {
        tagsViewList.push(tagView)
        storage.session.set(SESSION_KEY_TAGS_VIEW, tagsViewList)
      }
    },
    /**
     *
     * @param state
     * @param payload {
     *  index: number,
     *  type: 'other' || 'right' || 'index'
     *  }
     */
    removeTagsView(state, payload) {
      const tagsViewList = state.tagsViewList
      // 关闭当前
      if (payload.type === 'index') {
        tagsViewList.splice(payload.index, 1)
      // 删除其他
      } else if (payload.type === 'other') {
        tagsViewList.splice(payload.index + 1, tagsViewList.length - payload.index + 1)
        tagsViewList.splice(0, payload.index)
      // 删除右侧
      } else if (payload.type === 'right') {
        tagsViewList.splice(payload.index + 1, tagsViewList.length - payload.index + 1)
      }
      storage.session.set(SESSION_KEY_TAGS_VIEW, state.tagsViewList)
    },
    setLanguage(state, language) {
      state.language = language
      storage.set(KEY_LANGUAGE, language)
    },
    removeAllTagsView(state) {
      state.tagsViewList.length = 0
      storage.session.remove(SESSION_KEY_TAGS_VIEW)
    }
  }
}
