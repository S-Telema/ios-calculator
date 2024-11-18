const result = document.querySelector('.result span');
const numbers = document.querySelectorAll('.numbers');
const decimal = document.querySelector('.decimal');
const signs = document.querySelectorAll('.sign');
const percent = document.querySelector('.percent');
const negative = document.querySelector('.negative');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');

let expression = '';

function updateResultDisplay(value) {
    result.textContent = value || '0';
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        expression += number.value;
        updateResultDisplay(expression);
    });
});

decimal.addEventListener('click', () => {
    if (expression === '' || /[+\-×÷]$/.test(expression)) {
        expression += '0.';
    } else if (!/\.\d*$/.test(expression)) {
        expression += '.';
    }
    updateResultDisplay(expression);
});

signs.forEach(sign => {
    sign.addEventListener('click', () => {
        if (expression === '' || /[+\-×÷]$/.test(expression)) return;
        expression += sign.value;
        updateResultDisplay(expression);
    });
});

percent.addEventListener('click', () => {
    if (expression === '' || /[+\-×÷]$/.test(expression)) return;
    if (/\d(\.\d+)?$/.test(expression) && !/%$/.test(expression)) {
        expression += '%';
        updateResultDisplay(expression);
    }
});

negative.addEventListener('click', () => {
    if (expression === '' || /[+\-×÷]$/.test(expression)) return;
    if (expression.endsWith('%')) return;

    const lastNumberMatch = expression.match(/-?\d+(\.\d+)?$/);
    if (lastNumberMatch) {
        const lastNumber = lastNumberMatch[0];
        const toggledNumber = (-parseFloat(lastNumber)).toString();
        expression = expression.slice(0, -lastNumber.length) + toggledNumber;
    }

    updateResultDisplay(expression);
});

equals.addEventListener('click', () => {
    if (expression === '' || /[+\-×÷]$/.test(expression)) return;

    let sanitizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
    sanitizedExpression = sanitizedExpression.replace(/(\d+(\.\d+)?)%/g, (match, p1) => {
        return parseFloat(p1) / 100;
    });

    try {
        let resultValue = eval(sanitizedExpression);
        resultValue = parseFloat(resultValue.toFixed(10));
        updateResultDisplay(resultValue);
        expression = resultValue.toString();
    } catch (error) {
        updateResultDisplay('Error');
        expression = '';
    }
});

clear.addEventListener('click', () => {
    expression = '';
    updateResultDisplay('0');
});
