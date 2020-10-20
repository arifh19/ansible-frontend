<template>
  <div class="recent-order card table-responsive">
    <div class="row">
      <div class="col-6">
        <h4>Recent Order</h4>
      </div>
      <div class="col-6"></div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">INVOICE</th>
          <th scope="col">CASHIER</th>
          <th scope="col">DATE</th>
          <th scope="col">ORDERS</th>
          <th scope="col">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="history in histories" :key="history.id">
          <td>{{ history.invoices }}</td>
          <td>{{ history.cashier }}</td>
          <td>
            {{ $moment(history.date, "YYYY-MM-DD").format("DD MMMM YYYY") }}
          </td>
          <td>{{ history.orders }}</td>
          <td>{{ toRupiah(history.amount) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "Table",
    props: {
      histories: {
        type: Array,
        required: true,
      },
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
    },
  };
</script>

<style></style>
