const inputMin = 125730;
const inputMax = 579381;

const checkPasswordRange = (minRange: number, maxRange: number) => {
  let totalMatches = 0;

  for (let i = minRange; i <= maxRange; i++) {
    const passwordString = i.toString();

    if (passwordString.length !== 6) {
      continue;
    }

    const passwordResult = passwordString.split('').reduce(
      (prev, curr) => {
        // Check for consecutive digits
        const totalNumbers = prev.totalNumbers;
        const lastDigit = totalNumbers.charAt(totalNumbers.length - 1);

        if (lastDigit === curr) {
          prev.hasConsecutive = true;
        }

        // Check for non decreasing digits
        if (lastDigit > curr) {
          prev.hasDescreasing = true;
        }

        prev.totalNumbers += curr;

        return prev;
      },
      { totalNumbers: '', hasConsecutive: false, hasDescreasing: false }
    );

    if (passwordResult.hasConsecutive && !passwordResult.hasDescreasing) {
      totalMatches += 1;
    }
  }

  return totalMatches;
};

const totalMatches = checkPasswordRange(inputMin, inputMax);
console.log('Total Passwords filling condition: ', totalMatches);
