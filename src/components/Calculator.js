import React,{useState} from 'react'
import {Container,Screen,Previous,Currrent,Button} from '../styles/Main'

const Calculator = () => {
  const [currrent,setCurrrent] = useState('')
  const [previous,setPrevious] = useState('')
  const [operations,setOperations] = useState('')

  const appendValueHandler = (el) => {
    const value = el.target.getAttribute('data')
    if (value === '.' && currrent.includes('.')) return
    setCurrrent(currrent + value)
  }

  const deleteHandler = () => {
    setCurrrent(String(currrent).slice( 0, -1))
  }

  const allclearHandler = () => {
    setCurrrent ("");
    setOperations ("");
    setPrevious ("");
  }

  const chooseOperationHandler = (el) => {
    if (currrent === '') return
    if (previous !== '') {
      let value = compute()
      setPrevious(value);
    } else {
      setPrevious(currrent);
    }
    setCurrrent('');
    setOperations(el.target.getAttribute('data'));
  }

  const equalHandler = () => {
    let value = compute()
    if (value === undefined || value == null) return;
    setCurrrent(value);
    setPrevious("");
    setOperations("");
  }
  const compute = () => {
    let result;
    let previousNumber = parseFloat(previous);
    let currrentNumber = parseFloat(currrent);
    if (isNaN(previousNumber) || isNaN(currrentNumber)) return;
    switch (operations) {
      case '÷':
        result = previousNumber / currrentNumber ;
        break;
        case 'x':
        result = previousNumber * currrentNumber ;
        break;
        case '+':
        result = previousNumber + currrentNumber ;
        break;
        case '-':
        result = previousNumber - currrentNumber ;
        break;
        default: return;
    }
    return result;
  };
  return (
    <>
      <Container>
        <Screen>
          <Previous>{previous} {operations}</Previous>
          <Currrent>{currrent}</Currrent>
        </Screen>
        <Button gridSpan = {2} control onClick={allclearHandler}>AC</Button>
        <Button onClick={deleteHandler}>DEL</Button>
        <Button data = {'÷'} operation onClick={chooseOperationHandler}>÷</Button>
        <Button data = {7} onClick={appendValueHandler}>7</Button>
        <Button data = {8} onClick={appendValueHandler}>8</Button>
        <Button data = {9} onClick={appendValueHandler}>9</Button>
        <Button data = {'x'} operation onClick={chooseOperationHandler}>x</Button>
        <Button data = {4} onClick={appendValueHandler}>4</Button>
        <Button data = {5} onClick={appendValueHandler}>5</Button>
        <Button data = {6} onClick={appendValueHandler}>6</Button>
        <Button data = {'+'} operation onClick={chooseOperationHandler}>+</Button>
        <Button data = {1} onClick={appendValueHandler}>1</Button>
        <Button data = {2} onClick={appendValueHandler}>2</Button>
        <Button data = {3} onClick={appendValueHandler}>3</Button>
        <Button data = {'-'} operation onClick={chooseOperationHandler}>-</Button>
        <Button data = {'.'} onClick={appendValueHandler} decimal>.</Button>
        <Button data = {0} onClick={appendValueHandler}>0</Button>
        <Button gridSpan = {2} equals onClick={equalHandler}>=</Button>
      </Container>
    </>
  )
}

export default Calculator