import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Switch } from "@mui/material";
import { useAccountStore } from "../../../store/AccountStore";
import { useCategoryStore } from "../../../store/CategoryStore";
import { useOperations } from "../../../store/OperationsStore";
import { useMovementStore } from "../../../store/MovementStore";
import { APP_CONFIG } from "../../../utils/dataEstatica";
import { v } from "../../../styles/variables";
import { InputNumber } from "./InputNumber";
import { InputText } from "./InputText";
import { Selector } from "../Selector";
import { ListGeneric } from "../../moleculas/ListGeneric";
import { BtnSave } from "../../moleculas/BtnSave";

export function RegistrarMovimientos({ 
    setState, 
    state, 
    dataSelect, 
    accion 
}) {
    const { cuentaItemSelect, dataAccount } = useAccountStore()
    const { 
        dataCategory, 
        categoriaItemSelect, 
        selectCategoria,
        categoryGet 
    } = useCategoryStore()
    const { type } = useOperations();
    const { movementInsert } = useMovementStore();

    const [estado, setEstado] = useState(true);
    const [ignorar, setIgnorar] = useState(false);
    const [stateCategorias, setStateCategorias] = useState(false);

    console.log('dataCategory', dataCategory)
    console.log('stateCategoria', stateCategorias)
    console.log('ctaItemselect', cuentaItemSelect, dataAccount)


    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const insertar = async (data) => {
        let estadoText = 0;
        if (estado) {
            estadoText = 1;
        }

        const p = {
            type: type,
            state: estadoText,
            date: data.fecha,
            description: data.description,
            id_account: cuentaItemSelect.id,
            value: parseFloat(data.monto),
            id_category: categoriaItemSelect.id,
        };


        try {
            console.log("insert movmenet", p)
            await movementInsert(p);
            setState();
        } catch (err) {
            alert(err);
        }
    };
    function estadoControl(e) {
        setEstado(e.target.checked);
    }


    return (
        <Container onClick={setState}>
            <div
                className="sub-contenedor"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="encabezado">
                    <div>
                        <h1>Nuevo {type == APP_CONFIG.movementType.ingreso ? "ingreso" : "gasto"}</h1>
                    </div>
                    <div>
                        <span onClick={setState}>{<v.iconocerrar/>}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit(insertar)} className="formulario">
                    <section>
                        <div>
                            <label>Monto:</label>
                            <div>
                                <InputNumber
                                    defaultValue={dataSelect.valor}
                                    register={register}
                                    placeholder="Ingrese monto"
                                    errors={errors}
                                    icono={<v.iconocalculadora />}
                                />
                            </div>
                        </div>
                        <ContainerFuepagado>
                            <span>{<v.iconocheck />}</span>
                            <label>Fue pagado:</label>
                            <Switch
                                onChange={estadoControl}
                                checked={estado}
                                color="warning"
                            />
                        </ContainerFuepagado>
                        <ContainerFecha>
                            <label>Fecha:</label>

                            <input
                                type="date"
                                {...register("fecha", { required: true })}
                            ></input>
                            {errors.fecha?.type === "required" && (
                                <p>El campo es requerido</p>
                            )}
                        </ContainerFecha>
                        <div>
                            <label>Descripción:</label>
                            <InputText
                                defaultValue={dataSelect.descripcion}
                                register={register}
                                placeholder="Ingrese una descripcion"
                                errors={errors}
                                style={{ textTransform: "capitalize" }}
                            />
                        </div>
                        <ContainerCategoria>
                            <label>Categoria: </label>
                            <Selector
                                color="#e14e19"
                                text1={categoriaItemSelect?.icon}
                                text2={categoriaItemSelect?.description}
                                state={stateCategorias}
                                func={() => setStateCategorias(!stateCategorias)}
                            />
                        </ContainerCategoria>
                    </section>
                    {stateCategorias && (
                        <ListGeneric
                            bottom="23%"
                            scroll="scroll"
                            setState={() => setStateCategorias(!stateCategorias)}
                            data={dataCategory}
                            func={selectCategoria}
                        />
                    )}

                    <div className="contentBtnsave">
                        <BtnSave
                            title="Guardar"
                            bgcolor="#DAC1FF"
                            icon={<v.iconoguardar />}
                            className="btnsave"
                        />
                    </div>
                </form>
            </div>
        </Container>
    );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  color: black;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    color: ${({ theme }) => theme.text};
    label {
      font-weight: 550;
    }
    .encabezado {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-items: center;
      margin-bottom: 20px;
      h1 {
        font-size: 30px;
        font-weight: 700;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      .contentBtnsave {
        padding-top: 20px;
        display: flex;
        justify-content: center;
      }
      section {
        padding-top: 20px;
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
  @keyframes scale-up-bottom {
    0% {
      transform: scale(0.5);
      transform-origin: center bottom;
    }
    100% {
      transform: scale(1);
      transform-origin: center bottom;
    }
  }
`;
const ItemContainer = styled.section`
  gap: 10px;
  width: 50%;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid ${(props) => props.color};
  transition: 0.3s;
  &:hover {
    background-color: ${(props) => props.color};
  }
`;
const ContainerFuepagado = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const ContainerCategoria = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const ContainerFecha = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  input {
    appearance: none;
    color: ${({ theme }) => theme.text};
    font-family: “Helvetica”, arial, sans-serif;
    font-size: 17px;
    border: none;
    background: ${({ theme }) => theme.bgtotal};
    padding: 4px;
    display: inline-block;
    visibility: visible;
    width: 140px;
    cursor: pointer;
    &:focus {
      border-radius: 10px;

      outline: 0;
      /* box-shadow: 0 0 5px 0.4rem rgba(252, 252, 252, 0.25); */
    }
  }
  input[type="date"]::-webkit-calendar-picker-indicator {
      background-color: white;
  }
`;