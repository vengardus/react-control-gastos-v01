import { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../store/UserStore";
import { useOperations } from "../../store/OperationsStore";
import { useMovementStore } from "../../store/MovementStore";
import { v } from "../../styles/variables";
import { Dona } from "./graficas/Dona";
import { Lineal } from "./graficas/Lineal";
import { Barras } from "./graficas/Barras";


export function Tabs() {
    const [activeTab, setactiveTab] = useState(0);
    const handleClick = (index) => {
        setactiveTab(index);
    };
    const dataUser = useUserStore((state) => state.dataUser)
    const { year, month, type, titleBtnDropDownMovements } = useOperations()
    const { dataRptMovimientosAñoMes, rptMovimientosAñoMes } =
        useMovementStore()
    const datagrafica = {
        labels: dataRptMovimientosAñoMes?.map((item) => item.description),
        datasets: [
            {
                tension: 0.3,
                fill: true,
                spacing: 10,
                label: "Total",
                borderRadius: 5,
                borderAlign: "inner",
                cutout: 30,
                minBarLength: "100px",
                data: dataRptMovimientosAñoMes?.map((item) => item.total),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 2,
                hoverOffset: 16,
                offset: 10,
            },
        ],
    };
    const { isLoading, error } = useQuery({
        queryKey: ["reporte movimientos", {
            año: year,
            mes: month,
            tipocategoria: type,
            idusuario: dataUser.id,
        }], queryFn: () =>
            rptMovimientosAñoMes({
                year: year,
                month: month,
                type_category: type,
                id_user: dataUser.id,
            })
    });
    if (isLoading) {
        return <h1>cargando</h1>;
    }
    if (error) {
        return <h1>Error</h1>;
    }

    return (
        <Container className="container" $activeTab={`${activeTab}00%`}>
            <ul className="tabs">
                <li
                    className={activeTab == 0 ? "active" : ""}
                    onClick={() => handleClick(0)}
                >
                    {<v.iconopie />}
                </li>
                <li
                    className={activeTab === 1 ? "active" : ""}
                    onClick={() => handleClick(1)}
                >
                    {<v.iconolineal />}
                </li>
                <li
                    className={activeTab === 2 ? "active" : ""}
                    onClick={() => handleClick(2)}
                >
                    {<v.iconobars />}
                </li>
                <span className="glider"></span>
            </ul>

            <div className="tab-content">
                {activeTab === 0 && (
                    <Dona datagrafica={datagrafica} data={dataRptMovimientosAñoMes} titulo={titleBtnDropDownMovements} />
                )}
                {activeTab === 1 && (
                    <Lineal datagrafica={datagrafica} data={dataRptMovimientosAñoMes} titulo={titleBtnDropDownMovements} />
                )}
                {activeTab === 2 && (
                    <Barras datagrafica={datagrafica} data={dataRptMovimientosAñoMes} titulo={titleBtnDropDownMovements} />
                )}
            </div>
        </Container>
    );
}
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  height: 100%;
  .tabs {
    list-style: none;
    display: flex;
    box-shadow: 0px 10px 20px -3px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.bg};
    position: relative;
    border-radius: 100px;
    justify-content: space-between;
    top: 0;
    left: 0;
    * {
      z-index: 2;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 54px;
      width: 150px;
      font-size: 1.25rem;
      font-weight: 500;
      border-radius: 99px;
      cursor: pointer;
      transition: color 0.15s ease-in;
    }
    .glider {
      position: absolute;
      color: "#fff";
      display: flex;
      height: 54px;
      width: 150px;
      background-color: ${(props) => props.theme.carouselColor};
      z-index: 1;
      border-radius: 99px;
      transition: 0.25s ease-out;
      transform: translateX(${(props) => props.$activeTab});
      box-shadow: 0px 10px 20px -3px ${(props) => props.theme.carouselColor};
    }
  }

  .tab-content {
    position: relative;
    /* border: 1px solid red; */
    border-radius: 6px;
    margin-top: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;