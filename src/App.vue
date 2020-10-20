<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import "bootstrap/dist/css/bootstrap.css";
  import "bootstrap-vue/dist/bootstrap-vue.css";
  export default {
    name: "App",
    components: {},
  };
</script>
<style>
  *,
  ::after,
  ::before {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  .content,
  .main {
    display: flex;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    flex-direction: row;
  }

  .left-side {
    width: 70%;
    display: flex;
    flex-direction: column;
  }

  .sidebar img {
    margin-top: 20px;
    margin-right: 5px;
    margin-left: 15px;
    cursor: pointer;
  }
  .product {
    background: rgba(190, 195, 202, 0.3);
    width: 100%;
    height: 100%;
  }
  .foods {
    padding: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .foods p {
    margin: 0;
    padding: 0;
  }

  .foods .harga {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .right-side {
    width: 30%;
    background-color: #ffff;
    display: flex;
    flex-direction: column;
  }
  .right-side main {
    height: 100%;
  }
  .right-side main .cart-img {
    margin-top: 60px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .right-side header {
    text-align: center;
  }
  .right-side h1 {
    margin-top: auto;
    margin-bottom: auto;
    font-size: 30px;
  }

  .jumlah-cart {
    border-radius: 60%;
    background: #57cad5;
  }

  .jumlah-cart p {
    display: inline;
    padding: 10px;
    color: #fff;
  }

  .cart,
  .message {
    text-align: center;
    margin: 0;
    font-size: 25px;
  }

  .cart {
    font-weight: bold;
  }

  .message {
    display: block;
    color: #cecece;
    font-size: 20px;
  }
  .cart-row {
    display: flex;
    flex-direction: row;
  }
  .select-img {
    width: 30%;
  }
  .select-description {
    display: flex;
    flex-direction: column;
    width: 70%;
    justify-content: space-between;
  }
  .select-description p {
    width: 100%;
    font-weight: bold;
  }
  .count-price {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .count-price .price {
    font-weight: bold;
    text-align: right;
  }
  .mt-10 {
    margin-top: 10px;
  }
  .mt-20 {
    margin-top: 20px;
  }
  .list-cart {
    width: 100px;
    height: 100px;
  }
  .plus,
  .total,
  .minus {
    display: inline;
    background: rgba(130, 222, 58, 0.2);
    color: #82de3a;
  }
  .total {
    background: #ffffff !important;
    text-align: center;
  }
  .flex-column {
    display: flex;
    height: 100%;
    justify-content: space-between;
  }

  .cart-item {
    height: 100%;
  }
  .cart-checkout {
    height: 10%;
  }
  .cart-checkout .cart-total {
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .checkout-btn {
    width: 100%;
    background: #57cad5;
  }
  .cancel-btn {
    width: 100%;
    margin-top: 10px;
    background: #f24f8a;
  }

  .right {
    text-align: right;
  }
  .card {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
  .history {
    width: 100%;
    height: 100%;
  }
  .history main {
    width: 100%;
    height: 100%;
  }
  .content-history {
    padding: 30px;
    background: rgba(190, 195, 202, 0.3);
    height: 100%;
  }
  .content-history .flex-history {
    display: flex;
    justify-content: space-around;
  }
  .today-income,
  .orders,
  .year-income {
    padding: 25px;
    filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
    margin: 10px;
  }

  .today-income p,
  .orders p,
  .year-income p {
    font-weight: bold;
    margin: 0;
  }
  .nominal {
    font-size: 30px;
  }
  .today-income {
    background: linear-gradient(
      278.29deg,
      #fbb2b4 30.05%,
      rgba(255, 143, 178, 0) 133.19%
    );
  }
  .orders {
    background: linear-gradient(
      278.29deg,
      #29dfff 30.05%,
      rgba(41, 223, 255, 0) 133.19%
    );
  }
  .year-income {
    background: linear-gradient(
      278.29deg,
      #ab84c8 30.05%,
      rgba(241, 201, 236, 0) 133.19%
    );
  }
  .revenue {
    margin-top: 20px;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
  }
  .revenue img {
    width: 100%;
  }
  .recent-order {
    margin-top: 20px;
    padding: 20px;
  }

  .caption {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    pointer-events: none;
  }

  .image_grid label {
    position: relative;
    display: inline-block;
    margin: 0;
  }

  .image_grid input {
    display: none;
  }

  .image_grid input:checked + .caption {
    background: rgba(0, 0, 0, 0.5);
  }

  .image_grid input:checked + .caption::after {
    content: "✔";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70px;
    height: 70px;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 30px;
    line-height: 60px;
    text-align: center;
    border: 2px solid white;
    border-radius: 50%;
  }
  .sort {
    margin-right: 15px;
  }
  @media only screen and (max-width: 859px) {
    .content {
      display: flex;
      margin: 0;
      padding: 0;
      flex-direction: column;
    }
    .left-side {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .right-side {
      width: 100%;
      background-color: #ffff;
      display: flex;
      flex-direction: column;
    }
    .cart,
    .message {
      text-align: center;
      margin: 0;
      font-size: 21px;
    }
    .right-side h1 {
      font-size: 24px;
    }
    .head-container h1 {
      font-size: 24px;
    }

    .sidebar {
      padding: 10px;
    }
    .sidebar img {
      width: 36px;
      height: 32px;
      margin-right: 0px;
      margin-left: 0px;
    }
    .foods img {
      width: 230px;
      height: 180px;
    }
    .nominal {
      font-size: 14px;
    }
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 860px) {
    .right-side main .cart-img {
      width: 144px;
      height: 53px;
    }
    .cart,
    .message {
      font-size: 14px;
    }
    .right-side main {
      padding: 8px;
    }
    .cart-row {
      display: flex;
      flex-direction: column;
    }
    .select-img {
      width: 100%;
    }
    .select-description {
      width: 100%;
      justify-content: space-between;
    }
    .list-cart {
      width: 130px;
      height: 130px;
    }
    .flex-column {
      display: flex;
      height: 100%;
      justify-content: space-between;
    }
    .nominal {
      font-size: 16px;
    }
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 968px) {
    .right-side main .cart-img {
      width: 164px;
      height: 73px;
    }
    .cart,
    .message {
      font-size: 20px;
    }
    .right-side main {
      padding: 8px;
    }
    .flex-column {
      display: flex;
      height: 97%;
      justify-content: space-between;
    }
    .plus,
    .total,
    .minus {
      color: #82de3a;
      width: 30px;
      height: 30px;
    }
    .nominal {
      font-size: 18px;
    }
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    .right-side main .cart-img {
      width: 184px;
      height: 93px;
    }
    .flex-column {
      display: flex;
      height: 92%;
      justify-content: space-between;
    }
    .nominal {
      font-size: 20px;
    }
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 1175px) {
    .cart-row {
      display: flex;
      flex-direction: row;
    }
    .select-img {
      width: 30%;
    }
    .select-description {
      display: flex;
      flex-direction: column;
      width: 70%;
      justify-content: space-between;
    }
    .list-cart {
      width: 90px;
      height: 90px;
    }
    .plus,
    .total,
    .minus {
      color: #82de3a;
      width: 38px;
      height: 38px;
    }
    .total {
      background: #ffffff !important;
      text-align: center;
    }
    .nominal {
      font-size: 24px;
    }
  }

  @media only screen and (min-width: 1300px) {
    .cart-row {
      display: flex;
      flex-direction: row;
    }
    .list-cart {
      width: 100px;
      height: 100px;
    }
    .plus,
    .total,
    .minus {
      color: #82de3a;
      width: 38px;
      height: 38px;
    }
    .total {
      background: #ffffff !important;
      text-align: center;
    }
    .flex-column {
      display: flex;
      height: 85%;
      justify-content: space-between;
    }
    .nominal {
      font-size: 30px;
    }
  }
</style>
