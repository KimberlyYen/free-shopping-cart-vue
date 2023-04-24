<script setup>

</script>

<template>

    <nav class="navbar navbar-light bg-light r ">
    <div class="container-fluid">
      <div class="logo border rounded-circle d-flex align-items-center justify-content-center">
        <a class="navbar-brand mx-auto">LOGO</a>
      </div>

        <div>
          <div>
            <button class="btn btn-success rounded-5" type="submit">登入</button>
            <button class="btn btn-success rounded-5" type="submit">註冊</button>
          </div>

          <form class="d-flex flex-row align-items-center mt-2">
            <input class="form-control w-100" type="search" placeholder="商品名" aria-label="Search">
            <button class="btn btn-outline-success w-50 mx-2" type="submit">搜索</button>
            <button class="btn btn-info w-75" type="submit">我的購物車</button>
          </form>
            

  
        </div>
    </div>
    </nav>

</template>

<style scoped>
/* .read-the-docs {
  color: #888;
} */

.logo {
  width: 100px;
  height: 100px;
}
</style>
