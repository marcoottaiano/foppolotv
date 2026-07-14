import Image from "next/image";
import styles from "./page.module.css";

type Channel = {
  id: string;
  name: string;
  imageSrc: string;
  youtubeUrl: string;
};

const CHANNELS: Channel[] = [
  {
    id: "rai-1",
    name: "Rai 1",
    imageSrc: "/channels/rai-1.webp",
    youtubeUrl: "https://www.youtube.com/",
  },
  {
    id: "rai-2",
    name: "Rai 2",
    imageSrc: "/channels/rai-2.webp",
    youtubeUrl: "https://www.youtube.com/",
  },
  {
    id: "rete-4",
    name: "Rete 4",
    imageSrc: "/channels/rete-4.webp",
    youtubeUrl: "https://www.youtube.com/",
  },
  {
    id: "canale-5",
    name: "Canale 5",
    imageSrc: "/channels/canale-5.webp",
    youtubeUrl: "https://www.youtube.com/",
  },
  {
    id: "italia-1",
    name: "Italia 1",
    imageSrc: "/channels/italia-1.webp",
    youtubeUrl: "https://www.youtube.com/",
  },
  {
    id: "real-time",
    name: "Real Time",
    imageSrc: "/channels/real-time.webp",
    youtubeUrl: "https://www.youtube.com/",
  },
  {
    id: "dmax",
    name: "DMAX",
    imageSrc: "/channels/dmax.webp",
    youtubeUrl: "https://www.youtube.com/",
  },
  {
    id: "prime-video",
    name: "Prime Video",
    imageSrc: "/channels/prime-video.webp",
    youtubeUrl: "https://www.youtube.com/",
  },
  {
    id: "disney-plus",
    name: "Disney Plus",
    imageSrc: "/channels/disney-plus.webp",
    youtubeUrl: "https://www.youtube.com/",
  },
  {
    id: "netflix",
    name: "Netflix",
    imageSrc: "/channels/netflix.webp",
    youtubeUrl: "https://www.youtube.com/",
  },
  {
    id: "mtv",
    name: "MTV",
    imageSrc: "/channels/mtv.webp",
    youtubeUrl: "https://www.youtube.com/",
  },
  {
    id: "rai-sport",
    name: "Rai Sport",
    imageSrc: "/channels/rai-sport.webp",
    youtubeUrl: "https://www.youtube.com/",
  },
];

const GRID_CELLS = 12;

export const dynamic = "force-dynamic";

export default function Home() {
  const gridItems = Array.from({ length: GRID_CELLS }, (_, index) => CHANNELS[index] ?? null);

  return (
    <main className={styles.page}>
      <section className={styles.wrapper}>
        <h1 className={styles.title}>Canali TV</h1>
        <div className={styles.grid}>
          {gridItems.map((channel, index) => {
            if (!channel) {
              return <div key={`empty-${index}`} className={styles.emptyCell} aria-hidden="true" />;
            }

            return (
              <a key={channel.id} href={channel.youtubeUrl} target="_blank" rel="noopener noreferrer" className={styles.channelCell}>
                <Image src={channel.imageSrc} alt={`Logo ${channel.name}`} width={56} height={56} className={styles.channelImage} />
                <span className={styles.channelName}>{channel.name}</span>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
