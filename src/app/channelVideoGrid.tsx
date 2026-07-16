"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styles from "./page.module.css";

const VIEWED_CHANNELS_KEY = "foppolotv:viewed-channels";

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
  const [viewedChannelIds, setViewedChannelIds] = useState<ReadonlySet<string>>(() => {
    if (typeof window === "undefined") {
      return new Set();
    }

    try {
      const rawValue = sessionStorage.getItem(VIEWED_CHANNELS_KEY);
      if (!rawValue) {
        return new Set();
      }

      const parsedValue: unknown = JSON.parse(rawValue);
      if (!Array.isArray(parsedValue)) {
        return new Set();
      }

      const validIds = parsedValue.filter((value): value is string => typeof value === "string");
      return new Set(validIds);
    } catch {
      sessionStorage.removeItem(VIEWED_CHANNELS_KEY);
      return new Set();
    }
  });
  const gridItems = Array.from({ length: gridCells }, (_, index) => channels[index] ?? null);

  const markChannelAsViewed = (channelId: string) => {
    setViewedChannelIds((previousIds) => {
      if (previousIds.has(channelId)) {
        return previousIds;
      }

      const nextIds = new Set(previousIds);
      nextIds.add(channelId);
      sessionStorage.setItem(VIEWED_CHANNELS_KEY, JSON.stringify(Array.from(nextIds)));
      return nextIds;
    });
  };

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
            <button
              key={channel.id}
              type="button"
              className={`${styles.channelCell} ${viewedChannelIds.has(channel.id) ? styles.channelCellSeen : ""}`}
              aria-pressed={viewedChannelIds.has(channel.id)}
              onClick={() => {
                markChannelAsViewed(channel.id);
                setSelectedChannel(channel);
              }}
            >
              <div className={`${styles.channelMeta} ${viewedChannelIds.has(channel.id) ? styles.channelMetaSeen : ""}`}>
                <Image src={channel.imageSrc} alt={`Logo ${channel.name}`} width={56} height={56} className={styles.channelImage} />
                <span className={styles.channelName}>{channel.name}</span>
                {viewedChannelIds.has(channel.id) ? <span className={styles.seenBadge}>✓</span> : null}
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
