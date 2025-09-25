import { useState, useEffect } from "react";

export default function SetTimeOutExample({ initialWidth = 150, step = 15, onDone, barColor = "#f00" }) {
    const [width, setWidth] = useState(initialWidth);

    useEffect(() => {
        if (width > 0) {
            const timer = setTimeout(() => {
                setWidth(w => {
                    const next = w - step;
                    if (next <= 0) {
                        if (onDone) onDone();
                        return 0;
                    }
                    return next;
                });
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [width, step, onDone]);

    return (
        <div style={{ width: width, height: 10, backgroundColor: barColor, transition: "width 0.3s linear" }} />
    );
}