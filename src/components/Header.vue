<template>
  <div>
    <header class="head-container">
      <img v-if="!isCart" src="@/assets/menu.png" class="burger-menu" alt="menu" />
      <img v-if="isCart" />
      <h1 v-if="!isCart">{{ title }}</h1>
      <h1 v-if="isCart">
        {{ title }}
        <span class="jumlah-cart">
          <p>{{ totalCart }}</p>
        </span>
      </h1>
      <input
        v-if="search && !isCart"
        type="text"
        class="search-focus"
        name
        placeholder="search here..."
        @change="searchProduct"
      />
      <img v-if="!search || isCart" />
    </header>
  </div>
</template>

<script>
import { getAPI } from "../api";
export default {
  name: "Header",
  props: {
    search: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    isCart: {
      type: Boolean,
      required: false,
      default: false,
    },
    totalCart: {
      type: Number,
      required: false,
    },
  },
  methods: {
    searchProduct: async function (event) {
      try {
        const name = event.target.value;
        let url;
        if (name !== "") {
          url = `/product/search/${name}`;
        } else {
          url = `/product`;
        }
        this.$store.state.APIUrl = url
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
        console.error(error);
      }
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

.head-container {
  position: relative;
  display: flex;
  justify-content: space-between;
}

.head-container .burger-menu {
  cursor: pointer;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 25px;
  width: 26px;
  height: 25px;
}

.head-container .search-focus {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  background: url("../assets/search.png") no-repeat left;
  border: 0.1px solid #ccc;
  outline: none;
  background-size: 22px;
  background-position: 11px;
  border-radius: 50px;
  width: 42px;
  height: 42px;
  padding: 21px;
  transition: all 0.5s;
}
.search-focus:focus {
  width: 200px;
  padding-left: 50px;
}
.head-container h1 {
  margin-top: auto;
  margin-bottom: auto;
  font-size: 30px;
}
@media only screen and (max-width: 859px) {
  .head-container h1 {
    font-size: 24px;
  }
}
</style>
