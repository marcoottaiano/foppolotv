import ChannelVideoGrid from "./channelVideoGrid";
import styles from "./page.module.css";

type Channel = {
  id: string;
  name: string;
  imageSrc: string;
  videoSrc: string;
};

const CHANNELS: Channel[] = [
  {
    id: "rai-1",
    name: "Rai 1",
    imageSrc: "/channels/rai-1.webp",
    videoSrc: "/videos/rai-1.mp4",
  },
  {
    id: "rai-2",
    name: "Rai 2",
    imageSrc: "/channels/rai-2.webp",
    videoSrc: "/videos/rai-2.mp4",
  },
  {
    id: "rete-4",
    name: "Rete 4",
    imageSrc: "/channels/rete-4.webp",
    videoSrc: "/videos/rete-4.mp4",
  },
  {
    id: "canale-5",
    name: "Canale 5",
    imageSrc: "/channels/canale-5.webp",
    videoSrc: "/videos/canale-5.mp4",
  },
  {
    id: "italia-1",
    name: "Italia 1",
    imageSrc: "/channels/italia-1.webp",
    videoSrc: "/videos/italia-1.mp4",
  },
  {
    id: "real-time",
    name: "Real Time",
    imageSrc: "/channels/real-time.webp",
    videoSrc: "/videos/real-time.mp4",
  },
  {
    id: "dmax",
    name: "DMAX",
    imageSrc: "/channels/dmax.webp",
    videoSrc: "/videos/dmax.mp4",
  },
  {
    id: "prime-video",
    name: "Prime Video",
    imageSrc: "/channels/prime-video.webp",
    videoSrc: "/videos/prime-video.mp4",
  },
  {
    id: "disney-plus",
    name: "Disney Plus",
    imageSrc: "/channels/disney-plus.webp",
    videoSrc: "/videos/disney-plus.mp4",
  },
  {
    id: "netflix",
    name: "Netflix",
    imageSrc: "/channels/netflix.webp",
    videoSrc: "/videos/netflix.mp4",
  },
  {
    id: "mtv",
    name: "MTV",
    imageSrc: "/channels/mtv.webp",
    videoSrc: "/videos/mtv.mp4",
  },
  {
    id: "rai-sport",
    name: "Rai Sport",
    imageSrc: "/channels/rai-sport.webp",
    videoSrc: "/videos/rai-sport.mp4",
  },
];

const GRID_CELLS = 12;

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.wrapper}>
        <h1 className={styles.title}>Foppolo TV</h1>
        <ChannelVideoGrid channels={CHANNELS} gridCells={GRID_CELLS} />
      </section>
    </main>
  );
}
