import { sequelize } from "../../models/associations.js";

// Réinitialisation des séquences pour toutes les tables principales (PostgreSQL)
const sequences = [
  'user_id_seq',
  'origin_id_seq',
  'supplier_id_seq',
  'label_id_seq',
  'rhum_id_seq',
  'types_id_seq',
  'beer_id_seq',
  'peat_levels_id_seq',
  'whisky_id_seq'
];

await Promise.all(
  sequences.map(async (seq) => {
    try {
      await sequelize.query(`ALTER SEQUENCE "${seq}" RESTART WITH 1;`);
      console.log(`Séquence ${seq} réinitialisée.`);
    } catch (e) {
      console.warn(`Impossible de réinitialiser ${seq}:`, e.message);
    }
  })
);

console.log("Toutes les séquences principales ont été réinitialisées.");
