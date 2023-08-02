import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

function Dropdown<T,>(props: {
    options: T[],
    value: number,
    onInput: (value: number) => void,
    children: (option: T) => preact.ComponentChild
}) {
    const [opened, setOpened] = useState(false);
    
    const handleClick = useCallback(() => {
        setOpened(true);
    }, []);
    
    useEffect(() => {
        const handler = () => {
            if (opened) {
                setOpened(false);
            }                        
        };
        
        window.addEventListener('click', handler);
        return () => window.removeEventListener('click', handler);
    })

    return <div class={`dropdown ${opened ? 'dropdown-open' : ''}`}>
        <div class="dropdown-button" onClick={handleClick}>{props.children(props.options[props.value])}</div>
        {opened && <div class="dropdown-content">{props.options.map((e, i) => (
            <div key={i} class="dropdown-option" onClick={() => props.onInput(i)}>
                {props.children(e)}
            </div>
        ))}</div>}
    </div>
}

export default Dropdown;
