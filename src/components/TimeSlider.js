import { useState } from "react";
// import { useEffect } from "react";
import { Container } from "react-bootstrap";

import "./TimeSlider.css";

const TimeSlider = function ({properties, steps, setForecastLayer}) {
    
    const min = 0;
    const max = min + properties.timesteps - 1;

    const initindex = steps.findIndex( (step) => step.time === properties.cycletime )

    const [index, onChange] = useState(initindex);

    console.log('From time slider, checking time in step', steps[index]);
    console.log('From timeslider', properties, steps, index, initindex);
    

    // To create a bubble and move with the slider
    // useEffect( () => {
    //     const buble = document.querySelector('#buble');
    //     let newloc = Number(((index - min)*100)/(max-min));
        
    //     if (buble) {
    //         buble.style.left = `${newloc}%`;
    //     }
    // });

    return (
        <Container>
            <div className="timeslider-parent">
            <span id='starttime'>{properties.starttime}</span>
            <div id="timeslider">
                <input 
                    type="range" 
                    id='range' 
                    className="slider" 
                    min={min} 
                    max={max} 
                    value={index} 
                    onChange={ ({target: {value: step} }) => {
                        onChange(step); 
                        setForecastLayer({available:true, folder:steps[step].folder, step:step});
                    }}/>
                <div id="buble">Currently viewing: <b>{steps[index].time}</b></div>
            </div>
            <span id='endtime'>{properties.endtime}</span>
            </div>
        </Container>
    );
}

export default TimeSlider;