<template>
  <div class="container">
    <div class="box">
      <h1>🎉 Order Successful!</h1>
      <p>Your payment was completed successfully.</p>

      <router-link to="/products" class="btn">
        Continue Shopping
      </router-link>

      <router-link to="/profile/orders" class="link">
        View My Orders
      </router-link>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.box {
  text-align: center;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.btn {
  display: block;
  margin-top: 15px;
  padding: 10px;
  background: green;
  color: white;
  text-decoration: none;
}

.link {
  display: block;
  margin-top: 10px;
  color: blue;
}
</style>