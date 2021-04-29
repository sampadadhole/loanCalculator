const loanForm = document.querySelector("#loan-form");

loanForm.addEventListener("submit", function(e){

    document.querySelector("#results").style.display="none";
    document.querySelector("#loading").style.display="block";
    setTimeout(calculateResults,2000);
    e.preventDefault();
});

function calculateResults(e){
    
    const amount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const years = document.querySelector("#years");
    const monthyPay = document.querySelector("#monthly-payment");
    const totalPay = document.querySelector("#total-payment");
    const totalInt = document.querySelector("#total-interest");

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100/12;
    const calculatedPayments = parseFloat(years.value) *12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly))
    {
        monthyPay.value = monthly.toFixed(2);
        totalPay.value = (monthly * calculatedPayments).toFixed(2);
        totalInt.value = ((monthly * calculatedPayments)- principal).toFixed(2);
        document.querySelector("#results").style.display="block";
        document.querySelector("#loading").style.display="none";
    }
    else{
        showError("Please check your numbers");
    }
    // e.preventDefault();
}

function showError(error){

    const errorDiv = document.createElement("div");
    errorDiv.className='alert alert-danger';
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, heading);

    // clear error after 3 sec
    setTimeout(clearError, 3000);
    document.querySelector("#loading").style.display="none";
}

function clearError(){
    document.querySelector(".alert").remove();
    
}