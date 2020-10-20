<template>
  <div class="product">
    <div class="container mt-20">
      <div class="row sort">
        <div class="col-6"></div>
        <div class="col-6 right">
          <select name="" id="" @change="setColumn()" v-model="column">
            <option value="id">Last Updated</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
          </select>
          <select name="" id="" @change="setSort()" v-model="sort">
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>
      </div>
    </div>
    <div class="foods">
      <div v-for="item in dataProducts" :key="item.id">
        <article class="imageandtext image_grid ">
          <label>
            <img
              :src="showImage(item.image)"
              :alt="item.name"
              @error="imageUrlAlt"
              @click="addCart(item, isCheck(item))"
            />
            <input v-if="isCheck(item)" type="checkbox" disabled checked />
            <input v-if="!isCheck(item)" type="checkbox" disabled />
            <span class="caption"> </span>
          </label>
          <div class="row">
            <div class="col-6">
              <p>{{ item.name }}</p>
              <p class="harga">{{ toRupiah(item.price) }}</p>
            </div>
            <div class="col-6 right">
              <b-dropdown
                variant="none"
                toggle-class="text-decoration-none p-0 font-color-black"
                menu-class="h4"
                no-caret
              >
                <template v-slot:button-content>
                  <b-icon icon="three-dots-vertical"></b-icon>
                </template>
                <b-dropdown-item v-b-modal.modal-edit @click="itemId = item.id"
                  >Edit</b-dropdown-item
                >
                <b-dropdown-item @click="deleteProduct(item.id)"
                  >Delete</b-dropdown-item
                >
              </b-dropdown>
            </div>
          </div>
        </article>
      </div>
    </div>
    <ModalEdit :id="itemId" :getProduct="getProduct" />
  </div>
</template>

<script>
  import ModalEdit from "@/components/ModalEdit";
  import defaultImg from "@/assets/null-image.jpg";
  import { deleteAPI } from "../api";

  export default {
    name: "Product",
    props: {
      items: {
        type: Object,
        required: true,
      },
      getProduct: {
        type: Function,
        required: false,
      },
    },
    data: () => {
      return {
        imgError: defaultImg,
        itemId: null,
        column: "id",
        sort: "desc",
        config: {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlX3Rva2VuIjoiYWNjZXNzIiwidXVpZCI6ImQ4OTg1YzY2LTA2MGItNDdiZC1iNzJkLWRmMWE0YmU0NDcwOCIsImlhdCI6MTYwMDEzMTM0MiwiZXhwIjoxNjAwMTM0OTQyfQ.aCTcYb3cOEcNNaCKqkN584gf1qCXu6_qJDdzNSUtwPY",
          },
        },
      };
    },
    components: {
      ModalEdit,
    },
    methods: {
      setColumn() {
        this.$store.state.column = this.column;
        this.getProduct();
      },
      setSort() {
        this.$store.state.sort = this.sort;
        this.getProduct();
      },
      deleteProduct: async function(id) {
        try {
          this.$store.state.APIUrlDelete = `/product/${id}`;
          const response = await deleteAPI.delete(`/product/${id}`, {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("access_token"),
            },
          });
          alert(response.data.message);
          this.getProduct();
        } catch (error) {
          console.error(error);
        }
      },
      imageUrlAlt(event) {
        event.target.src = this.imgError;
      },
      toRupiah(value) {
        return (
          "Rp. " +
          value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")
        );
      },
      addCart(item, isCheck) {
        if (!isCheck) {
          let data = {
            ...item,
            amount: 1,
          };
          this.items.data.push(data);
        } else {
          let findIndex = this.items.data.findIndex(
            (index) => index.id === item.id
          );
          this.items.data.splice(findIndex, 1);
        }
      },
      showImage(image) {
        return `${process.env.VUE_APP_STATIC_URL}${image}`;
      },
    },
    computed: {
      isCheck: function() {
        return (item) => this.items.data.find((index) => index.id === item.id);
      },
      getId: function() {
        return this.itemId;
      },
      dataProducts() {
        return this.$store.getters.dataProducts;
      },
    },
  };
</script>

<style>
  .foods img {
    width: 280px;
    height: 230px;
  }
</style>
