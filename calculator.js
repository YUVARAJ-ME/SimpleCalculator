document.addEventListener("DOMContentLoaded", function () {
    const onBtn = document.getElementById("on-btn");
    const offBtn = document.getElementById("off-btn");
    const calculatorBox = document.getElementById("calculator-box");
    const calcButtons = document.querySelectorAll(".calc-btn");
    const result = document.getElementById("result");
    const historyToggle = document.getElementById("history-toggle"); // FIXED ID
    const historyBox = document.getElementById("history-box");
    const historyList = document.getElementById("history-list");
    const clearHistoryBtn = document.getElementById("clear-history-btn");
    const backBtn = document.getElementById("back-btn");
    const equalsBtn = document.querySelector(".equals");

    let history = [];

    // Function to evaluate expression safely
    function evaluateExpression() {
        try {
            if (result.value.trim() === "") return;
            const evalResult = eval(result.value);
            addToHistory(`${result.value} = ${evalResult}`);
            result.value = evalResult;
        } catch (e) {
            result.value = "Error";
        }
    }

    // Function to handle calculator button clicks
    function handleButtonClick(buttonValue) {
        if (buttonValue === "C") {
            result.value = "";
        } else if (buttonValue === "=") {
            evaluateExpression();
        } else {
            result.value += buttonValue;
        }
    }

    // Function to toggle calculator ON/OFF
    function toggleCalculator(state) {
        if (state === "on") {
            calculatorBox.classList.add("on");
            calculatorBox.classList.remove("off");
            onBtn.classList.add("active");
            offBtn.classList.remove("active");
            calcButtons.forEach(button => {
                button.disabled = false;
                button.addEventListener("click", handleCalcClick);
            });
        } else {
            calculatorBox.classList.add("off");
            calculatorBox.classList.remove("on");
            onBtn.classList.remove("active");
            offBtn.classList.add("active");
            calcButtons.forEach(button => {
                button.disabled = true;
                button.removeEventListener("click", handleCalcClick);
            });
            result.value = "";
        }
    }

    // Function to add calculation history
    function addToHistory(value) {
        if (value.trim() !== "") {
            history.unshift(value);
            if (history.length > 5) history.pop();
            updateHistoryUI();
        }
    }

    // Function to update history UI
    function updateHistoryUI() {
        historyList.innerHTML = "";
        history.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            historyList.appendChild(li);
        });
        clearHistoryBtn.style.display = history.length ? "block" : "none";
    }

    // Function to toggle history view
    function toggleHistoryView(show) {
        if (show) {
            historyBox.style.display = "block"; // Show history box
            calculatorBox.style.display = "none"; // Hide calculator
        } else {
            historyBox.style.display = "none"; // Hide history box
            calculatorBox.style.display = "block"; // Show calculator
        }
    }

    // Attach event listeners inside DOMContentLoaded
    function handleCalcClick(event) {
        handleButtonClick(event.target.textContent);
    }

    if (onBtn) onBtn.addEventListener("click", () => toggleCalculator("on"));
    if (offBtn) offBtn.addEventListener("click", () => toggleCalculator("off"));
    if (historyToggle) historyToggle.addEventListener("click", () => toggleHistoryView(true)); // FIXED
    if (backBtn) backBtn.addEventListener("click", () => toggleHistoryView(false));
    if (clearHistoryBtn) clearHistoryBtn.addEventListener("click", () => { 
        history = []; 
        updateHistoryUI(); 
    });
    if (equalsBtn) equalsBtn.addEventListener("click", evaluateExpression);
});
