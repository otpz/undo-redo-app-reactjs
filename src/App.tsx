import { useEffect, useState } from 'react';
import Ball from './components/Ball/Ball';
import { TypeBall } from './types/TypeBall';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'

import './App.css';

const App:React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const [balls, setBalls] = useState<TypeBall[]>([])
  const [copyBalls, setCopyBalls] = useState<TypeBall[]>([])

  const mouseClicked = (e: MouseEvent): void  => {
    const clickedElement = e.target as Element
    
    if (clickedElement.id === "button"){
      return;
    }

    setBalls(copyBalls)

    const newBall: TypeBall = {
      id: balls.length + 1,
      posX: e.clientX,
      posY: e.clientY
    }

    setBalls((prev) => [...prev, newBall])
    setCurrentIndex(prev => prev + 1)
  }

  useEffect(() => {
    window.addEventListener("mousedown", mouseClicked)
    return () => {
      window.removeEventListener("mousedown", mouseClicked)
    }
  })

  useEffect(() => {
    setCopyBalls(balls.slice(0, currentIndex)) 
  }, [currentIndex, setCopyBalls, balls])

  const undo = (): void => {
    setCurrentIndex((prev) => {
      if (prev >= 0){
        return prev - 1
      } else {
        return prev
      }
    })
  }

  const redo = (): void => {
    setCurrentIndex((prev) => {
      if (prev !== balls.length){
        return prev + 1
      } else {
        return prev
      }
    })
  }

  return (
    <div className="container">
      <button id='button' className="button" onClick={undo}><FontAwesomeIcon id='button' icon={faRotateLeft}/> Undo</button>
      <button id='button' className="button redo" onClick={redo}><FontAwesomeIcon id='button' icon={faRotateRight}/> Redo</button>
      <span className='info top'>Balls on the screen: {copyBalls.length}</span>
      {
        copyBalls.map((ball, idx) => (
          <Ball key={idx} posX={ball.posX} posY={ball.posY}/>
        ))
      }
      <div className='footer'>
        <span className='info'>This project made by <a rel="noreferrer" target='_blank' className='link' href="https://github.com/otpz">Osman TOPUZ</a></span>
      </div>
    </div>
  )
}

export default App;
