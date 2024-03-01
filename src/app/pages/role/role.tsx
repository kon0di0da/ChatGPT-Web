import styles from './role.module.scss'
import React, {useEffect, useState} from "react";
import {RoleList,RoleContext} from "@/app/components/role/role-list/role-list";
import {Outlet} from "react-router";
import {Role} from "@/app/types/role";
import axios from "axios";

export function Role() {
    const [roles, setRoles] = useState<Role[]>([])
    const [selected, setSelected] = useState<number>(-1);
    const getRoleList = async () => {
        // const res = await axios.get("http://localhost:3006/roles");
        // const res = await axios.get("http://localhost:3006/roles");
        const res = await fetch(`/roles.json`).then((res) => res.json());
        setRoles([...roles, ...res?.roles])
    }
    useEffect(() => {
        getRoleList()
    },[])
    return (
        <div className={styles["role"]}>
            <RoleContext.Provider value={{roles, selected, setSelected}}>
                <RoleList/>
                {/*在父级路由中定义一个占位符*/}
                <Outlet/>
            </RoleContext.Provider>

        </div>
    );
}