import CryptoJS from "crypto-js";

export function encryptData(data, key) {
  return CryptoJS.AES.encrypt(data, key).toString();
}

export function decryptData(ciphertext, key) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return null;
  }
}
