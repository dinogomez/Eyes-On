export interface Article {
  id: number;
  thumbnail_src: string;
  thumbnail_alt: string;
  title: string;
  description: string;
  location: string;
  date: string;
  href: string;
  curator: string;
  type: "Operation" | "Liberation" | "Hearts and Minds";
}
