import { AES, enc } from 'crypto-js';
import sha1 = require('sha1');

export const encryptPassword = (password: string) => {
  const hash_bytes = sha1(password);
  const byteArray = Buffer.from(hash_bytes, 'hex');
  const hexString = byteArray
    .toString('hex')
    .replace(/(.{2})/g, '$1-')
    .slice(0, -1)
    .toUpperCase();
  return hexString;
};

export const encryptAES128 = (text: string, key: string) => {
  const keyUTF8 = enc.Utf8.parse(key);
  const IV = enc.Utf8.parse(key.substr(0, 16));
  return AES.encrypt(text, keyUTF8, { iv: IV }).toString();
};

export const decryptAES128 = (text: string, key: string) => {
  try {
    const keyUTF8 = enc.Utf8.parse(key);
    const IV = enc.Utf8.parse(key.substr(0, 16));
    const decrypted = AES.decrypt(text, keyUTF8, { iv: IV }).toString(enc.Utf8);
    try {
      const decryptedDataJson = JSON.parse(decrypted ?? '');
      return decryptedDataJson;
    } catch (error) {
      return decrypted;
    }
  } catch (error) {
    return undefined;
  }
};
