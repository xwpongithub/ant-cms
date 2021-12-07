import {
  message,
  Form,
  Input,
  Button,
  Layout,
  Dropdown,
  Image,
  Menu,
  Divider
} from 'ant-design-vue'

export default function installAntd(app) {
  app.config.globalProperties.$message = message
  app.provide('$message', app.config.globalProperties.$message)
  app.use(Form)
  app.use(Input)
  app.use(Button)
  app.use(Layout)
  app.use(Dropdown)
  app.use(Image)
  app.use(Menu)
  app.use(Divider)
}
