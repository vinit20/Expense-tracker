<template>
  <div class="add-transaction">
    <h4>Add new transaction</h4>
    <div class="text">
      <p>Text</p>
      <input type="text" v-model="text" placeholder="Enter text..." />
    </div>
    <div class="amount">
      <p>Amount</p>
      <p>(negative-expense, positive-income)</p>
      <input type="text" v-model="amount" placeholder="Enter amount..." />
    </div>
    <div class="button">
      <button @click.prevent="onSubmit">Add Transaction</button>
    </div>
  </div>
</template>

<script>
import { ref,getCurrentInstance } from "vue";
import { useToast } from "vue-toastification";
export default {
  name: "add-transaction",
  setup() {
    const text = ref("");
    const amount = ref("");
    const toast = useToast();
    const instance = getCurrentInstance();

    const onSubmit = () => {
      if (!text.value || !amount.value) {
        toast.error("Both fields must be filled");
        return;
      }

      const transactionData = {
        text: text.value,
        amount: parseFloat(amount.value)
      };

      instance.emit('transactionSubmit', transactionData);

      (text.value = ""), (amount.value = "");
    };
    return {
      onSubmit,
      text,
      amount,
      toast,
    };
  }
};
</script>

<style scoped>
h4 {
  border-bottom: 1px solid #ded9d9;
  margin-bottom: 16px;
}
.add-transaction {
  margin-top: 24px;
}
input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
.text,
.amount {
  margin-bottom: 16px;
}

button {
  outline: none;
  padding: 10px 80px;
  background: rgb(50, 152, 254);
  color: #fff;
  border: none;
  width: 100%;
  cursor: pointer;
}
</style>