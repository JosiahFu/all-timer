import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { pd } from '../Util';

function Timer(props: {
    targetTime: Date
}) {
    const [currentTime, setCurrentTime] = useState(Date.now());
    
    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
        return () => clearInterval(interval);
    })
    
    const diff = props.targetTime.valueOf() - currentTime.valueOf();
    
    
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) % 24;
    const minutes = Math.floor(diff / (60 * 1000)) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    
    return <div class="timer">
        <span class="field">{days}</span>
        days,
        <span class="field">{pd(hours)}</span>
        hours,
        <span class="field">{pd(minutes)}</span>
        minutes, and
        <span class="field">{pd(seconds)}</span>
        seconds
    </div>;
}

export default Timer;
