import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";

export default function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  console.log(listCard);

  const handleRegisterGame = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values.name,
        cost: values.cost,
        category: values.category,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            name: values.name,
            cost: values.cost,
            category: values.category,
          },
        ]);
      });
    });
  };

  const handleCalculate = () => {
    Axios.get("http://localhost:3001/getTotal").then((response) => {
      const totalCostValue = response.data[0]["somaTotal"];
      console.log(response.data);
      setTotalCost(totalCostValue);
      console.log(totalCostValue);
    });
  };
  

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };



  return (
    <div className="app-container">
      <div className="register-container">

        <h1 className="register-title">Minhas Despesas</h1>

        <div className="register-labels">
          <th>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              className="register-input"
              onChange={handleaddValues}
            />
          </th>

          <th>
            <input
              type="text"
              placeholder="Preço"
              name="cost"
              className="register-input"
              onChange={handleaddValues}
            />
          </th>

          <th>
            <input
              type="text"
              placeholder="Categoria"
              name="category"
              className="register-input"
              onChange={handleaddValues}
            />
          </th>

          <th>
            <button onClick={handleRegisterGame} className="register-button">
              Cadastrar
            </button>
          </th>

          <th>
            <button onClick={handleCalculate} className="calc-button">
              Calcular Total
            </button>
          </th>

          <th className="total-cost-container">
            <p>R${totalCost}</p>
          </th>

        </div>
      </div>

      <div className="cards-info">
        <th>
          <div className="cards-container">
            {listCard.map((val) => (
              <Card
                listCard={listCard}
                setListCard={setListCard}
                key={val.id}
                id={val.id}
                name={val.name}
                cost={val.cost}
                category={val.category}
              />
            ))}
          </div>
        </th>
        
       

      </div>
      
      


    </div>
  );
}