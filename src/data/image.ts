export interface Image {
    id: number;
    src: string;
    alt: string;
    title: string;
    description: string;
    location: string;
    operation: string | null;
    type: "Liberation" | "Hearts and Minds" | "Operation";
    date: string;
    href: string;
}