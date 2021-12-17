import {
  message,
  Form,
  Input,
  Button,
  Layout,
  Dropdown,
  Image,
  Menu,
  Divider,
  Breadcrumb,
  Select,
  Spin,
  Result,
  Tooltip,
  ConfigProvider,
  Card,
  Table,
  Pagination,
  Tag,
  Modal,
  Checkbox,
  Col,
  Row,
  Tree
} from 'ant-design-vue'

export default app => {
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
  app.use(Breadcrumb)
  app.use(Select)
  app.use(Spin)
  app.use(Result)
  app.use(Tooltip)
  app.use(ConfigProvider)
  app.use(Card)
  app.use(Table)
  app.use(Pagination)
  app.use(Tag)
  app.use(Modal)
  app.use(Checkbox)
  app.use(Row)
  app.use(Col)
  app.use(Tree)
}
