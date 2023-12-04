import React from "react";
import ListaAtividades from "../componentes/listaAtividades"; // Certifique-se de importar o componente corretamente
import BasicDateCalendar from "../componentes/BasicDateCalendar";

function Home(props) {
  const userId = props.userId; // Acessa o valor de userId corretamente

  return (
    <div style={{ color: "#FFFFFF", height: "95.6vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: 90,
          paddingTop: 10,
        }}
      >
        <h1 style={{ marginRight: "auto" }}>Sigaa Planner</h1>
        <img
          style={{ paddingRight: 70 }}
          src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
          alt="Dashboard Icon"
          width="76"
          height="60"
        />
      </div>

      <div
        style={{
          marginLeft: "40px",
          paddingLeft: "20px",
          maxHeight: "500px",
          overflowY: "auto",
          maxWidth: "360px",
          marginTop: "100px",
          borderRadius: "10px",
          backgroundColor: "#323238",
        }}
      >
        <div style={{}}>
        <h2>Lista de Atividades</h2>
        </div>
        <ListaAtividades userId={userId} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "50px",
          right: "100px",
          color:'black',
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          fontWeight: 'bold',
        }}
      >
        <BasicDateCalendar />
      </div>
    </div>
  );
}
export default Home;
