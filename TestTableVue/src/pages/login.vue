<template lang="pug">
section 
  Table
  
  router-link.link(to="/profile") Профиль
</template>

<script>
import Table from "@/components/Table";

export default {
  name: "table",
  components: {
    Table,
  },
};


// export default {
//     name: "LoginPage",
//     components: {

//     },
//     data: function () {
//         return {
//             name: "Вход в личный кабинет"
//         }
//     }
// }
</script>

<style lang="scss">


</style>