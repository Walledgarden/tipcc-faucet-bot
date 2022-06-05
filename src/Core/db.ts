interface IDBEntry {
  user_id: string,
  last_claim: number | null;
}

interface IFaucetDatabase {
  path: string,
  content: IDBEntry[]
}

import * as fs from 'fs';
import config from '../../config';
import * as path from 'path';

const p = path.resolve(__dirname, '../../db.json').toString();

export class FaucetDatabase implements IFaucetDatabase {
  path: string;

  content: IDBEntry[];

  constructor(pathd: string = p) {
    this.path = pathd;
    this.content = JSON.parse(fs.readFileSync(pathd, 'utf8'));
  }

  getUser(user_id: string): IDBEntry {
    return this.content.find(entry => entry.user_id === user_id) ?? { user_id: user_id, last_claim: null };
  }

  updateUser(user_id: string, last_claim: number | null) {
    if (!this.content.find(entry => entry.user_id === user_id)) {
      this.content.push({ user_id: user_id, last_claim: last_claim });
    } else {
      (this.content.find(entry => entry.user_id === user_id) ?? { last_claim:null }).last_claim = last_claim;
    }
    this.save();
  }

  onFaucetTimeout(user_id: string): boolean {
    const user = this.getUser(user_id);
    if (!user.last_claim) return false;
    return user.last_claim + config.cooldown > +new Date();
  }

  save() {
    fs.writeFileSync(this.path, JSON.stringify(this.content));
  }
}