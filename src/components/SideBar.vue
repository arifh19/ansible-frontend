<template>
  <div>
    <aside class="sidebar">
      <ul>
        <router-link :to="{ name: 'home' }"
          ><li><img src="@/assets/fork.png" alt="fork" /></li
        ></router-link>
        <router-link :to="{ name: 'history' }"
          ><li><img src="@/assets/clipboard.png" alt="clipboard" /></li
        ></router-link>
        <li style="outline: none;" v-b-modal.modal-add>
          <img src="@/assets/add.png" alt="add" />
        </li>
         <router-link :to="{ name: 'login' }"
          ><li><img src="@/assets/logout.png"  alt="logout" /></li
        ></router-link>
      </ul>
    </aside>
    <ModalAdd :getProduct="getProduct" />
  </div>
</template>

<script>
  import ModalAdd from "@/components/ModalAdd";
  export default {
    name: "SideBar",
    props: {
      getProduct: {
        type: Function,
        required: false,
      },
    },
    components: {
      ModalAdd,
    },
  };
</script>

<style></style>
