export class Calculator {
  private firstOperand: string | null = null;
  private operation: string | null = null;
  private waitingForSecondOperand: boolean = false;
  private resetDisplay: boolean = false;

  public handleInput(input: string, currentDisplay: string): string {
    // Handle numeric input
    if (this.isNumeric(input)) {
      return this.handleNumericInput(input, currentDisplay);
    }

    // Handle decimal point
    if (input === '.') {
      return this.handleDecimalPoint(currentDisplay);
    }

    // Handle operations
    if (['+', '-', '*', '/', '='].includes(input)) {
      return this.handleOperation(input, currentDisplay);
    }

    // Handle clear
    if (input === 'C') {
      this.firstOperand = null;
      this.operation = null;
      this.waitingForSecondOperand = false;
      this.resetDisplay = false;
      return '0';
    }

    // Handle negation
    if (input === '±') {
      return this.handleNegation(currentDisplay);
    }

    // Handle percentage
    if (input === '%') {
      return this.handlePercentage(currentDisplay);
    }

    return currentDisplay;
  }

  private isNumeric(value: string): boolean {
    return /^\d$/.test(value);
  }

  private handleNumericInput(digit: string, currentDisplay: string): string {
    // If display should be reset or we're waiting for second operand
    if (this.resetDisplay || this.waitingForSecondOperand) {
      this.resetDisplay = false;
      this.waitingForSecondOperand = false;
      return digit;
    }

    // Special handling for 0
    if (currentDisplay === '0') {
      return digit;
    }

    // Otherwise append the digit
    return currentDisplay + digit;
  }

  private handleDecimalPoint(currentDisplay: string): string {
    // If display should be reset or we're waiting for second operand
    if (this.resetDisplay || this.waitingForSecondOperand) {
      this.resetDisplay = false;
      this.waitingForSecondOperand = false;
      return '0.';
    }

    // If there's already a decimal point, don't add another
    if (currentDisplay.includes('.')) {
      return currentDisplay;
    }

    // Otherwise add the decimal point
    return currentDisplay + '.';
  }

  private handleOperation(operation: string, currentDisplay: string): string {
    const inputValue = parseFloat(currentDisplay);

    // If this is the first operation or we just did an equals
    if (this.firstOperand === null) {
      this.firstOperand = currentDisplay;
      this.operation = operation;
      this.waitingForSecondOperand = true;
      return currentDisplay;
    }

    // If we're waiting for the second operand and the user pressed another operation
    if (this.waitingForSecondOperand && operation !== '=') {
      this.operation = operation;
      return currentDisplay;
    }

    // Otherwise, perform the pending operation
    const result = this.performOperation(parseFloat(this.firstOperand), inputValue);
    const resultString = this.formatResult(result);

    if (operation === '=') {
      this.firstOperand = null;
      this.operation = null;
      this.waitingForSecondOperand = false;
      this.resetDisplay = true;
    } else {
      this.firstOperand = resultString;
      this.operation = operation;
      this.waitingForSecondOperand = true;
    }

    return resultString;
  }

  private performOperation(firstOperand: number, secondOperand: number): number {
    switch (this.operation) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return secondOperand !== 0 ? firstOperand / secondOperand : 0;
      default:
        return secondOperand;
    }
  }

  private formatResult(result: number): string {
    // Format the result to avoid floating point precision issues
    return Number.isInteger(result) ? result.toString() : result.toFixed(10).replace(/\.?0+$/, '');
  }

  private handleNegation(currentDisplay: string): string {
    const value = parseFloat(currentDisplay);
    return (value * -1).toString();
  }

  private handlePercentage(currentDisplay: string): string {
    const value = parseFloat(currentDisplay);
    return (value / 100).toString();
  }
}