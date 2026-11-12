
import PhotographyProject from "@/components/photography/PhotographyProject";

const photos = [
  "/portfolio/photography/UWB/UWB High Res 0 8.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 27.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 32.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 71.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 84.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 106.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 127.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 156.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 188.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 192.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 200.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 259.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 292.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 312.jpg",
  "/portfolio/photography/UWB/UWB High Res 0 316.jpg",
];

export default function UWBPage() {
  return (
    <PhotographyProject
      title="UWB."
      category="STREETWEAR · LIFESTYLE · EDITORIAL"
      year="2026"
      description="A visual exploration of streetwear, identity and contemporary lifestyle through photography."
      photos={photos}
      projectNumber="002"
    />
  );
}
