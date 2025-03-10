import { hnmArticles } from "../data/2025/hnm/hnm";
import { liberationArticles } from "../data/2025/lib/liberation";
import { operationArticles } from "../data/2025/operations/operations";

type EventType = "Operation" | "Liberation" | "Hearts and Minds";

function getEvent(title: string, type: EventType) {
    if (type === "Operation") {
        const event = operationArticles.find(article => article.title === title);
        return event;
    }
    else if (type === "Liberation") {
        const event = liberationArticles.find(article => article.title === title);
        return event;
    }else if (type === "Hearts and Minds") {
        const event = hnmArticles.find(article => article.title === title);
        return event;
    }
}

export default getEvent;
