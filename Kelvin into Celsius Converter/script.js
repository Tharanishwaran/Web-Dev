function convert(){

    const kelval = Number(document.getElementById("input").value)

    const celval = kelval-273.15

    const result = document.getElementById("result")

    result.innerHTML = celval.toFixed(3) + " Celsius "

}