//Model of input handling
function Stack() {
	this.data = [];
	this.count = 0;
	this.push = push;
	this.pop = pop;
	this.size = size;
	this.clear = clear;
	this.top = top;
	this.empty = empty;

	function push(x) {
		this.data[this.count++] = x;
	}

	function pop() {
		this.count -= 1;
	}

	function size() {
		return this.count;
	}

	function clear() {
		this.count = 0;
	}

	function top() {
		if (this.count == 0)
			throw err = new Error("Stack Error");
		else
			return this.data[this.count - 1];
	}

	function empty() {
		if (this.count == 0)
			return true;
		else
			return false;
	}
}

//Check if input element is an operator
function isOperator(x) {
	if ((x >= '0' && x <= '9') || x == ' ' || x == '.')
		return false;
	else
		return true;
}

//Format input string equation
function Format(str) {
	var i;
	var tmp = "";
	for (i = 0; i < str.length; ++i) {
		if (isOperator(str[i])) {
			if (str[i] == '(') {
				if (i > 0 && !isOperator(str[i - 1]) && str[i - 1] != ' ')
					tmp = tmp + " × ";
				tmp = tmp + str[i] + " ";
			}
			else if (str[i] == ')') {
				tmp = tmp + " " + str[i];
				if (i < str.length - 1 && !isOperator(str[i + 1]) && str[i + 1] != ' ')
					tmp = tmp + " × ";
			}
			else {
				if (str[i] == '-') {
					if (i == 0)
						tmp = tmp + " " + str[i];
					else if (isOperator(str[i - 1]) && str[i - 1] != ')')
						tmp = tmp + " " + str[i];
					else
						tmp = tmp + " " + str[i] + " ";
				}
				else
					tmp = tmp + " " + str[i] + " ";
			}
		}
		else {
			tmp = tmp + str[i];
		}
	}
	return tmp;
}

//Get previous operator
function getPrevious(operator) {
	var a;
	switch (operator) {
		case "+":
		case "-":
			a = 1;
			break;
		case "×":
		case "÷":
			a = 2;
			break;
		case "(":
			a = 4;
			break;
		case ")":
			a = 0;
			break;
		default:
			a = -1;
			break
	}
	return a;
}

//Handling of parenthesis
function shiftExpression(equation) {
	var stack = new Stack();
	var str = "";
	var i = 0;
	while (i < equation.length) {

		if (equation[i] == ' ')
			i += 1;
		else if ((!isOperator(equation[i]) && equation[i] != ' ') || (equation[i] == '-' && !isOperator(equation[i + 1]) && equation[i + 1] != ' ')) {
			while (equation[i] != ' ') {
				str = str + equation[i];
				i += 1;
				if (i >= equation.length)
					break;
			}
			str = str + " ";
		}
		else {
			var currentSymbol = "";

			currentSymbol = equation[i];
			i += 1;

			if (stack.empty())
				stack.push(currentSymbol);
			else if (currentSymbol == '(')
				stack.push(currentSymbol);
			else if (currentSymbol == ')') {
				while (stack.top() != '(') {
					str = str + stack.top() + " ";
					stack.pop();
				}
				stack.pop();
			}
			else if (stack.top() == '(') {
				stack.push(currentSymbol);
			}
			else if (getPrevious(currentSymbol) > getPrevious(stack.top())) {
				stack.push(currentSymbol);
			}
			else if (getPrevious(currentSymbol) <= getPrevious(stack.top())) {
				while (getPrevious(currentSymbol) <= getPrevious(stack.top())) {
					if (stack.top() == '(')
						break;
					str = str + stack.top() + " ";
					stack.pop();
					if (stack.empty())
						break;
				}
				stack.push(currentSymbol);
			}
		}
	}
	while (!stack.empty()) {
		str = str + stack.top() + " ";
		stack.pop();
	}
	str = str.trim();
	return str;
}

