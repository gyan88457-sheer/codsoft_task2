document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    let balance = 500.00;

    // --- DOM ELEMENTS ---
    const views = document.querySelectorAll('.view');
    const mainBalanceDisplay = document.getElementById('main-balance');
    const mainMessageDisplay = document.getElementById('main-message');
    
    const depositInput = document.getElementById('deposit-amount');
    const withdrawInput = document.getElementById('withdraw-amount');

    const actionButtons = document.querySelectorAll('.action-btn');
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    const confirmDepositBtn = document.getElementById('confirm-deposit');
    const confirmWithdrawBtn = document.getElementById('confirm-withdraw');
    const checkBalanceBtn = document.getElementById('check-balance-btn');

    // --- CORE FUNCTIONS ---

    function updateBalanceDisplay() {
        mainBalanceDisplay.textContent = `$${balance.toFixed(2)}`;
    }

    function showMessage(message, type = 'info') {
        mainMessageDisplay.textContent = message;
        mainMessageDisplay.className = 'message'; // Reset classes
        if (type !== 'info') {
            mainMessageDisplay.classList.add(type);
        }

        // Message disappears after 3 seconds if it's not the default one
        if (message !== "Please select an option below.") {
            setTimeout(() => {
                mainMessageDisplay.textContent = "Please select an option below.";
                mainMessageDisplay.className = 'message';
            }, 3000);
        }
    }

    function switchView(targetId) {
        views.forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    }

    // --- TRANSACTION LOGIC ---

    function handleDeposit() {
        const amount = parseFloat(depositInput.value);

        if (isNaN(amount) || amount <= 0) {
            showMessage("Invalid deposit amount. Please enter a positive number.", "error");
        } else {
            balance += amount;
            updateBalanceDisplay();
            showMessage(`Successfully deposited $${amount.toFixed(2)}.`, "success");
        }
        depositInput.value = '';
        switchView('main-view');
    }

    function handleWithdraw() {
        const amount = parseFloat(withdrawInput.value);

        if (isNaN(amount) || amount <= 0) {
            showMessage("Invalid withdrawal amount. Please enter a positive number.", "error");
        } else if (amount > balance) {
            showMessage("Insufficient funds.", "error");
        } else {
            balance -= amount;
            updateBalanceDisplay();
            showMessage(`Successfully withdrew $${amount.toFixed(2)}.`, "success");
        }
        withdrawInput.value = '';
        switchView('main-view');
    }

    // --- EVENT LISTENERS ---

    // Main menu buttons (Deposit, Withdraw)
    actionButtons.forEach(button => {
        const targetView = button.dataset.target;
        if (targetView) {
            button.addEventListener('click', () => switchView(targetView));
        }
    });
    
    // Check Balance button
    checkBalanceBtn.addEventListener('click', () => {
        switchView('main-view');
        showMessage(`Your current balance is $${balance.toFixed(2)}.`);
    });
    
    // Cancel buttons in Deposit/Withdraw views
    cancelButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchView('main-view');
            depositInput.value = '';
            withdrawInput.value = '';
        });
    });

    // Confirm transaction buttons
    confirmDepositBtn.addEventListener('click', handleDeposit);
    confirmWithdrawBtn.addEventListener('click', handleWithdraw);
    
    // Allow 'Enter' key to confirm transactions
    depositInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleDeposit();
    });
    withdrawInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleWithdraw();
    });

    // --- INITIALIZATION ---
    updateBalanceDisplay();
});
