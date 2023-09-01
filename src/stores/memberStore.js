import { defineStore } from 'pinia'
import axios from 'axios';

export default defineStore('memberStore', {
  state: () => (
    {
      tokenToComponent: '',
      account: '',
      gender: '',
      displayName: '',
      memberTypes: ''
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
      const signupData = {
        displayName: name,
        password: password,
        email: email,
        birthday: birthday,
        gender: gender,
        country: country,
      };

      axios.post("https://tom-store-api.onrender.com/tom-store-api/member/signUp", signupData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          alert('Success!');
          history.go(-1);
        })
        .catch(error => {
          console.error(error);
          // Handle error here
        });

      // 清空表单
      this.name = '';
      this.password = '';
      this.email = '';

    },
    getMember() {

      const tokenNow = localStorage.getItem("shopCartToken");

      fetch("https://tom-store-api.onrender.com/tom-store-api/member", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': "Bearer" + " " + tokenNow
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.data)
          this.account = data.data.email
          this.gender = data.data.gender
          this.displayName = data.data.displayName
          // this.goToProductManage(data.data.memberTypes)
          this.memberTypes = data.data.memberTypes
        })

    },
    // goToProductManage(memberTypes) {
    //   // console.log('memberTypes')
    //   console.log(memberTypes)
    //   if (memberTypes === 'CUSTOMER') {
    //     // router.push({ path: '/productManage' });
    //     // router.push({ path: 'productManage' })
    //     this.router.push('/productManage')
    //   }
    // }


  }
})