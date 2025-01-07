import { StatItem } from "@/types/StatItem";

export const statsData: StatItem[] = [
  {
    id: 1,
    icon: "/assets/following-icon.svg",
    alt: "following",
    count: 5,
    label: "Following",
  },
  {
    id: 2,
    icon: "/assets/followers-icon.svg",
    alt: "followers",
    count: 20,
    label: "Followers",
  },
  {
    id: 3,
    icon: "/assets/magic-star.svg",
    alt: "star",
    count: "4.2",
    additionalText: "(15)",
    label: "Rate",
  },
];
