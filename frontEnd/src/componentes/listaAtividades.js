import React, { useState, useEffect } from 'react';

function ListaAtividades(props) {
  const userId = props.userId;
  const [listaAtividade, setListaAtividade] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/ativ/select', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_user: userId })
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar atividades');
        }

        const data = await response.json();

        setListaAtividade(data || []);
      } catch (error) {
        console.error('Erro durante a requisição:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <ul>
        {listaAtividade.map((atividade, index) => (
          <li key={index}>
            <p>Tipo: {atividade.tipo}</p>
            <p>Título: {atividade.titulo}</p>
            <p>Descrição: {atividade.descricao}</p>
            <p>Data: {new Date(atividade.data).getDate()}/{new Date(atividade.data).getMonth() + 1}/{new Date(atividade.data).getFullYear()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaAtividades;
