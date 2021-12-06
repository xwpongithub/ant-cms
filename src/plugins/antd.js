import {
  message,
  Form,
  Input,
  Button
} from 'ant-design-vue'

export default function installAntd(app) {
  app.config.globalProperties.$message = message
  app.provide('$message', app.config.globalProperties.$message)
  app.use(Form)
  app.use(Input)
  app.use(Button)
}
