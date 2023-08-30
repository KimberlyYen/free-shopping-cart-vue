import { defineStore } from 'pinia'
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router'

export default defineStore('memberStore', {
  state: () => (
    {
      tokenToComponent: '',
    }
  ),
  actions: {
    // this
    login(email, password) {
      // 获取用户名和密码        
      // console.log(email)
      // console.log(password)


      // 在这里可以进行进一步的处理，例如登录验证

      const loginData = {
        email: email,
        password: password,
      };

      axios.post("https://tom-store-api.onrender.com/tom-store-api/member/login", loginData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          const data = response.data;
          const token = data.data.access_token;
          localStorage.setItem('shopCartToken', token);
          alert('Success!');
          history.go(-1);
        })
        .catch(error => {
          console.error(error);
          if (error.response) {
            alert("Error: " + error.response.data.rm);
          } else {
            alert("An error occurred");
          }
        })
        .finally(() => {
          // ...
        });

      // 清空表单
      this.username = '';
      this.password = '';
    },
    createAccount(name, password, email, birthday, gender, country) {
      // 获取用户名、密码和邮箱

      // 在这里可以进行进一步的处理，例如创建账号


      // fetch("https://tom-store-api.onrender.com/tom-store-api/member/signUp", {
      //       method: "POST",
      //       headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //       },
      //   body: JSON.stringify({
      //           "displayName":name,
      //           "password": password,
      //           "email": email,
      //           "birthday": birthday,
      //           "gender": gender,
      //           "country": country,
      //       }),
      //   })
      //   .then(response => response.json())
      //   .then(data => {
      //     // console.log(data)
      //     alert('Success!')
      //       // this.$router.push('/');
      //      history.go(-1)

      //   })

      // 清空表单
      this.name = '';
      this.password = '';
      this.email = '';

    },



  }
})