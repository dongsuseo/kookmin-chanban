import {
  collection,
  doc,
  getDocs,
  getFirestore,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styles from "../bestComment/Bestcomments.module.css";
import { communityState, loginState } from "../recoil/recoil";

const LikePart = ({ data, op }) => {
  const login = useRecoilValue(loginState);
  const db = getFirestore();
  const router = useRouter();
  const [like, setLike] = useState(data.like);
  const [isClicked, setIsClicked] = useState(false);
  const community = useRecoilValue(communityState);
  const commentList = ["agreeComment", "alternativeComment", "disagreeComment"];

  const updateLike = async () => {
    const q = query(
      collection(db, community, router.query.id, commentList[op - 1]),
      where("hide", "==", false),
      where("author", "==", `${data.author}`)
    );
    const snapShot = await getDocs(q);
    snapShot.forEach(async (item) => {
      const newLike = doc(
        db,
        community,
        router.query.id,
        commentList[op - 1],
        item.id
      );
      await updateDoc(newLike, { like: increment(1) });
    });
  };

  const cancelLike = async () => {
    const q = query(
      collection(db, community, router.query.id, commentList[op - 1]),
      where("hide", "==", false),
      where("author", "==", `${data.author}`)
    );
    const snapShot = await getDocs(q);
    snapShot.forEach(async (item) => {
      const newLike = doc(
        db,
        community,
        router.query.id,
        commentList[op - 1],
        item.id
      );
      await updateDoc(newLike, { like: increment(-1) });
    });
  };

  const likeHandler = () => {
    setLike(like + 1);
    setIsClicked(true);
    updateLike();
  };

  const cancelHandler = () => {
    setLike(like - 1);
    setIsClicked(false);
    cancelLike();
  };

  const loginHandler = () => {
    console.log("로그인 하세요!");
  };

  function Icon({ isClicked }) {
    if (op === 1) {
      return (
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={
            login ? (!isClicked ? likeHandler : cancelHandler) : loginHandler
          }
          className={isClicked ? styles.fullBtn : styles.likeBtn}
        >
          <path
            d="M3.06983 9.75L8 2.63391L12.9302 9.75H3.06983Z"
            stroke="#2373EB"
            strokeWidth="3"
          />
        </svg>
      );
    } else if (op === 2) {
      return (
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={
            login ? (!isClicked ? likeHandler : cancelHandler) : loginHandler
          }
          className={isClicked ? styles.fullBtn : styles.likeBtn}
        >
          <path
            d="M3.06983 9.75L8 2.63391L12.9302 9.75H3.06983Z"
            stroke="#FFC700"
            strokeWidth="3"
          />
        </svg>
      );
    } else if (op === 3) {
      return (
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={
            login ? (!isClicked ? likeHandler : cancelHandler) : loginHandler
          }
          className={isClicked ? styles.fullBtn : styles.likeBtn}
        >
          <path
            d="M3.06983 9.75L8 2.63391L12.9302 9.75H3.06983Z"
            stroke="#FF0000"
            strokeWidth="3"
          />
        </svg>
      );
    }
  }

  return (
    <div className={styles.like}>
      <Icon isClicked={isClicked} />
      &nbsp;
      {like}
    </div>
  );
};

export default LikePart;
