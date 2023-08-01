import React, { useEffect, useState } from 'react'
import { PaginationNumberContainer } from './styles.css'

interface Props {
    loading: boolean,
    itemsPerPage: number,
    amountOfProducts: number,
    maxAmountOfPaginationNums: number,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
}

const Pagination = ({ loading, itemsPerPage, amountOfProducts, maxAmountOfPaginationNums = 8, currentPage, setCurrentPage }: Props) => {
    const [paginationNumbers, setPaginationNumbers] = useState<number[]>([])
    const genPaginationNumbers = () => {
        setPaginationNumbers([])
        for (let i = currentPage; i <= currentPage * maxAmountOfPaginationNums; i++) {
            if (i > Math.ceil(amountOfProducts / itemsPerPage)) return
            setPaginationNumbers(pv => [...pv, i])
        }
    }

    useEffect(() => {
        genPaginationNumbers()
    }, [currentPage])

    if (amountOfProducts <= itemsPerPage) return <></>

    return <>
        <PaginationNumberContainer>
            {

                currentPage !== 1 && <button
                    className={'pagination_btn'}
                    disabled={loading}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                        &#60;
                </button>
            }
        </PaginationNumberContainer>

        {
            paginationNumbers.map(pageNumber => {
                return <PaginationNumberContainer key={pageNumber}>
                    <button
                        className={pageNumber === currentPage ? 'current_page_btn pagination_btn' : 'pagination_btn'}
                        disabled={pageNumber === currentPage || loading}
                        onClick={() => setCurrentPage(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                </PaginationNumberContainer>
            })
        }
        {
            <PaginationNumberContainer>
                {Math.round(amountOfProducts / itemsPerPage) > currentPage && <button
                    className='pagination_btn'
                    disabled={loading}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                &#62;
                </button>}
            </PaginationNumberContainer>

        }
    </>
}

export default Pagination
