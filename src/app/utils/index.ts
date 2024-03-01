import {MessageRole} from "@/app/types/chat";
import {GptVersion} from "@/app/components/constants";
import {useAccessStore} from "@/app/store/modules/access";
const host = 'http://13.49.181.170:80'



function getHeaders() {
    const accessState = useAccessStore.getState()

    const headers =  {
        Authorization:  accessState.token,
        'Content-Type': 'application/json;charset=utf-8'
    }

    return headers
}
export const completions = (data:{
    messages:{content:string,role:MessageRole}[],
    model:GptVersion
})=>{
    console.log(data)
    return fetch(
        `${host}/api/v1/chat/completions`,{
            method: 'POST',
            headers: {
                // // b8b6 后续用于写入 token 加密信息
                // Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJvcGVuSWQiOiJvNVJfNTZINmJDaXlSY2YxazBBVjBVVkNCX3dBIiwiaXNzIjoibzVSXzU2SDZiQ2l5UmNmMWswQVYwVVZDQl93QSIsImV4cCI6MTcwNzkyMzM4NCwiaWF0IjoxNzA3MzE4NTg0LCJqdGkiOiIzMmRmM2VkZC01OTU5LTQ4MjEtYjNhMy02ODlhYWJhZWUyNzYifQ.9tY_EAxriA5P3RA25QilQFTQZu2Oh_8XpmSk4J13M-8",
                // 'Content-Type': 'application/json;charset=utf-8',
                ...getHeaders()

            },
            body: JSON.stringify(data)
        }
    )

}

export async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
}

/**
 * 登录鉴权接口
 * @param token
 */
export const login = (token: string) => {
    const accessState = useAccessStore.getState()
    return fetch(`${host}/api/v1/auth/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `code=${accessState.accessCode}`
    });
};