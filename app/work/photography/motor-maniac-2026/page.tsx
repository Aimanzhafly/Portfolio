
import PhotographyProject from "@/components/photography/PhotographyProject";

const photos = [
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 6.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 18.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 26.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 37.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 43.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 45.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 123.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 152.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 167.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 208.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 211.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 222.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 249.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 252.jpg",
  "/portfolio/photography/motor-maniac-2026/Motor Maniac 26 0 299.jpg",
];

export default function MotorManiacPage() {
  return (
    <PhotographyProject
      title="MOTOR MANIAC 2026."
      category="AUTOMOTIVE · EVENT PHOTOGRAPHY"
      year="2026"
      description="A collection of selected moments, automotive culture and visual stories from Motor Maniac 2026."
      photos={photos}
      projectNumber="001"
    />
  );
}
