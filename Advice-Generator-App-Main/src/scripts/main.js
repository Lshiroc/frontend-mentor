// Function to return advice from fetch api
const getAdvice = async () => {
    let adviceObject = await fetch("https://api.adviceslip.com/advice")
        .then(resp => resp.json())
        .then(data => { return data.slip })
        .catch(err => console.error(err));

    return adviceObject;
}


// Function for setting the advice context to html elements
const setAdvice = async () => {
    let dice = document.querySelector(".adviceRoller");
    if (!dice.classList.contains("disabled")) {
        let adviceNo = document.querySelector(".adviceNo");
        let adviceText = document.querySelector(".advice");

        let adviceObject = await getAdvice();

        adviceNo.innerText = `Advice #${adviceObject.id}`;
        adviceText.innerHTML = `&ldquo;${adviceObject.advice}&rdquo;`;
        dice.style.animationName = "throwDice";
        setTimeout(() => {
            dice.style.animationName = "none";
        }, 1000)

        // Disabling the dice button
        setTimeout(() => {
            dice.classList.add("disabled");
        }, 850);
        setTimeout(() => {
            dice.classList.remove("disabled");
        }, 3000);
    }
}


// Running first time during the page load
setAdvice();