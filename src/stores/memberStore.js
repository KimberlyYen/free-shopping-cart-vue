import { defineStore } from 'pinia'
import axios from 'axios';

export default defineStore('memberStore', {
  state: () => (
    {
      tokenToComponent: '',
      account: '',
      newAccount: '',
      memberData: {},
      updateAccount: '',
      memberTypes: '',
      password: '',
      birthday: '',
      country: '',
      displayName: '',
      gender: '',
      note: '',

    }
  ),
  actions: {
    // this
    login(email, password, this_, callback) {
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
          // callback()
          alert('Success!');
          this_.$router.push('./')
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

      axios.get("https://tom-store-api.onrender.com/tom-store-api/member", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': "Bearer " + tokenNow
        }
      })
        .then(response => {
          const data = response.data;
          // console.log(data.data);
          this.memberData = data.data
          // 在这里设置您的变量，如下所示
          this.birthday = data.data.birthday
          this.country = data.data.country
          this.displayName = data.data.displayName;
          this.gender = data.data.gender;
          this.memberTypes = data.data.memberTypes;
          this.note = data.data.note;
          this.account = data.data.email;
        })
        .catch(error => {
          console.error("请求出错：", error);
          alert(error.response.data.rm)
        });


    },
    updateMember(newBirthday, newCountry, newDisplayName, newGender, newMemberTypes, newNote, newPassword) {

      const tokenNow = localStorage.getItem("shopCartToken");

      console.log(newBirthday)
      // // 在这里可以进行进一步的处理，例如登录验证
      const updateData = {
        birthday: newBirthday,
        country: newCountry,
        displayName: newDisplayName,
        gender: newGender,
        memberTypes: newMemberTypes,
        note: newNote,
        password: newPassword,
      };

      // console.log(updateData)

      axios.put("https://tom-store-api.onrender.com/tom-store-api/member", updateData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': "Bearer" + " " + tokenNow
        }
      })
        .then(response => {
          const data = response.data;
          console.log(data)
          alert('Success Update!')
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



  },
})