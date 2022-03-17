"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    token: "",
    owners: [""],
    prefix: '-',
    allowlisted_bots: [""],
    faucet_currencies: [
        {
            name: 'BTC',
            min: 0.0001,
            max: 0.0002,
            decimals: 4,
            usd: true
        }
    ],
    cooldown: (12 * 60 * 60 * 1000), // 12 Hours
};
