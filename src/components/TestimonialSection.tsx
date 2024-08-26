import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
    rating: 5,
  },
  {
    name: "Jill",
    username: "@jill",
    body: "Great quality products and excellent customer service. Highly recommended!",
    img: "https://avatar.vercel.sh/jill",
    rating: 4,
  },
  {
    name: "John",
    username: "@john",
    body: "The variety of styles is impressive. Found exactly what I was looking for.",
    img: "https://avatar.vercel.sh/john",
    rating: 5,
  },
  {
    name: "Jane",
    username: "@jane",
    body: "Fast shipping and the clothes fit perfectly. Will definitely shop here again.",
    img: "https://avatar.vercel.sh/jane",
    rating: 4,
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "Love the sustainable options. It's great to shop with a clear conscience.",
    img: "https://avatar.vercel.sh/jenny",
    rating: 5,
  },
  {
    name: "James",
    username: "@james",
    body: "The website is easy to navigate and the checkout process is smooth.",
    img: "https://avatar.vercel.sh/james",
    rating: 4,
  },
  {
    name: "Emma",
    username: "@emma",
    body: "Trendy designs and affordable prices. This is now my go-to fashion store.",
    img: "https://avatar.vercel.sh/emma",
    rating: 5,
  },
  {
    name: "Michael",
    username: "@michael",
    body: "The quality exceeds the price. Great value for money.",
    img: "https://avatar.vercel.sh/michael",
    rating: 4,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
  rating,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  rating: number;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-foreground" : "text-muted-foreground/20"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function MarqueeDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background ">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}