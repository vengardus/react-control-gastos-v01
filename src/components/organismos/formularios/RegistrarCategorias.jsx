import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { CirclePicker } from "react-color";
import Emojipicker from "emoji-picker-react";
import { v } from "../../../styles/variables";
import { useCategoryStore } from "../../../store/CategoryStore";
import { useUserStore } from "../../../store/UserStore";
import { useOperations } from "../../../store/OperationsStore";
import { APP_CONFIG } from "../../../utils/dataEstatica";
import { Spinner } from "../../moleculas/Spinner";
import { InputText } from "./InputText";
import { BtnSave } from "../../moleculas/BtnSave"

export const RegistrarCategorias = ({ onClose, dataSelect, accion }) => {

    const { categoryInsert, categoryUpdate } = useCategoryStore();
    const { dataUser } = useUserStore()
    const [showPicker, setShowPicker] = useState(false);
    const [emojiselect, setEmojiselect] = useState("😻");
    const [currentColor, setColor] = useState("#F44336");

    const [estadoProceso, setEstadoproceso] = useState(false);
    const { type } = useOperations();

    function onEmojiClick(emojiObject) {
        setEmojiselect(() => emojiObject.emoji);
        setShowPicker(false);
    }
    
    function elegirColor(color) {
        setColor(color.hex);
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const insertar = async (data) => {
        if (accion === APP_CONFIG.actionCrud.update) {
            const p = {
                description: data.description,
                color: currentColor,
                icon: emojiselect,
                id: dataSelect.id,
                id_user: dataUser.id,
                type: type,
            };
            try {
                setEstadoproceso(true);
                await categoryUpdate(p);
                setEstadoproceso(false);
                onClose();
            } catch (error) {
                console.log(error, "RegistrarCategoria")
            }
        } else {
            const p = {
                description: data.description,
                color: currentColor,
                icon: emojiselect,
                id_user: dataUser.id,
                type: type,
            };
            try {
                setEstadoproceso(true);
                await categoryInsert(p);
                setEstadoproceso(false);

                onClose();
            } catch (error) {
                alert("error ingresar Form");
            }
        }
    }
    useEffect(() => {
        if (accion === APP_CONFIG.actionCrud.update) {
            setEmojiselect(dataSelect.icono);
            setColor(dataSelect.color);
        }
    }, []);

    return (
        <Container>
            {estadoProceso && <Spinner />}

            <div className="sub-contenedor">
                <div className="headers">
                    <section>
                        <h1>
                            {accion == APP_CONFIG.actionCrud.update
                                ? "Editar categoria"
                                : "Registrar nueva categoria"}
                        </h1>
                    </section>

                    <section>
                        <span onClick={onClose}>x</span>
                    </section>
                </div>

                <form className="formulario" onSubmit={handleSubmit(insertar)}>
                    <section>
                        <div>
                            <InputText
                                defaultValue={dataSelect.descripcion}
                                register={register}
                                placeholder="Descripcion"
                                errors={errors}
                                style={{ textTransform: "capitalize" }}
                            />
                        </div>
                        <div className="colorContainer">
                            <ContentTitle>
                                {<v.paletacolores />}
                                <span>Color</span>
                            </ContentTitle>
                            <div className="colorPickerContent">
                                <CirclePicker onChange={elegirColor} color={currentColor} />
                            </div>
                        </div>
                        <div>
                            <ContentTitle>
                                <input
                                    readOnly={true}
                                    value={emojiselect}
                                    type="text"
                                    onClick={() => setShowPicker(!showPicker)}
                                ></input>
                                <span>icono</span>
                            </ContentTitle>
                            {showPicker && (
                                <ContainerEmojiPicker>
                                    <Emojipicker onEmojiClick={onEmojiClick} />
                                </ContainerEmojiPicker>
                            )}
                        </div>
                        <div className="btnguardarContent">
                            <BtnSave
                                icon={<v.iconoguardar />}
                                title="Guardar"
                                bgColor="#DAC1FF"
                            />
                        </div>
                    </section>
                </form>
            </div>
        </Container>
    );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      section {
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
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const ContainerEmojiPicker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;