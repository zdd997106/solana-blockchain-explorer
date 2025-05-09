import { Service } from './core';

// export default class TransactionsService extends Service {
//   public getLatestTransactions = async (limit: number) => {
//     const slot = await this.rpc.getSlot().send();
//     const slots = await this.rpc.getBlocks(slot - BigInt(limit) + 1n, slot).send();

//     const blocks = await Promise.all(
//       slots.map(async (slot) => {
//         const block = await this.rpc
//           .getBlock(slot, {
//             transactionDetails: 'none',
//           })
//           .send();
//         return block;
//       }),
//     );

//     return blocks;
//   };
// }
