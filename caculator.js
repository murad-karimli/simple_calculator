const display = document.querySelector('.input');
const keys = document.querySelector('.caculator-keys')

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecond = false;
displayHandle();

keys.addEventListener('click', function (e) 
{
    const element = e.target;
    const value = element.value
    if (!element.matches('button'))
    {
        return;
    }

    switch (value)
    {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;

        case '.':
            inputDecimal()
            break;

        case 'clear':
            clear()
            break;

        default:
            inputNumber(element.value)

    }
    displayHandle();
})

function displayHandle() 
{
    display.value =displayValue;
    
}


function clear() 
{
    displayValue = "0";
    firstValue=0;

}


function inputNumber(num) 
{
    if (waitingForSecond) 
    {
        displayValue = num;
        waitingForSecond = false;
    }
    else 
    {
        displayValue = display.value === '0' ? num : displayValue + num;
    }

}


function inputDecimal() 
{
    if (!display.value.includes('.')) 
    {
        displayValue += "."
    }
}


function calculate(first, second, operator) 
{
    if (operator === "+") 
    {
        return first + second;
    }
    if (operator === "-") 
    {
        return first - second;
    }
    if (operator === "*") 
    {
        return first * second;
    }
    if (operator === "/") 
    {
        return first / second;
    }
    return second;
}

function handleOperator(nextOperator) 
{
    const value = parseFloat(displayValue);

    if (operator && waitingForSecond) 
    {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) 
    {
        firstValue = value;
    }
    else if (operator) 
    {
        const result = calculate(firstValue, value, operator)

        displayValue = String(result);
        firstValue = result;
    }
    waitingForSecond=true;
    operator=nextOperator;
}