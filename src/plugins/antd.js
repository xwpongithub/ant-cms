import { message } from 'ant-design-vue'

export default function installAntd(app) {
  app.config.globalProperties.$message = message
}
