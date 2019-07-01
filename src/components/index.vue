<template >
    <el-container>
        <el-main class="note" :style ="note">
            <div style="width:1000px; height:550px"></div>
        </el-main>
      </el-container>
</template>
<script>
export default {
    data() {
      return {
         note: {
            backgroundImage: "url(" + require("../assets/img/bgimg.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto auto",
            marginTop: "cover",
          }
      }
    }
  };
</script>
<style scoped>

</style>
