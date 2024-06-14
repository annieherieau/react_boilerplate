import { useAtom } from "jotai";
import { emptyNotice, noticeAtom } from "../app/atoms";
import { useEffect } from "react";
import { useState } from "react";

export default function NoticeModal() {
  const [notice, setNotice] = useAtom(noticeAtom);
  const [show, setShow] = useState(notice.message ? true : false);

  const handleClose = () => {
    setShow(false);
    setNotice(emptyNotice);
  };

  useEffect(() => {
    setShow(notice.message ? true : false);
  }, [notice]);

  if (show) {
    return (
      <div>
        <p>
          {notice.type} : {notice.message}
        </p>
        <button onClick={handleClose}>Fermer</button>
      </div>
    );
  }
}
