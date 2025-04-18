// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Create a new account and add it to the bank's list
    createAccount(name, initialDeposit) {
        const account = new Account(name, initialDeposit);
        this.accounts.push(account);
        return account;
    }
}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    deposit(amount) {
        this.balance += amount;
        this.transactionHistory.push({ transactionType: 'Deposit', amount });
    }

    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            this.transactionHistory.push({ transactionType: 'Withdrawal', amount });
        } else {
            console.log('Insufficient funds');
        }
    }

    transfer(amount, recipientAccount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            recipientAccount.balance += amount;

            this.transactionHistory.push({ transactionType: 'Transfer', amount, to: recipientAccount.name });
            recipientAccount.transactionHistory.push({ transactionType: 'Received', amount, from: this.name });
        } else {
            console.log('Insufficient funds for transfer');
        }
    }

    checkBalance() {
        return this.balance;
    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>

console.log(testBankOperations());
