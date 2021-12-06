<template>
  <div class="container login-container">
    <a-form class="login-form" :rules="loginRules" :model="loginForm" ref="loginFormRef">
      <div class="title-content">
        <h3 class="title">用户登录</h3>
      </div>
      <a-form-item has-feedback ref="usernameRef" name="username">
        <a-input @focus="handleUsernameFocus" :readonly="usernameReadOnlyRef" @blur="handleUsernameBlur" v-model:value="loginForm.username" placeholder="请输入用户名" autocomplete="off" tabindex="1">
          <template #prefix>
            <user-outlined type="user" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item has-feedback ref="passwordRef" name="password">
        <a-input-password @focus="handlePasswordFocus" @blur="handlePasswordBlur" :readonly="passwordReadOnlyRef" v-model:value="loginForm.password" placeholder="请输入密码" autocomplete="off" tabindex="2">
          <template #prefix>
            <lock-outlined type="lock" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-button type="primary" :block="true" @click="submitForm">用户登录</a-button>
    </a-form>
  </div>
</template>

<script>
  import {ref, getCurrentInstance} from 'vue'
  import {UserOutlined, LockOutlined} from '@ant-design/icons-vue'

  export default {
    name: 'LoginView',
    components: {
      UserOutlined,
      LockOutlined
    }
  }
</script>

<script setup>
const instance = getCurrentInstance()
const {$message} = instance.appContext.config.globalProperties

const loginFormRef = ref(null)
// 禁止浏览器自动填充用户名和密码
const passwordReadOnlyRef = ref(true)
const usernameReadOnlyRef = ref(true)
// 登录所需字段
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

const handlePasswordFocus = () => passwordReadOnlyRef.value = false
const handlePasswordBlur = () => passwordReadOnlyRef.value = true
const handleUsernameFocus = () => usernameReadOnlyRef.value = false
const handleUsernameBlur = () => usernameReadOnlyRef.value = true

// 自定义密码验证规则
const validatePass = async (_rule, value) => {
  if (!value) {
    return Promise.reject(new Error('请输入密码'))
  } else if (value && value.length < 6) {
    return Promise.reject(new Error('密码不能少于6位'))
  }
  return Promise.resolve()
}

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePass, trigger: 'blur' }
  ]
}

// 提交登录表单
const submitForm = () => {
  loginFormRef.value
    .validate()
    .then(() => {

    })
    .catch(e => $message.error(e.message))
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$light_gray: #eee;
$cursor: #2d3a4b;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    :deep(.ant-input-affix-wrapper) {
      input {
        background: transparent;
        -webkit-appearance: none;
        padding: 5px;
        caret-color: $cursor;
      }
    }
  }
  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .title-content {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    :deep(.lang-select) {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  :deep(.ant-btn) {
    height:42px;
    padding:5px 0;
  }
}
</style>
