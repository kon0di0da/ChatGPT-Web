import { Input } from "antd";
import { Button } from "antd";
import {useAccessStore} from "@/app/store/modules/access";
import styles from "./auth.module.scss";
import {access} from "node:fs";
import React from "react";
import {useNavigate} from "react-router-dom";
import ChatGPTIcon from "@/app/icons/chatgpt.svg";
import QRCode from "/QRCode.png";
import Image from "next/image";

export function Auth() {
    const navigate = useNavigate();
    const access = useAccessStore();
    return (
        <div className={styles["auth-page"]}>
            <ChatGPTIcon/>
            <div className={styles["auth-title"]}>OpenAIhub</div>
            <div className={styles["auth-sub-title"]}>
                学习AI开发、掌握AI部署、运用AI提效
            </div>
            <Image
                // src="https://bugstack.cn/images/personal/qrcode.png"
                src="/QRCode.png"
                style={{ width: 1000 }}
             alt="QRCode"/>
            <div className={styles["auth-tips"]}>
                扫码关注公众号【你微笑浏览】，
                <a
                    href="/QRCode.png"
                    target="_blank"
                >
                    回复【403】获取访问密码
                </a>
            </div>

            <Input
                className={styles["auth-input"]}
                type="password"
                placeholder="在此处填写访问码"
                value={access.accessCode}
                onChange={(e) => {
                    access.updateCode(e.currentTarget.value);
                }}
                status={access.accessCodeErrorMsgs?'error': ''}

            />
            {access.accessCodeErrorMsgs?<span className={styles['auth-error']}>{access.accessCodeErrorMsgs}</span>:null}


            <div className={styles["auth-actions"]}>
                <Button type="primary" onClick={() => access.login()}>确认登录👣</Button>
                <Button type="text">稍后再说</Button>
            </div>
            <span>
        说明：此平台主要以学习OpenAI为主，请合理、合法、合规的使用相关资料！
      </span>
        </div>
    );
}