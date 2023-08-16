import axios from "axios";
import config from "../app-configs";
import * as crypto from "crypto";

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCX2tv81auMPajzyJADf1Iga5iJ
LHI7flt/ae0Bb6OoE6ZdN1puvX7cAKCfhRPrr6g5kViBt9zlChGd50ZHwuIxw/3n
GMmkMb8kI4UEBSh+Q7br7StITGtmlq/upfXtXYKlypZ6IejDOypUFTe7gZIGwe/M
qsD6xdP/PYXJauo2JwIDAQAB
-----END PUBLIC KEY-----`;

const encrypt = (text) => {
    const buffer = Buffer.from(text);
    const encrypted = crypto.publicEncrypt({ key: PUBLIC_KEY, padding: crypto.constants.RSA_PKCS1_PADDING }, buffer);

    return encrypted.toString("base64");
};

export const getSSOToken = async (username, password) => {
    const encryptPassword = {
        timestamp: new Date().toUTCString(),
        username,
        password,
    };

    const request = {
        username,
        encryptedPassword: encrypt(JSON.stringify(encryptPassword)),
        language: "en",
    };

    const result = await axios.post(config.connectSiteUrl, request);

    if (result?.data?.redirectUri) {
        return new URL(result?.data?.redirectUri)?.searchParams.get("token");
    }

    return null;
};

export default getSSOToken;
