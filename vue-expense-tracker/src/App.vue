<template>
  <div class="app-main">
    <Header />
    <Balance :total="total" />
    <IncomeExpense :income="income" :expense="expense" />
    <TransactionList @transactionDelete="getDeletedData" :transactions="transactions" />
    <AddTransaction @transactionSubmit="getSubmittedData" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpense from "./components/IncomeExpense.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";
import { useToast } from "vue-toastification";
export default {
  name: "App",
  components: {
    Header,
    Balance,
    IncomeExpense,
    TransactionList,
    AddTransaction
  },
  setup() {
    onMounted(() => {
      const savedTransactions = JSON.parse(
        localStorage.getItem("transactions")
      );
      if (savedTransactions) {
        transactions.value = savedTransactions;
      }
    });
    //transaction list
    const transactions = ref([]);
    const toast = useToast();

    // get total balance
    const total = computed(() => {
      console.log("transactions.value", transactions.value);
      return transactions.value.reduce((acc, transaction) => {
        console.log("acc", acc);
        console.log("transaction.amount", transaction.amount);
        return acc + transaction.amount;
      }, 0);
    });

    //get income
    const income = computed(() => {
      return transactions.value
        .filter(transaction => transaction.amount > 0)
        .reduce((acc, transaction) => {
          return acc + transaction.amount;
        }, 0);
    });

    //get expense
    const expense = computed(() => {
      return transactions.value
        .filter(transaction => transaction.amount < 0)
        .reduce((acc, transaction) => {
          return acc + transaction.amount;
        }, 0);
    });

    //get submitted data
    const getSubmittedData = data => {
      transactions.value.push({
        id: generateUniqueId(),
        text: data.text,
        amount: data.amount
      });
      saveDataToLocalStorage();
      toast.success("Transaction added succesfully");
    };
    // generate id
    const generateUniqueId = () => {
      return Math.floor(Math.random() * 1000000);
    };

    // delete transactions
    const getDeletedData = id => {
      transactions.value = transactions.value.filter(transaction => {
        return transaction.id !== id;
      });
      saveDataToLocalStorage();
      toast.error("Transaction deleted succesfully");
    };

    //save to localstorage
    const saveDataToLocalStorage = () => {
      localStorage.setItem("transactions", JSON.stringify(transactions.value));
    };

    return {
      transactions,
      total,
      income,
      expense,
      getSubmittedData,
      generateUniqueId,
      getDeletedData
    };
  }
};
</script>

<style scoped>
.app-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "lato", sans-serif;
  min-height: 100vh;
  margin: 0;
  font-size: 18px;
  width: 25%;
  margin: auto;
}
@media screen and (max-width: 767px) {
  .app-main {
    width: 100%;
  }
}
</style>