//Calculate result of input string equation
function Calculate(str) {
	var numstack = new Stack();
	var tmp = "";
	var i = 0,
		len = str.length;
	while (i < len) {
		if (isOperator(str[i])) {
			if (str[i] == '-' && !isOperator(str[i + 1]) && str[i + 1] != ' ') {
				while (str[i] != ' ') {
					tmp = tmp + str[i];
					i += 1;
				}
				var t = parseFloat(tmp);
				numstack.push(t);
				tmp = "";
			}
			else {
				var a, b;
				if (numstack.empty())
					return "ERROR";
				a = numstack.top();
				numstack.pop();
				if (numstack.empty())
					return "ERROR";
				b = numstack.top();
				numstack.pop();
				if (str[i] == '+')
					numstack.push(a + b);
				else if (str[i] == '-')
					numstack.push(b - a);
				else if (str[i] == '×')
					numstack.push(a * b);
				else if (str[i] == '÷') {
					if (a == 0)
						return "ERROR";
					else
						numstack.push(b / a);
				}
				i++;
			}
		}
		else if (str[i] == ' ') {
			i++;
		}
		else {
			while (str[i] != ' ') {
				tmp = tmp + str[i];
				i += 1;
			}
			var t;
			t = parseFloat(tmp);
			numstack.push(t);
			tmp = "";
		}
	}
	var result = numstack.top();
	result = result.toFixed(9);
	result = parseFloat(result);
	return result.toString();
}

//Get number from input
function getNum() {
	var e = event.srcElement;
	var display = true;
	if (e.id == "0")
		e = document.getElementById("0").textContent;
	else if (e.id == "1")
		e = document.getElementById("1").textContent;
	else if (e.id == "2")
		e = document.getElementById("2").textContent;
	else if (e.id == "3")
		e = document.getElementById("3").textContent;
	else if (e.id == "4")
		e = document.getElementById("4").textContent;
	else if (e.id == "5")
		e = document.getElementById("5").textContent;
	else if (e.id == "6")
		e = document.getElementById("6").textContent;
	else if (e.id == "7")
		e = document.getElementById("7").textContent;
	else if (e.id == "8")
		e = document.getElementById("8").textContent;
	else if (e.id == "9")
		e = document.getElementById("9").textContent;
	else if (e.id == "add")
		e = document.getElementById("add").textContent;
	else if (e.id == "subtract")
		e = document.getElementById("subtract").textContent;
	else if (e.id == "multiply")
		e = document.getElementById("multiply").textContent;
	else if (e.id == "divide")
		e = document.getElementById("divide").textContent;
	else if (e.id == "(")
		e = document.getElementById("(").textContent;
	else if (e.id == ")")
		e = document.getElementById(")").textContent;
	else if (e.id == ".")
		e = document.getElementById(".").textContent;
	else if (e.id == "←") {
		display = false;
		var backspace = document.getElementById("output").value;
		if (backspace.length > 0) {
			backspace = backspace.substring(0, backspace.length - 1);
			document.getElementById("output").value = backspace;
		}
	}
	else if (e.id == "equal") {
		display = false;
		var inputEquation = document.getElementById("output").value;
		inputEquation = Format(inputEquation);
		inputEquation = shiftExpression(inputEquation);
		inputEquation = Calculate(inputEquation);
		if (inputEquation == "NaN")
			inputEquation = "ERROR: NaN";
		else if (inputEquation == "Infinity")
			inputEquation = "∞";
		if (inputEquation.indexOf("ERROR") != -1)
			inputEquation = "Error";
		document.getElementById("output").value = inputEquation;

	}
	else if (e.id == "clear") {
		display = false;
		document.getElementById("output").value = "";
	}
	else
		e = "";
	if (display) {
		var previousEntry = document.getElementById("output").value;
		document.getElementById("output").value = previousEntry + e;
	}
}

//Dark mode toggle function
function darkMode() {
	var element = document.body;
	element.classList.toggle("dark-mode");
}