import { useState } from "react";

import "./App.css"; // Importa o arquivo CSS para estilização do componente

function App() {
  // Declaração dos estados do componente usando o Hook useState
  const [number, setNumber] = useState("");
  const [fromBase, setFromBase] = useState("decimal");
  const [toBase, setToBase] = useState("binary");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Função para atualizar o estado "number" quando o valor do input é alterado
  const handleNumberChange = (e) => {
    const value = e.target.value;
    setNumber(value);
  };

  // Função para atualizar o estado "fromBase" quando a opção selecionada no primeiro select é alterada
  const handleFromBaseChange = (e) => {
    const value = e.target.value;
    setFromBase(value);
  };

  // Função para atualizar o estado "toBase" quando a opção selecionada no segundo select é alterada
  const handleToBaseChange = (e) => {
    const value = e.target.value;
    setToBase(value);
  };

  // Função para realizar a conversão quando o botão "Converter" é clicado
  const handleConvert = () => {
    // Verifica se a conversão de binário para outra base é válida (contém apenas 0 e 1)
    if (fromBase === "binary" && !/^[01]+$/.test(number)) {
      setErrorMessage("Números binários são compostos apenas por 0 e 1."); // Se não for mostra a mensagem
      setResult("");
      return;
    }

    let convertedNumber = "";

    // Realiza a conversão baseado nas opções selecionadas
    if (fromBase === "decimal") {
      if (toBase === "binary") {
        convertedNumber = decimalToBinary(number);
      } else if (toBase === "octal") {
        convertedNumber = decimalToOctal(number);
      } else if (toBase === "hexadecimal") {
        convertedNumber = decimalToHexadecimal(number);
      }
    } else if (fromBase === "binary") {
      if (toBase === "decimal") {
        convertedNumber = binaryToDecimal(number);
      } else if (toBase === "octal") {
        convertedNumber = decimalToOctal(binaryToDecimal(number));
      } else if (toBase === "hexadecimal") {
        convertedNumber = decimalToHexadecimal(binaryToDecimal(number));
      }
    }

    setResult(convertedNumber); // Atualiza o estado "result" com o valor convertido
  };

  // Função para converter um número decimal para binário
  const decimalToBinary = (decimal) => {
    return parseInt(decimal).toString(2);
  };

  // Função para converter um número decimal para octal
  const decimalToOctal = (decimal) => {
    return parseInt(decimal).toString(8); // parseInt() converte o número de uma base para um número inteiro e, em seguida, toString() converte o número inteiro de volta para uma string na base desejada, resultando na conversão do mesmo
  };

  // Função para converter um número decimal para hexadecimal
  const decimalToHexadecimal = (decimal) => {
    return parseInt(decimal).toString(16).toUpperCase();
  };

  // Função para converter um número binário para decimal
  const binaryToDecimal = (binary) => {
    return parseInt(binary, 2).toString();
  };

  return (
    <div className="container">
      <h2>Conversor</h2>
      <div>
        <label>Número:</label>
        <input type="text" value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <label>De:</label>
        <select value={fromBase} onChange={handleFromBaseChange}>
          <option value="decimal">Decimal</option>
          <option value="binary">Binário</option>
        </select>
      </div>
      <div>
        <label>Para:</label>
        <select value={toBase} onChange={handleToBaseChange}>
          <option value="binary">Binário</option>
          <option value="octal">Octal</option>
          <option value="hexadecimal">Hexadecimal</option>
          <option value="decimal">Decimal</option>
        </select>
      </div>
      <button onClick={handleConvert}>Converter</button>
      <div className="result-container">
        <label>Resultado:</label>
        <input type="text" value={result} readOnly />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default App;
