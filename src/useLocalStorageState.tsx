import { StateUpdater, useCallback, useEffect, useState } from 'preact/hooks';

function useLocalStorageState<T>(initialValue: T, key: string): [T, StateUpdater<T>] {
    const [state, setState] = useState(initialValue);
    
    useEffect(() => {
        const currentValue = localStorage.getItem(key);
        if (currentValue) {
            setState(JSON.parse(currentValue));
        } else {
            localStorage.setItem(key, JSON.stringify(initialValue));
        }
    }, [key]);
    
    const handleUpdateState: StateUpdater<T> = useCallback(value => {
        setState(currentValue => {
            const newValue = (typeof value === 'function') ? (value as (prevState: T) => T)(currentValue) : value;
            localStorage.setItem(key, JSON.stringify(newValue));
            return newValue;
        });
    }, []);
    
    return [state, handleUpdateState];
}

export default useLocalStorageState;
