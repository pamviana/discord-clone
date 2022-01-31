import React from "react";
import "./button-stickers.styles.css";
import appConfig from "../../config.json";

function ButtonStickers(props) {
  const [isOpen, setOpenState] = React.useState("");
  return (
    <>
      <button id="sticker-button" onClick={() => setOpenState(!isOpen)}>
        😋
      </button>
      {isOpen && (
        <div
          className="stickers-box-container"
          onClick={() => setOpenState(false)}
        >
          <p id="title-stickers-box"> Stickers </p>
          <ul className="stickers-list-container">
            {appConfig.stickers.map((sticker) => (
              <li
                id="sticker-li"
                key={sticker}
                onClick={() => {
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker);
                  }
                }}
              >
                <img id="sticker-img" alt="sticker" src={sticker} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default ButtonStickers;
