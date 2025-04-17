import { HoverEffect } from "@/blocks/Card/CardHoverEffect/card-hover-effect";
export const projects = [
  {
    title: "Stripe",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description: "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description: "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description: "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description: "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "楽天トラベルとSpring(Spring Day 2016)",
    description: "Spring Day 2016にて、楽天トラベルにおけるSpringの活用について発表を行いました。",
    link: "https://www.slideshare.net/slideshow/springspring-day-2016/69327034",
  },
  {
    title: "Spring Rest Docsの活用について",
    description: "JSUG(Japan Spring User Group)にてAPI Testing documentationについて発表を行いました。",
    link: "https://www.slideshare.net/slideshow/spring-onewebdocument/55886107",
  },
];

export default function Works() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
