import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private item = [];
  constructor() { }

  async store(storageKey: string, val: any){
    // const encryptedValue = btoa(escape(JSON.stringify(val)));
    await Preferences.set({
      key: storageKey,
      value: JSON.stringify(val),
    });
  }

  async get(storageKey: string){
    const res = await Preferences.get({key: storageKey});
    if(res){
      return JSON.stringify(res);
    }else{
      return false;
    }
  }

  async removeItem(storageKey: string){
    await Preferences.remove({key: storageKey});
  }

  async clear(){
    await Preferences.clear();
  }

  // Get Set
  setItem(item: never[]){this.item = item;}
  getItem(){ return this.item;}
}
