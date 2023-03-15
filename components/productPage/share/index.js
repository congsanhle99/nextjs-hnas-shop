import React from "react";
import {
  FacebookShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import styles from "./styles.module.scss";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WeiboIcon,
  WhatsappIcon,
} from "react-share";

const Share = () => {
  return (
    <div className={styles.share}>
      <FacebookShareButton url={window?.location.href}>
        <FacebookIcon size={38} />
      </FacebookShareButton>
      <FacebookShareButton url={window?.location.href}>
        <FacebookMessengerIcon size={38} />
      </FacebookShareButton>
      <TwitterShareButton url={window?.location.href}>
        <TwitterIcon size={38} />
      </TwitterShareButton>
      <RedditShareButton url={window?.location.href}>
        <RedditIcon size={38} />
      </RedditShareButton>
      <PinterestShareButton url={window?.location.href}>
        <PinterestIcon size={38} />
      </PinterestShareButton>
      <TelegramShareButton url={window?.location.href}>
        <TelegramIcon size={38} />
      </TelegramShareButton>
      <TumblrShareButton url={window?.location.href}>
        <TumblrIcon size={38} />
      </TumblrShareButton>
      <RedditShareButton url={window?.location.href}>
        <WeiboIcon size={38} />
      </RedditShareButton>
      <WhatsappShareButton url={window?.location.href}>
        <WhatsappIcon size={38} />
      </WhatsappShareButton>
    </div>
  );
};

export default Share;
