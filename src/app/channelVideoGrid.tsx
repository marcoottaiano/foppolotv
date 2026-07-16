"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styles from "./page.module.css";

type Channel = {
  id: string;
  name: string;
  imageSrc: string;
  videoSrc: string;
};

type ChannelVideoGridProps = {
  channels: ReadonlyArray<Channel>;
  gridCells: number;
};

export default function ChannelVideoGrid({ channels, gridCells }: ChannelVideoGridProps) {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const gridItems = Array.from({ length: gridCells }, (_, index) => channels[index] ?? null);

  useEffect(() => {
    if (!selectedChannel) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedChannel(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedChannel]);

  return (
    <>
      <div className={styles.grid}>
        {gridItems.map((channel, index) => {
          if (!channel) {
            return <div key={`empty-${index}`} className={styles.emptyCell} aria-hidden="true" />;
          }

          return (
            <button key={channel.id} type="button" className={styles.channelCell} onClick={() => setSelectedChannel(channel)}>
              <div className={styles.channelMeta}>
                <Image src={channel.imageSrc} alt={`Logo ${channel.name}`} width={56} height={56} className={styles.channelImage} />
                <span className={styles.channelName}>{channel.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      {selectedChannel ? (
        <div className={styles.modalOverlay} role="presentation" onClick={() => setSelectedChannel(null)}>
          <div className={styles.modalDialog} role="dialog" aria-modal="true" aria-label={`Player ${selectedChannel.name}`} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalChannel}>
                <Image src={selectedChannel.imageSrc} alt={`Logo ${selectedChannel.name}`} width={34} height={34} className={styles.channelImage} />
                <span className={styles.modalTitle}>{selectedChannel.name}</span>
              </div>
              <button type="button" className={styles.closeButton} onClick={() => setSelectedChannel(null)} aria-label="Chiudi player">
                Chiudi
              </button>
            </div>
            <div className={styles.modalPlayer}>
              <ReactPlayer src={selectedChannel.videoSrc} controls playing width="100%" height="100%" preload="metadata" controlsList="nodownload noplaybackrate" disablePictureInPicture />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
