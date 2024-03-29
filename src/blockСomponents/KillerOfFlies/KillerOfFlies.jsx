import React, {useState} from 'react';
import style from './KillerOfFliesSpace.module.css'
import Fly from "./Fly";
import DeadFly from "./DeadFly";

const KillerOfFlies = (props) => {
    let initialState = 20;
    let initialStateDead = 0;
    let flies = [];
    let deadFlies = [];
    let coordDeadFly = [];
    let totalPoints;
    /* coordinates of the center of the screen */
    const screenWidth = document.documentElement.clientWidth / 2;
    const screenHeight = document.documentElement.clientHeight / 2;

    let tellFly = [
        'Hi',
        'Hello!',
        'Who are you?',
        'what do you need?',
        'my name is Zhuzha',
        'oh no!',
    ]

    const [counter, setCounter] = useState(initialState);
    const [counterDeadFly, setCounterDeadFly] = useState(initialStateDead)
    const [coordDeadFlyX, setCoordDeadFlyX] = useState([])
    const [coordDeadFlyY, setCoordDeadFlyY] = useState([])

    const plus = () => {
        setCounter(getCount => getCount + 1);
    }

    const minus = () => {
        setCounter(getCount => getCount - 1)
    }

    const refresh = (xD, yD) => {
        setCounter(getCount => getCount - 1);
        setCounterDeadFly(getCountDead => getCountDead + 1);
        coordDeadFlyX.push(xD)
        coordDeadFlyY.push(yD)
        setCoordDeadFlyX(coordDeadFlyX);
        setCoordDeadFlyY(coordDeadFlyY);
    }

    const reset = () => {
        setCounter(initialState);
        setCounterDeadFly(initialStateDead);
        setCoordDeadFlyX([]);
        setCoordDeadFlyY([]);
    }

    const calcPoints = function (coordDeadFlyXs, coordDeadFlyYs, screenWidth, screenHeight) {
        let wH = (screenWidth - coordDeadFlyXs) ** 2;
        let hH = (screenHeight - coordDeadFlyYs) ** 2;
        return (Math.sqrt(wH + hH));
    }

    for (let i = 0; i < counter; i++) {
        flies.push(<Fly i={i}
                        tellFly={tellFly}
                        refresh={refresh}
                        calcPoints={calcPoints}/>);
    }

    for (let d = 0; d < counterDeadFly; d++) {
        deadFlies.push(<DeadFly d={d} x={coordDeadFlyX[d]} y={coordDeadFlyY[d]}/>);
        let calcPointsRang = 0;
        if (calcPoints(coordDeadFlyX[d], coordDeadFlyY[d], screenWidth, screenHeight) < 201) {
            calcPointsRang = 10;
        }
        if (calcPoints(coordDeadFlyX[d], coordDeadFlyY[d], screenWidth, screenHeight) < 151) {
            calcPointsRang = 40;
        }
        if (calcPoints(coordDeadFlyX[d], coordDeadFlyY[d], screenWidth, screenHeight) < 101) {
            calcPointsRang = 70;
        }
        if (calcPoints(coordDeadFlyX[d], coordDeadFlyY[d], screenWidth, screenHeight) < 51) {
            calcPointsRang = 100;
        }
        coordDeadFly.push(calcPointsRang);
        totalPoints = coordDeadFly.reduce((a, b) => a + b)
    }

    return (
        <div className={style.space}>
            <div className={style.targetForShooting}>
                <div className={style.target__10}>10</div>
                <div className={style.target__40}>40</div>
                <div className={style.target__70}>70</div>
                <div className={style.target__100}>100</div>
            </div>
            <div className={style.flies}>МУХИ
                {deadFlies}
                {flies}
            </div>

            <div className={style.numberFlies}>
                <span>Очков: {totalPoints}</span><br/>
                <span>Количество мух: {counter}</span>
            </div>
            <div className={style.countingFlies}>
                <button onClick={plus}>+</button>
                <button onClick={minus}>-</button>
                <button onClick={reset}>reset</button>
            </div>
        </div>
    )
}

export default KillerOfFlies;