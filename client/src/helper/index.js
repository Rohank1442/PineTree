export const attempts_Number = (result) => {
    return result.filter(r => r !== undefined).length;
}

export const earnPoints_Number = (result, answers, point) => {
    return result.map((element, i) => answers[i] === element).filter(i => i).map(i => point).reduce((prev, curr) => prev + curr, 0);
}

export const flagResult = (totalPoints, earnPoints) => {
    return (totalPoints * 50 / 100) < earnPoints
}