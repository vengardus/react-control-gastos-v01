import styled from "styled-components"
import { v } from "../../styles/variables"
import { useUserStore } from "../../store/UserStore"
import { BtnCircular } from "../moleculas/BtnCircular"

export const CardTotales = ({
    color,
    total,
    title,
    icon
}) => {
    const { dataUser } = useUserStore()
    return (
        <Container>
            <div className="ContentTextos">
                <section>
                    <span className="title">{title}</span>
                    <b>{<v.iconoFlechabajo/>}</b>
                </section>

                <span className="total">
                    {dataUser.currency} {total}
                </span>

                <section className="contentIcono">
                    <BtnCircular
                        width={"50px"}
                        height={"50px"}
                        bgColor={color}
                        fontSize={"25px"}
                        icon={icon}
                        textColor={"white"}
                        translateX={"120px"}
                        translateY={"-15px"}
                    />
                </section>

            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.bg};
    border-radius: 25px;
    padding: 20px;
    width: 100%;
    justify-content: space-between;
    .ContentTextos {
        display: flex;
        flex-direction: column;
        .title {
            font-size: 14px;
        }
        .total {
            font-size: 22px;
            font-weight: 200;
        }
        section {
            display: flex;
            gap: 10px;
            align-items: center;
        }
    }
    .ContentIcono {
        display: flex;
    }
`