import styled from "styled-components"
import PropTypes from "prop-types"
import { v } from "../../styles/variables"
import { InputSearchList } from "../moleculas/InputSearchList"
import iso from "iso-country-currency"
import { convertirCapitalize } from "../../utils/conversiones"
import { useState } from "react"


export const ListCountry = ({ setSelect, setState }) => {
    const isoCodes = iso.getAllISOCodes()
    const [dataResult, setDataResult] = useState([])
    console.log(isoCodes)

    const selectItem = (p) => {
        setSelect(p)
        setState()
    }


    const search = (e) => {
        const filterCodes = isoCodes.filter((item) => {
            const len = (e.target.value.length < 3) ? 3 : e.target.value.length
            return item.countryName.slice(0, len) == convertirCapitalize(e.target.value);
        })
        setDataResult(filterCodes)
    }

    return (
        <Container>
            <header className="header">
                <span>busca tu país</span>
                <span className="close" onClick={setState}>
                    {<v.iconocerrar />}
                </span>
            </header>
            <InputSearchList
                onChange={search}
                placeholder={"Buscar..."}
            />
            {
                dataResult.length > 0
                && dataResult.map((item, index) => {
                    return (
                        <ItemContainer key={index}
                            onClick={() => selectItem(item)}
                        >
                            <span>{item.countryName}</span>
                            <span>{item.symbol}</span>
                        </ItemContainer>
                    )
                })
            }
        </Container>
    )
}

ListCountry.propTypes = {
    setSelect: PropTypes.any,
    setState: PropTypes.func
}


const Container = styled.div`

`
const ItemContainer = styled.section`
    gap: 10px;
    display: flex;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        background-color: ${({ theme }) => theme.bgtotal};
    }
`;