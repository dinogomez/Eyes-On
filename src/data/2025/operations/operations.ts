import type { Article } from "../../article";
import { operations } from "./src";

export const operationArticles: Article[] = [
  {
    id: 1,
    curator: "PFC Maverick",
    thumbnail_src: operations.src.red_dune.stallion_1,
    thumbnail_alt: "Operation Red Dune",
    title: "Operation Red Dune",
    description:
      "In the year 2000, the United States Army was defeated in North Takistan by local forces supported by Russia, leading to the capture of U.S. military equipment. Eleven years later, the U.S. Marine Corps launched an operation to reclaim the region, aiming to capture Takistani General Al Bamba Nokia and defeat the insurgents while recovering lost assets.",
    location: "Takistan",
    date: "March 7, 2025",
    href: "/operation/2025/red_dune",
    type: "Operation",
  },
  {
    id: 2,
    curator: "AMN amazingbeggar",
    thumbnail_src: operations.src.crimson_citadel.hostage,
    thumbnail_alt: "Operation Crimson Citadel",
    title: "Operation Crimson Citadel",
    description:
      "A radical insurgent group, the Eastern Dawn Movement (EDM), has launched a brutal uprising in San Antero inspired by extremist ideologies, the group has seized government buildings, banks, and key infrastructure, declaring the city an independent stronghold. With civilians trapped inside and reports of foreign fighters reinforcing the insurgency, NATO has deployed PJSF, a joint multinational force tasked with retaking the city, eliminating insurgent leadership, and rescuing hostages.",
    location: "Colombia",
    date: "March 8, 2025",
    href: "/operation/2025/crimson_citadel",
    type: "Operation",
  },
];
