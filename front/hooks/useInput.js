import React, { useState, useCallback } from 'react';

export default (initial) => {
    const [value, setValue] = useState(initial);

    const handler = useCallback((event) => {
        setValue(event.target.value);
    }, [])
    return [value, setValue, handler];
};
