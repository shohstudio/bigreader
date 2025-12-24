import CryptoJS from 'crypto-js';

const SECRET_KEY = "big-reader-secret-key-2024"; // In real app, this should be env var

export const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (ciphertext) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        return null;
    }
};
