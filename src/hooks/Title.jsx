import { useEffect } from "react";
export default function Title (title)  {

    useEffect(() => {
        document.title = `Concept School | ${title}`;
    }, [title]);

    return null;
}