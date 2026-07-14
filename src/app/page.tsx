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
    youtubeUrl: "https://youtu.be/55gapNdb7So?si=zv1FQr7a-ldJEAI8",
  },
  {
    id: "rai-2",
    name: "Rai 2",
    imageSrc: "/channels/rai-2.webp",
    youtubeUrl: "https://www.youtube.com/", // da chiedere
  },
  {
    id: "rete-4",
    name: "Rete 4",
    imageSrc: "/channels/rete-4.webp",
    youtubeUrl: "https://youtu.be/7kpfRB_cD3c?si=_xMih7EEPDrqK9qM",
  },
  {
    id: "canale-5",
    name: "Canale 5",
    imageSrc: "/channels/canale-5.webp",
    youtubeUrl: "https://youtu.be/072-f4jgdIA?si=lkcKkuT8DBwcg-aP", // da controllare
  },
  {
    id: "italia-1",
    name: "Italia 1",
    imageSrc: "/channels/italia-1.webp",
    youtubeUrl: "https://youtu.be/SDlFcShNMGc?si=7LbSda4T9ol0UZHG",
  },
  {
    id: "real-time",
    name: "Real Time",
    imageSrc: "/channels/real-time.webp",
    youtubeUrl: "https://youtu.be/VexFYQgy7BQ?si=1114g9XtfrXtyqGe", // da controllare
  },
  {
    id: "dmax",
    name: "DMAX",
    imageSrc: "/channels/dmax.webp",
    youtubeUrl: "https://www.youtube.com/", // da chiedere
  },
  {
    id: "prime-video",
    name: "Prime Video",
    imageSrc: "/channels/prime-video.webp",
    youtubeUrl: "https://youtu.be/6fGWYz9IbuY?si=0wx-59KEhgG206Yd", // da controllare
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
