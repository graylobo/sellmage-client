import { Button } from "antd";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface PopupConfig {
  width: number | string;
  height: number | string;
}

interface BrowserPopupProps {
  name: string;
  title?: string;
  disabled?: boolean;
  element: React.ReactNode;
  config?: PopupConfig;
}

export const BrowserPopup = ({
  name,
  title,
  element,
  disabled,
  config,
}: BrowserPopupProps) => {
  const _window = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const width =
        typeof config?.width === "string"
          ? (parseInt(config.width) / 100) * screenWidth
          : config?.width || 600;
      const height =
        typeof config?.height === "string"
          ? (parseInt(config.height) / 100) * screenHeight
          : config?.height || 400;
      const left = screenWidth / 2 / 2;
      const top = (screenHeight - height) / 2;

      const features = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`;
      _window.current = window.open("", "", features);

      const curWindow = _window.current;
      curWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${title}</title>
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>
      `);
      curWindow.document.close();
      curWindow.onbeforeunload = () => {
        setReady(false);
        setOpen(false);
      };

      setReady(true);
    } else {
      _window.current?.close();
      setReady(false);
    }
  }, [open, config]);

  useEffect(() => {
    if (_window.current) {
      copyStyles(window.document, _window.current.document);
    }
  }, [ready]);

  return (
    <>
      <Button disabled={disabled} onClick={() => setOpen(true)}>
        {name}
      </Button>
      {open && ready && createPortal(element, _window.current?.document.body)}
    </>
  );
};

function copyStyles(src, dest) {
  Array.from(src.styleSheets).forEach((styleSheet: any) => {
    dest.head.appendChild(styleSheet.ownerNode.cloneNode(true));
  });
  Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
}
