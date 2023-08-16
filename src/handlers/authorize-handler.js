import axios from "axios";
import { userAgent } from "../constants/constants";
import config from "../app-configs";

const userServiceUrl = `${config.proxy}/user`;

export const signName = async (authorizeInfo, nickname = null) => {
    const requestBody = {
        session: authorizeInfo.ss,
        username: authorizeInfo.username,
        nickname: nickname ?? `STest${authorizeInfo.username.split("_")[1]}`,
        browserUserAgent: userAgent,
        avatar: 0,
    };

    return axios.post(`${userServiceUrl}/auth/signName`, requestBody);
};

export const authorize = async (ssoToken) => {
    const result = await axios.get(`${userServiceUrl}/auth/sso?token=${ssoToken}&system=5`, {
        "user-agent": userAgent,
    });

    return result.data;
};

export const setCurrencyGroup = async (ssoToken) => {
    const result = await axios.get(
        `${userServiceUrl}/CurrencyGroup/group?groupType=Default&token=${ssoToken}&language=vi-VN&gameId=0&partnerId=${config.partnerId}`,
        {
            "user-agent": userAgent,
        }
    );

    return result.data;
};
