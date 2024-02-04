<template>
  <div class="income-expense">
    <div class="income">
      <h4>Income</h4>
      <p id="money-plus" class="money plus">+Rs. {{ income }}</p>
    </div>
    <div class="expense">
      <h4>Expense</h4>
      <p id="money-minus" class="money minus">Rs. {{ expense }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "income-expense",
  props: ['expense', 'income']
};
</script>

<style scoped>
.income-expense {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ded9d9;
  padding: 20px 50px;
  margin-top: 16px;
  background: #fff;
}
.income p{
  color: green;
}
.expense p {
  color: red;
}
</style>