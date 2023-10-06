//Function to append values
function append(value) {
  //Get input and add the value to it
  document.getElementById('input').value += value;
}

//Function to clear all values in input field
function clearAll() {
  //Setting value to an empty string
  document.getElementById('input').value = '';
}

//Function to remove the last character in the input field
function backspace() {
  //Get input
  var input = document.getElementById('input');
  //Remove last character
  input.value = input.value.slice(0, -1);
}

//Function to evaluate the expression
function calculate() {
  //Get input
  var input = document.getElementById('input');
  //Get expression
  var expression = input.value;

  try {
    //Calculate using the evaluation function
    var inputValue = evaluation(expression);
    //Update the input field with the result
    input.value = inputValue;
  } catch (error) {
    //Handle any errors such as dividing by 0
    input.value = 'Error';
  }
}

//Evaluation function
function evaluation(expression) {
  try {
    //Splitting tokens
    var tokens = expression.match(/([0-9.]+)|([+\-*/])/g);
    if (!tokens) {
      throw new Error('Invalid expression');
    }

    var numberArray = []; //Numbers in an array
    var operatorArray = []; //Operators in an array

    //For loop to cycle through each token
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i].trim();
      //Skip empty
      if (token.length === 0) continue;

      //If token is an operator, push to operators array
      if (['+', '-', '*', '/'].includes(token)) {
        operatorArray.push(token);
      } else {
        //If token is a number, parse it as a float and push to numbers array
        numberArray.push(parseFloat(token));
      }
    }

    //Perform the calculations with operators and numbers arrays while there's still an operator
    while (operatorArray.length > 0) {
      var operator = operatorArray.shift();
      var number1 = numberArray.shift();
      var number2 = numberArray.shift();

      switch (operator) {
        //Addition
        case '+':
          numberArray.unshift(number1 + number2);
          break;
        //Subtraction
        case '-':
          numberArray.unshift(number1 - number2);
          break;
        //Multiplication
        case '*':
          numberArray.unshift(number1 * number2);
          break;
        //Division
        case '/':
          if (number2 === 0) {
            throw new Error('Division by zero');
          }
          numberArray.unshift(number1 / number2);
          break;
      }
    }

    //Check if there is one number in the numbers array
    if (numberArray.length !== 1) {
      throw new Error('Invalid expression');
    }

    //Return the calculated result
    return numberArray[0];
  } catch (error) {
    throw new Error('Invalid expression');
  }
}
