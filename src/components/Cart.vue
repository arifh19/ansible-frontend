<template>
  <div>
    <div class="cart-item">
      <div v-for="item in items.data" :key="item.id">
        <div class="cart-row mt-20">
          <div class="select-img">
            <img class="list-cart" :src="showImage(item.image)" :alt="item.name" />
          </div>
          <div class="select-description">
            <p>{{ item.name }}</p>
            <div class="count-price">
              <div class="input-group">
                <button @click="minus(item)" class="btn minus">-</button>
                <input disabled class="form-control total" :value="amount(item)" />
                <button v-if="isLimit(item)" @click="plus(item)" class="btn plus">+</button>
                <button v-if="!isLimit(item)" class="btn plus" disabled>+</button>
              </div>
              <p class="price">{{ toRupiah(priceItem(item)) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-checkout">
      <div v-if="!checkout" class="cart-total">
        <span>Total :</span>
        <span>{{ toRupiah(total) }}*</span>
      </div>
      <p v-if="!checkout">*Belum termasuk ppn</p>
      <button v-b-modal.modal-1 class="btn btn-primary checkout-btn">Checkout</button>
      <button class="btn btn-danger cancel-btn" @click="clear">Cancel</button>
    </div>
    <b-modal id="modal-1" @show="onCheckout()" @hidden="offCheckout()" hide-footer hide-header>
      <div class="row">
        <div class="col-6">
          <h4>Checkout</h4>
          <p>Cashier : {{ items.cashier }}</p>
        </div>
        <div class="col-6">
          <p style="text-align: right;">Receipt no: {{ items.invoice }}</p>
        </div>
      </div>
      <div class="row" v-for="item in items.data" :key="item.id">
        <div class="col-6">
          <h6>{{ item.name }} {{ item.amount }}x</h6>
        </div>
        <div class="col-6 right">
          <h6>{{ toRupiah(item.amount * item.price) }}</h6>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <h6>Ppn 10%</h6>
        </div>
        <div class="col-6 right">
          <h6>{{ toRupiah(items.ppn * items.totalPrice) }}</h6>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-12 right">
          <h6>Total : {{ toRupiah(payment) }}</h6>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h6>Payment: Cash</h6>
        </div>
      </div>
      <br />
      <button @click="printCheckout()" class="btn btn-primary checkout-btn">Print</button>
      <h6 style="text-align: center; margin-top:10px">Or</h6>
      <button class="btn btn-danger cancel-btn" style="margin-top:1px">Send Email</button>
    </b-modal>
  </div>
</template>

<script>
import { postAPI } from "../api";
export default {
  name: "Item",
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      btnPlus: true,
      checkout: false,
      invoices: null,
      cashier: null,
      date: null,
      orders: null,
      totalAmount: null,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlX3Rva2VuIjoiYWNjZXNzIiwidXVpZCI6ImQ4OTg1YzY2LTA2MGItNDdiZC1iNzJkLWRmMWE0YmU0NDcwOCIsImlhdCI6MTYwMDEzMTM0MiwiZXhwIjoxNjAwMTM0OTQyfQ.aCTcYb3cOEcNNaCKqkN584gf1qCXu6_qJDdzNSUtwPY",
        },
      },
    };
  },
  methods: {
    toRupiah(value) {
      return (
        "Rp. " +
        Math.round(value)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")
      );
    },
    plus(value) {
      value.amount += 1;
    },
    minus(value) {
      value.amount -= 1;
      if (value.amount === 0) {
        let findIndex = this.items.data.findIndex(
          (index) => index.id === value.id
        );
        this.items.data.splice(findIndex, 1);
      }
    },
    showImage(image) {
      return `${process.env.VUE_APP_STATIC_URL}${image}`;
    },
    clear() {
      this.items.data = [];
    },
    onCheckout() {
      this.checkout = true;
    },
    offCheckout() {
      this.checkout = false;
    },
    storeHistory: async function () {
      try {
        const orders = this.items.data.reduce((prev, cur) => {
          return prev + [cur.name, cur.amount + "x"].join(" ") + ", ";
        }, "");
        const date = new Date().toISOString();
        this.date = date;
        const totalAmount =
          this.items.totalPrice + this.items.totalPrice * this.items.ppn;
        this.$store.state.APIUrl = `/history`
        this.$store.state.formData = new FormData();
        this.$store.state.formData.append("invoices", this.items.invoice);
        this.$store.state.formData.append("cashier", this.items.cashier);
        this.$store.state.formData.append("date", this.date);
        this.$store.state.formData.append("orders", orders);
        this.$store.state.formData.append("amount", totalAmount);
        const response = await postAPI.post('/history', this.$store.state.formData, {headers: {Authorization: 'Bearer '+ localStorage.getItem("access_token")}} )
        alert(response.data.message);
        this.$bvModal.hide("modal-1");
        this.clear();
        this.$router.push({ name: "history" });
      } catch (error) {
        console.error(error);
      }
    },
    printCheckout() {
      this.storeHistory();
    },
  },
  computed: {
    amount: () => {
      return (item) => item.amount;
    },
    priceItem: () => {
      return (item) => item.amount * item.price;
    },
    total: function () {
      const price = this.items.data.reduce((prev, cur) => {
        return prev + cur.price * cur.amount;
      }, 0);
      (() => (this.items.totalPrice = price))();
      return this.items.totalPrice;
    },
    isLimit: () => {
      return (item) => (item.amount === item.stock ? false : true);
    },
    payment: function () {
      return this.items.totalPrice + this.items.totalPrice * this.items.ppn;
    },
  },
};
</script>

<style></style>
