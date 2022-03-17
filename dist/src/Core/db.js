"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaucetDatabase = void 0;
const fs = require("fs");
const config_1 = require("../../config");
const path = require("path");
const p = path.resolve(__dirname, '../../db.json').toString();
class FaucetDatabase {
    constructor(path = p) {
        this.path = path;
        this.content = JSON.parse(fs.readFileSync(path, 'utf8'));
    }
    getUser(user_id) {
        return this.content.find(entry => entry.user_id === user_id) ?? { user_id: user_id, last_claim: null };
    }
    updateUser(user_id, last_claim) {
        if (!this.content.find(entry => entry.user_id === user_id)) {
            this.content.push({ user_id: user_id, last_claim: last_claim });
        }
        else {
            (this.content.find(entry => entry.user_id === user_id) ?? { last_claim: null }).last_claim = last_claim;
        }
        this.save();
    }
    onFaucetTimeout(user_id) {
        const user = this.getUser(user_id);
        if (!user.last_claim)
            return false;
        return user.last_claim + config_1.default.cooldown > +new Date();
    }
    save() {
        fs.writeFileSync(this.path, JSON.stringify(this.content));
    }
}
exports.FaucetDatabase = FaucetDatabase;
