<template>
  <div style="width: 300px;margin: 0px auto;border-radius: 30px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户登陆</span>
      </div>
      <el-input v-model="loginForm.username"  placeholder="请输入用户名"></el-input>
      <br><br>
      <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
      <br><br>
      <el-button type="primary" v-on:click="login"  style="width: 150px">登录</el-button>
    </el-card>

  </div>
</template>

<script>
    import qs from 'Qs'
    export default {
        name: 'Login',
        data () {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                responseResult: []
            }
        },
        methods: {
            login () {
                this.$axios
                    .post('/api/login', qs.stringify({
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    }))
                    .then(successResponse => {
                        if (successResponse.data.code === 200) {
                            this.$router.replace({path: '/index'})
                        }
                    })
                    .catch(failResponse => {
                    })
            }
        }
    }
</script>
