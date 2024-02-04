<template>
  <div class="transaction-list">
    <h4>HISTORY</h4>
    <div class="history-main" v-if="transactions.length">
      <div class="history" v-for="transaction in transactions" :key="transaction.id">
        <p>{{ transaction.text }}</p>
        <p :class="transaction.amount < 0 ? 'minus':'plus'">Rs. {{ transaction.amount }}</p>
      <p @click="deleteTransactions(transaction.id)" class="delete">&#10060;</p>
      </div>
    </div>
    <div class="not-transaction" v-else>
        No-transaction
    </div>
  </div>
</template>

<script>
import {getCurrentInstance} from 'vue'
export default {
  name: "transaction-list",
  props: ["transactions"],
  setup(){
    const instance = getCurrentInstance();
    const deleteTransactions = (id) => {
        console.log('if', id)
        instance.emit('transactionDelete', id);
    }
    return {
        deleteTransactions
    }
  }
};
</script>

<style scoped>
.transaction-list {
  margin-top: 32px;
}
h4 {
  border-bottom: 1px solid #ded9d9;
  margin-bottom: 16px;
}
.history {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ded9d9;
  padding: 8px;
  margin-bottom: 8px;
  position: relative;
  background: #fff;
}
.minus {
  color: red;
}
.plus {
  color: green;
}
.history-main {
  /* position: relative; */
}
.delete {
  opacity: 0; /* Start with opacity set to 0 */
  transition: opacity 0.3s ease;
  position: absolute;
  left: -22px;
}
.history:hover .delete {
  opacity: 1;
  cursor: pointer;
}
.not-transaction{
    font-size: 15px;
    color: grey;
    text-align: center;
}
</style>