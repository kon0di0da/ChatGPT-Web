"use client";

import styles from "./home.module.scss";
import {SideBar} from "../../components/sidebar";

import {
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
// import { Router, Route, hashHistory } from 'react-router'
import dynamic from "next/dynamic";
import {Path} from "../../components/constants";
import {useSelector} from "react-redux";
import { FloatButton } from 'antd';
import { FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons';
import React, {useState} from "react";
import DialogMessage from "@/app/components/dialog/dialogMessage/dialog-message";
import RoleDetail from "@/app/components/role/role-detail/role-detail";
import {useAccessStore} from "@/app/store/modules/access";
import {useLocation} from "react-router";
import {Auth} from "@/app/pages/auth/auth";
const Chat = dynamic(async () => (await import("@/app/pages/chat/chat")).Chat);
const Role = dynamic(async () => (await import("@/app/pages/role/role")).Role);

function Screen() {
    // const =useSelector(state => state.status.tightBorder);
    const access = useAccessStore();
    const location = useLocation();
    const isAuthPath = location.pathname === '/auth';
    const isAuthorized = access.isAuthorized()
    const [tightBorder, setTightBorder] = useState(false);
    return (
        <div className={!tightBorder?styles.container:styles["tight-container"]}>
            {/* 工具菜单 */}


            {/* 路由地址 */}
            {!isAuthorized||isAuthPath?(<Auth />): (
                <>
                <SideBar/>
                <div className={styles["window-content"]}>
                <Routes>
                    <Route path={Path.Home} element={<Chat/>}/>
                    <Route path={Path.Chat} element={<Chat/>}>
                        <Route path=":id" element={<DialogMessage/>}/>
                    </Route>
                    <Route path={Path.Role} element={<Role/>}>
                        <Route path=":id" element={<RoleDetail/>}/>
                    </Route>

                </Routes>
            </div>
                </>
    )}
            {tightBorder===false?<FloatButton onClick={() => setTightBorder(!tightBorder)}
                         tooltip={<div>Zoom In</div>}
                         icon = <FullscreenOutlined/>/>:
            <FloatButton onClick={() => setTightBorder(!tightBorder)}
                         tooltip={<div>Zoom Out</div>}
                         icon = <FullscreenExitOutlined/>/>}
        </div>
    );
}

export function Home() {
    return (
        <Router>
            <Screen/>
        </Router>
    );
}