import React from 'react'

const CPFMaskedInput = ({ cpf, setCPF, className } : {cpf: string, setCPF: React.Dispatch<React.SetStateAction<string>>, className: string}) => {
    const handleCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
        let targetValue: string = e.target.value
        targetValue = targetValue.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2')

        if (targetValue.length > 14) return
        setCPF(targetValue)
    }

    return <>
        <input className={className} type="text" onChange={(e) => handleCPF(e)} value={cpf}/>
    </>
}

export default CPFMaskedInput
