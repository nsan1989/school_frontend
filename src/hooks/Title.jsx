import { useEffect } from "react";
export default function Title (title)  {

    useEffect(() => {
        document.title = `St.Anthony School | ${title}`;
    }, [title]);

    return null;
}