<template>

    <div class="container ShoppingCart">
        <h2>ShoppingCart</h2>

        
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th></th>
                <th scope="col">產品照片</th>
                <th scope="col">產品名稱</th>
                <th scope="col">數量</th>
                <th scope="col">價格</th>
                <th scope="col">優惠折抵</th>
                <th scope="col">總計</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                    <td><input type="checkbox"></td>
                    <td>
                        <img src="https://picsum.photos/100/100/?random=1" alt="">
                    </td>
                    <td>Name-Otto</td>
                    <td>
                        <input type="number">
                    </td>
                    <td>NT.100</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                    <td><input type="checkbox"></td>
                    <td>
                        <img src="https://picsum.photos/100/100/?random=2" alt="">
                    </td>
                    <td>Name-Thornton</td>
                    <td>
                        <input type="number">
                    </td>
                    <td>NT.100</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                    <td><input type="checkbox"></td>
                    <td>
                        <img src="https://picsum.photos/100/100/?random=3" alt="">
                    </td>
                    <td>Name-Thornton</td>
                    <td>
                        <input type="number">
                    </td>
                    <td>NT.100</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
            </tbody>
        </table>
        {{ data }}

    </div>





</template>

<script>
export default {
  props: ['data'],
  mounted() {
    console.log(this.data);  // 检查是否能正确访问到传递的数据
  }
};
</script>

<style scoped>

</style>
