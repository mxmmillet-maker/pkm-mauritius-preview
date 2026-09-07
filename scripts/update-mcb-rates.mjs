import { writeFile } from 'node:fs/promises';
const response = await fetch('https://mcb.mu/');
if (!response.ok) throw new Error(`MCB returned ${response.status}`);
const match = (await response.text()).match(/var currencyData = (\{.*?\});/s);
if (!match) throw new Error('MCB currency data was not found');
const data = JSON.parse(match[1]);
const currencies = ['aud', 'cad', 'chf', 'eur', 'gbp', 'usd'];
const rates = Object.fromEntries(currencies.map((c) => [c.toUpperCase(), data[c].rate]));
await writeFile(new URL('../src/data/mcb-rates.json', import.meta.url), `${JSON.stringify({ updatedAt: new Date().toISOString(), source: 'https://mcb.mu/', rates }, null, 2)}\n`);
