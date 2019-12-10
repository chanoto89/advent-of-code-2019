const inputMin = 125730;
const inputMax = 579381;
const checkPasswordRange = (minRange, maxRange) => {
    let totalMatches = 0;
    for (let i = minRange; i <= maxRange; i++) {
        const passwordString = i.toString();
        if (passwordString.length !== 6) {
            continue;
        }
        const passwordResult = passwordString.split('').reduce((prev, curr, idx) => {
            // Check for consecutive digits
            const lastDigit = passwordString.charAt(idx - 1);
            if (lastDigit === curr) {
                if (!prev.consecutiveDigits[curr]) {
                    prev.consecutiveDigits[curr] = 2;
                }
                else {
                    prev.consecutiveDigits[curr] += 1;
                }
            }
            // Check for non decreasing digits
            if (lastDigit > curr) {
                prev.hasDescreasing = true;
            }
            return prev;
        }, { consecutiveDigits: {}, hasDescreasing: false });
        const consecutiveDigits = passwordResult.consecutiveDigits;
        const consecutiveMatches = Object.keys(consecutiveDigits).filter(key => consecutiveDigits[key] === 2);
        if (consecutiveMatches.length && !passwordResult.hasDescreasing) {
            totalMatches += 1;
        }
    }
    return totalMatches;
};
const totalMatches = checkPasswordRange(inputMin, inputMax);
console.log('Total Passwords filling condition: ', totalMatches);
// Part 1
// const checkPasswordRange = (minRange: number, maxRange: number) => {
//   let totalMatches = 0;
//   for (let i = minRange; i <= maxRange; i++) {
//     const passwordString = i.toString();
//     if (passwordString.length !== 6) {
//       continue;
//     }
//     const passwordResult = passwordString.split('').reduce(
//       (prev, curr) => {
//         // Check for consecutive digits
//         const totalNumbers = prev.totalNumbers;
//         const lastDigit = totalNumbers.charAt(totalNumbers.length - 1);
//         if (lastDigit === curr) {
//           prev.hasConsecutive = true;
//         }
//         // Check for non decreasing digits
//         if (lastDigit > curr) {
//           prev.hasDescreasing = true;
//         }
//         prev.totalNumbers += curr;
//         return prev;
//       },
//       { totalNumbers: '', hasConsecutive: false, hasDescreasing: false }
//     );
//     if (passwordResult.hasConsecutive && !passwordResult.hasDescreasing) {
//       totalMatches += 1;
//     }
//   }
//   return totalMatches;
// };
//# sourceMappingURL=index.js.map