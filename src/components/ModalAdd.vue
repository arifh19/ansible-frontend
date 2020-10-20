<template>
  <div>
    <b-modal
      id="modal-add"
      ref="modal"
      title="Add Item"
      @show="resetModal"
      @ok="addProduct"
      ok-title="Add"
    >
      <form ref="form" @submit.stop.prevent="addProduct">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          label-cols="3"
          invalid-feedback="Name is required"
          style="font-weight: bold"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="imageState"
          label="Image"
          label-for="image-input"
          label-cols="3"
          invalid-feedback="Image is required"
          style="font-weight: bold"
        >
          <b-form-file
            v-if="!image"
            @change="onFileChange"
            id="image-input"
            :state="imageState"
            placeholder="Choose a image or drop it here..."
            drop-placeholder="Drop file here..."
            required
          ></b-form-file>
          <img v-if="image" :src="image" />
          <button v-if="image" class="btn btn-danger" @click="removeImage">
            Remove image
          </button>
        </b-form-group>
        <b-form-group
          :state="priceState"
          label="Price"
          label-for="price-input"
          label-cols="3"
          invalid-feedback="Price is required"
          style="font-weight: bold"
        >
          <b-form-input
            id="price-input"
            v-model="price"
            :state="priceState"
            type="number"
            min="0"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="stockState"
          label="Stock"
          label-for="stock-input"
          label-cols="3"
          invalid-feedback="Stock is required"
          style="font-weight: bold"
        >
          <b-form-input
            id="stock-input"
            v-model="stock"
            :state="stockState"
            type="number"
            min="0"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="categoryState"
          label="Category"
          label-for="category-input"
          label-cols="3"
          invalid-feedback="Category is required"
          style="font-weight: bold"
        >
          <b-form-select
            id="category-input"
            v-model="category_id"
            :state="categoryState"
            required
          >
            <b-form-select-option value="0"
              >Please select a Category</b-form-select-option
            >
            <b-form-select-option
              v-for="option in APIDataCategory"
              :key="option.id"
              :value="option.id"
              >{{ option.name }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
  import { getCategory, postAPI } from "../api";
  export default {
    name: "Modal-Add",
    props: {
      getProduct: {
        type: Function,
        required: false,
      },
    },
    data() {
      return {
        nameState: null,
        imageState: null,
        priceState: null,
        stockState: null,
        categoryState: null,
        name: null,
        image: null,
        price: null,
        stock: null,
        category_id: null,
        attachment: null,
        submittedNames: [],
        options: null,
      };
    },
    methods: {
      getCategory: async function() {
        try {
          const response = await getCategory.get('/category', {headers: {Authorization:`Bearer ` + localStorage.getItem("access_token")}})
          this.$store.state.APIDataCategory = response.data.data;
        } catch (error) {
          if (error.response.status === 404 || error.response.status === 500) {
                console.log("Error! Koneksi ke server bermasalah");
            }
            console.log(error)
        }
      },
      addProduct: async function(bvModalEvt) {
        try {
          if (!this.checkFormValidity()) {
            bvModalEvt.preventDefault()
            return;
          }
          this.$store.state.APIUrl = `/product`
          this.$store.state.formData = new FormData();
          this.$store.state.formData.append("name", this.name);
          this.$store.state.formData.append("image", this.attachment);
          this.$store.state.formData.append("price", this.price);
          this.$store.state.formData.append("stock", this.stock);
          this.$store.state.formData.append("category_id", this.category_id);
          const response = await postAPI.post('/product', this.$store.state.formData, {headers: {Authorization: 'Bearer '+ localStorage.getItem("access_token")}} )
          this.getProduct();
          this.$nextTick(() => {
            this.$bvModal.hide("modal-prevent-closing");
          });
          alert(response.data.message);
          this.$router.push({ name: "home" });
        } catch (error) {
          console.error(error);
        }
      },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity();
        this.nameState = valid;
        this.imageState = valid;
        this.priceState = valid;
        this.stockState = valid;
        this.categoryState = valid;
        return valid;
      },
      resetModal() {
        this.name = "";
        this.image = null;
        this.price = "";
        this.stock = "";
        this.category_id = 0;
        this.nameState = null;
        this.imageState = null;
        this.priceState = null;
        this.stockState = null;
        this.categoryState = null;
        this.getCategory();
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.attachment = files[0];
        this.createImage(files[0]);
      },
      createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },

      removeImage: function() {
        this.image = "";
      },
    },
    computed : {
      APIDataCategory() {
        return this.$store.getters.APIDataCategory;
      },
    }
  };
</script>

<style scoped>
  img {
    width: 50%;
    display: block;
    margin-bottom: 10px;
  }
</style>
