export const validateCPF = (cpf: string): boolean => {
    const cleanCPF: string = cpf.replaceAll('.', '').replaceAll('-', '')
    const CPFNumbers: number[] = Array.from(cleanCPF).map((cv) => {
        return Number(cv)
    })

    // first Number validation
    const firstNumberMultiplied: number[] = []
    for (let i = 10; i >= 2; i--) {
        firstNumberMultiplied.push(CPFNumbers[10 - i] * i)
    }

    // reduce firstNumberMultiplied, multiplies it times 10,
    // get the rest of the division resulted from the multiplied number divided by 11
    const firstNumberTotal: number = firstNumberMultiplied.reduce((pv, cv) => pv + cv) * 10 % 11

    // secondNumberValidation
    const secondNumberMultiplied = []
    for (let i = 11; i >= 2; i--) {
        secondNumberMultiplied.push(CPFNumbers[11 - i] * i)
    }

    // reduce firstNumberMultiplied, multiplies it times 10,
    // get the rest of the division resulted from the multiplied number divided by 11
    const secondNumberTotal: number = secondNumberMultiplied.reduce((pv, cv) => pv + cv) * 10 % 11

    if (cleanCPF.length < 11) return false

    const AllSameNumber = () => {
        const trues: boolean[] = []
        for (let i = 0; i < cleanCPF.length; i++) {
            if (cleanCPF[i] === (cleanCPF[i - 1] ? cleanCPF[i - 1] : cleanCPF[i + 1])) {
                trues.push(true)
            }
        }
        if (trues.length === 11) return true
    }

    if (AllSameNumber()) return false
    // reminder if firstNumberTotal/secondNumberTotal total
    // is equal to 10 it must be considered a 0

    if (cleanCPF.at(-2) !== String(firstNumberTotal) &&
    firstNumberTotal !== 10 && cleanCPF.at(-2) !== '0') return false

    // check if secondNumberTotal is equal to cpf second digit
    if (cleanCPF.at(-1) !== String(secondNumberTotal) &&
    secondNumberTotal !== 10 && cleanCPF.at(-1) !== '0') return false

    return true
}
