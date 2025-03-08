import { getImage } from "../../../utils/image";

export const about = {
  src: {
    about: {
      profile: await getImage("/about/about.webp"),
      about_1: await getImage("/about/about_1.webp"),
      about_2: await getImage("/about/about_2.webp"),
      about_3: await getImage("/about/about_3.webp"),
      about_4: await getImage("/about/about_4.webp"),
    },
  },
};
