<template>
  <div class="content">
    <aside class="left-side">
      <Header title="Food Items" :search="true" />
      <div class="main">
        <SideBar :getProduct="getProduct" />
        <Product :items="items" :getProduct="getProduct" />
      </div>
    </aside>
    <aside class="right-side">
      <Header title="Cart" :isCart="true" :totalCart="totalCart" />
      <main>
        <EmptyCart v-if="totalCart === 0" />
        <div v-if="totalCart > 0" class="container flex-column">
          <Cart :items="items" />
        </div>
      </main>
    </aside>
  </div>
</template>

<script>
  import Header from "@/components/Header";
  import SideBar from "@/components/SideBar";
  import Product from "@/components/Product";
  import Cart from "@/components/Cart";
  import EmptyCart from "@/components/EmptyCart";
  import { getAPI } from "../api";

  let cashier = "Arif Hidayat";
  let invoices = "#010410919";

  export default {
    name: "Home",
    components: {
      Header,
      SideBar,
      Product,
      Cart,
      EmptyCart,
    },

    data: () => {
      return {
        items: {
          cashier: cashier,
          ppn: 0.1,
          invoice: invoices,
          data: [],
          totalPrice: 0,
        },
        column: "",
        sort: "",
      };
    },
    mounted() {
      this.getProduct();
    },
    methods: {
      getProduct: async function() {
        try {
          const column = this.$store.getters.getColumn;
          const sort = this.$store.getters.getSort;
          this.$store.state.APIUrl = `/product?column=${column}&sort=${sort}`
          const response = await getAPI.get(
            this.$store.state.APIUrl,
            {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem("access_token"),
              },
            }
          );
          this.$store.state.products = response.data.data;
        } catch (error) {
          if (error.response.status === 404 || error.response.status === 500) {
            console.log("Error! Koneksi ke server bermasalah");
          }
          console.log(error);
        }
      },
    },
    computed: {
      totalCart: function() {
        return this.items.data.length;
      },
    },
  };
</script>
<style scoped>
  header {
    padding-top: 1vh;
    padding-bottom: 1vh;
    border: 1px solid #cecece;
    height: 60px;
  }
</style>
