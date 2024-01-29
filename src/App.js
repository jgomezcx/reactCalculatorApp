import './App.css';
import Calc from './index';
import { useState, useEffect } from 'react';
import * as math from 'mathjs';


//const Input = ({ input, result, operation, display}) => {
const Input = ({ display }) => {
  const Style = {
    color: 'black',
    backgroundColor: '#DCDCDC',
    border: '1px groove white',
    height: '40px', 
    textAlign: 'center',
    margin: 'auto',
  };

  return(
      <div style={Style}>{display}</div>
      //<div style={Style}>' {input} ' -- ' {result} ' -- ' {operation} ' : {display}</div>
  );

};

const App = () => {

  const [display, setDisplay] = useState('');

  const [input, setInput] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [firstAction, setFirstAction] = useState(true);
  const [newAction, setNewAction] = useState(true);

  const [activeOperation, setActiveOperation] = useState('');


  const addText = (value) => {

    if (firstAction){
      setInput(value);
      setFirstAction(false);
      setNewAction(false);

    }
    else if(newAction){
      setInput(value);
      setNewAction(false);

    }
    else{
      if (value === '.' && input.includes('.')){
        setDisplay( result.toString() + operation.toString() + input.toString() );
        return;
      }
      setInput((prevInput) => prevInput + value);
    }
    
    setDisplay( result.toString() + operation.toString() + input.toString() );
    
  };
  useEffect(() => {
    setDisplay( result.toString() + operation.toString() + input.toString() );}, [ result.toString() + operation.toString() + input.toString() ]);


  const setAction = (action) => {
    if (!firstAction && !newAction){
      setResult(math.evaluate(result.toString() + operation.toString() + input.toString()));
      setInput('');

    }
    setOperation(action);
    setNewAction(true);
    setActiveOperation(action);
  };
  useEffect(() => {
    setDisplay( result.toString() + operation.toString() );}, [ result.toString() + operation.toString() ]); 


  const calcResult = () => {
    if (result === '') {
      setResult(input);
    }
    else{
      setResult(math.evaluate((result + operation + input).toString()));
    }

    setNewAction(true);
    setActiveOperation('');
  };
    useEffect(() => {
      setDisplay(result);}, [result]); 


  const clearText = () => {
    setInput('');
    setOperation('');
    setResult('');
    setNewAction(true);
    setFirstAction(true);
    setDisplay('');
    setActiveOperation('');
  };

  return (
    <div className="App">
      <header className="App-header">
      
        <div className="border" className="container" >
          <h1> Calculator App </h1>
          <div className="calculator">
            <div className="button-row">
              <Input /*input={input} result={result} operation={operation}*/ display={display}  />
              {/*<p className="display" type="text" readOnly/> */}
              <button style={{ color:'#E00', backgroundColor:'#D6ABA7', width: '170px' }} onClick={() => clearText()}>C</button>

            </div>
            <div className="buttons">
              <div className="button-row">

                <button onClick={() => addText("7")}>7</button>
                <button onClick={() => addText("8")}>8</button>
                <button onClick={() => addText("9")}>9</button>

                <button onClick={() => setAction("*")} id="mult" className={`action-button ${activeOperation === '*' ? 'active' : ''}`} >x</button>
              </div>

              <div className="button-row">

                <button onClick={() => addText("4")}>4</button>
                <button onClick={() => addText("5")}>5</button>
                <button onClick={() => addText("6")}>6</button>

                <button onClick={() => setAction("/")} id="div" className={`action-button ${activeOperation === '/' ? 'active' : ''}`} >/&nbsp;</button>
              </div>

              <div className="button-row">

                <button onClick={() => addText("1")}>1</button>
                <button onClick={() => addText("2")}>2</button>
                <button onClick={() => addText("3")}>3</button>

                <button onClick={() => setAction("-")} id="sub" className={`action-button ${activeOperation === '-' ? 'active' : ''}`} >-&nbsp;</button>
              </div>

              <div className="button-row">

                <button onClick={() => addText("0")}>0</button>
                <button onClick={() => addText(".")}>.&nbsp;</button>
                <button onClick={() => calcResult()} style={{backgroundColor:'#656'}}  >=</button>
                <button onClick={() => setAction("+")} id="add" className={`action-button ${activeOperation === '+' ? 'active' : ''}`}>+</button>
              </div>

            </div>
          </div>

        </div>
        
      </header>
    </div>
  );
}

export default App;
