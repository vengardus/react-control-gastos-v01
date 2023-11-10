import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
export function Dona({ datagrafica, data,titulo }) {
  const style ={
    width:"400px"
  }
  return (
    <Container>
      <section >
        <Doughnut data={datagrafica} style={style}/>
      </section>
      <section>
        <h2>{titulo} por categoria</h2>
        {data.map((item, index) => {
          return (
            <ContentCars key={index}>
              <div className="contentDescripcion">
                <span>{item.icon}</span>
                <span className="descripcion">{item.description}</span>
              </div>
              <span>{item.total}</span>
            </ContentCars>
          );
        })}
      </section>
    </Container>
  );
}
const Container = styled.div`
display:flex;
flex-wrap:wrap;
/* flex-direction: column; */
justify-content:center;
align-items:center;
gap:18px;
margin-bottom: 3rem;

`;
const ContentCars = styled.div`
display:flex;
justify-content:space-between;
.contentDescripcion{
    display:flex;
    gap:10px;
}
`;