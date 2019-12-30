import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrdecrService {
  constructor() { }

  // common method for set and get
  cryptIt(keys, value, type) {
    let key = CryptoJS.enc.Utf8.parse(keys);
    let iv = CryptoJS.enc.Utf8.parse(keys);
    let cryptedValue = type === 'encrypt' ? CryptoJS.enc.Utf8.parse(value.toString()) : value;

    let crypt = CryptoJS.AES[type](cryptedValue, key, 
      {
        keySize: 128/8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    
    return type === 'encrypt' ? crypt.toString() : crypt.toString(CryptoJS.enc.Utf8);
  }

  //The set method is use for encrypt the value.
  set(keys, value){
    let key = CryptoJS.enc.Utf8.parse(keys);
    let iv = CryptoJS.enc.Utf8.parse(keys);
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(keys, value){
    let key = CryptoJS.enc.Utf8.parse(keys);
    let iv = CryptoJS.enc.Utf8.parse(keys);
    let decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
