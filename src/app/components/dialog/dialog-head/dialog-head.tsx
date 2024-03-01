import styles from "@/app/components/dialog/dialog-list.module.scss";
import {useNavigate} from "react-router-dom";
import {userChatStore} from "@/app/store/modules/chat-store";


export function DialogHead() {
    const navigate = useNavigate();
    const chatStore = userChatStore();
    const [sessions, currentSessionIndex, selectSession] = userChatStore(
        (state) => [
            state.sessions,
            state.currentSessionIndex,
            state.selectSession]);

    return <div className={styles["dialog-head"]}>
        <div className={styles["dialog-search-box"]}><input type="text" placeholder="搜索"/>
        </div>
        <button className={styles["dialog-search-add"]} onClick={()=>{
            let session = chatStore.openSession();
            selectSession(0)
            navigate(`/chat/${session.id}`, {state: {title: session.dialog.title,avatar:session.dialog.avatar}})
        }}></button>
    </div>;
}