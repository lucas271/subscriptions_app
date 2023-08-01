import React, { useEffect, useState } from 'react'
import { ItemContainer } from './Item.css'
import { IoIosArrowBack } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '../../features/store'
import { newProductThunk } from '../../features/product/productSlice'

const AddItemAdmin = ({ offset, itemsPerPage }: {offset: number, itemsPerPage: number}) => {
    const [addSign, setAddSign] = useState<boolean>(true)
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0.00)
    const [errors, setErrors] = useState<string[]>([])
    const dispatch = useDispatch<AppThunkDispatch>()

    useEffect(() => {
        setName('')
        setPrice(0.00)
    }, [addSign])

    const newItem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name || !price) return setErrors(['information is missing'])
        if (name.length < 5) setErrors(['too short name'])
        if (Number.isNaN(Number(price))) return setErrors(['InvalidNumber'])
        dispatch(newProductThunk({ name, price: Number(price), offset, limit: itemsPerPage }))
        setAddSign(!addSign)
    }
    if (errors.length > 0) {
        return <ItemContainer style={{ padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button className='back' onClick={() => setErrors([])}><IoIosArrowBack/></button>
            {errors.map(error => {
                return <p key={error}> {error}</p>
            })}
        </ItemContainer>
    }

    return <>
        <ItemContainer style={{ padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {addSign
                ? <>
                    <button className='add_button' onClick={() => setAddSign(!addSign)}>+</button>
                </>
                : <>
                    <button className='back' onClick={() => setAddSign(!addSign)}><IoIosArrowBack/></button>
                    <form action="" onSubmit={(e) => newItem(e)} className='new_item_container'>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <label htmlFor="name">Nome:</label>
                            <input id='name' value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <label htmlFor="price">preço:</label>
                            <input id='price' type="number" value={price} onChange={(e) => {
                                const targetValue = Number(e.target.value.replace('R$', ''))

                                setPrice(targetValue)
                            }}
                            />
                        </div>

                        <button>Enviar</button>
                    </form>
                </>}
        </ItemContainer>
    </>
}

export default AddItemAdmin
