<template>

<div class="login-page">
    <div class="form">

      <form class="login-form" v-show="showLoginForm">
        <input type="text" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="password" />
        <button @click.prevent="login(email, password, this, callback)">login</button>
        <p class="message">Not registered? <a href="#" @click.prevent="toggleForm">Create an account</a></p>
      </form>

      <form class="register-form" v-show="!showLoginForm">
        <input type="text" v-model="name" placeholder="name" />
        <input type="password" v-model="password" placeholder="password" />
        <input type="text" v-model="email" placeholder="email address" />
        <input type="date" v-model="birthday" placeholder="birthday YYYY-MM-DD" />
        <input type="text" v-model="gender" placeholder="MALE=男 FEMALE=女 OTHER=其他" />
        <input type="text" v-model="country" placeholder="country" />

        <button @click.prevent="createAccount(name,password,email,birthday,gender,country)">create</button>
        <p class="message">Already registered? <a href="#" @click.prevent="toggleForm">Sign In</a></p>
      </form>


    </div>
  </div>


</template>

<script>
import { mapActions } from 'pinia'
import memberStore from '../stores/memberStore'


export default {
  data() {
    return {
      showLoginForm: true,
      name: '',
      email: '',
      password: '',
      birthday: '',
      gender: '',
      country:''
    };
  },
  computed: {
  },
  methods: {
    ...mapActions(memberStore, ['login', 'createAccount']),   
    toggleForm() {
      // 切换登录和注册表单的显示
      this.showLoginForm = !this.showLoginForm;
    },
    callback() {
      alert('ABC')
    }
  }
};
</script>

<style scoped>

@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
body {
  background: #76b852; /* fallback for old browsers */
  background: rgb(141,194,111);
  background: linear-gradient(90deg, rgba(141,194,111,1) 0%, rgba(118,184,82,1) 50%);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;      
}

</style>


