import { useRouter } from "next/router";
import {
  collection,
  documentId,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Article from "../../components/article";
import { agendaState } from "../../components/recoil/recoil";
import Title from "../../components/title";
import BestComment from "../../components/bestComment";
import AgreeBtn from "../../ui/button/agreeBtn";
import AlternativeBtn from "../../ui/button/alternativeBtn";
import DisagreeBtn from "../../ui/button/disagreeBtn";
import News from "../../components/modal/news";
import Modal from "react-modal";
import Comment from "../../components/comment";

// HpwvymAsOmqwAPEuTrIs

const Agenda = () => {
  const router = useRouter();
  const db = getFirestore();
  const [agenda, setAgenda] = useRecoilState(agendaState);
  const [isFetched, setIsFetched] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [isFetched]);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const fetchData = async () => {
    const q = query(
      collection(db, "agenda"),
      where(documentId(), "==", `${router.query.id}`)
    );
    const snapshot = await getDocs(q);
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setAgenda(data);
    if (!isFetched) {
      setIsFetched(true);
    }
  };
  return (
    <div>
      {isFetched ? (
        <div>
          <Title />
          <Article />
          <News />
          <BestComment />
          <AgreeBtn />
          <AlternativeBtn />
          <DisagreeBtn />
          <Comment />
        </div>
      ) : null}
    </div>
  );
};

Modal.setAppElement("#root");

export default Agenda;
