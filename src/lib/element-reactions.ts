// Drag-drop reaction outcomes — combine known chemistry with disclosure speculation.
import { ELEMENTS } from '@/data/elements';

export interface ReactionOutcome {
  product: string;
  formula: string;
  description: string;
  exotic?: boolean;
  fuel?: boolean;
}

interface ReactionRule {
  match: (a: string, b: string) => boolean;
  result: ReactionOutcome;
}

const pair = (x: string, y: string) => (a: string, b: string) =>
  (a === x && b === y) || (a === y && b === x);

const RULES: ReactionRule[] = [
  { match: pair('H', 'O'), result: { product: 'Water', formula: 'H₂O', description: 'The universal solvent — present everywhere life is found.' } },
  { match: pair('Na', 'Cl'), result: { product: 'Sodium Chloride', formula: 'NaCl', description: 'Common salt. Stable ionic lattice.' } },
  { match: pair('H', 'Cl'), result: { product: 'Hydrochloric Acid', formula: 'HCl', description: 'Strong mineral acid.' } },
  { match: pair('C', 'O'), result: { product: 'Carbon Dioxide', formula: 'CO₂', description: 'Greenhouse gas / plant respiration.' } },
  { match: pair('Fe', 'O'), result: { product: 'Iron Oxide', formula: 'Fe₂O₃', description: 'Rust. The red of Mars.' } },
  { match: pair('H', 'N'), result: { product: 'Ammonia', formula: 'NH₃', description: 'Pungent base — fertilizer foundation.' } },
  { match: pair('Au', 'Hg'), result: { product: 'Gold Amalgam', formula: 'AuHg', description: 'How the Anunnaki allegedly extracted gold from ore.' } },
  { match: pair('Ti', 'Al'), result: { product: 'Titanium-Aluminum Alloy', formula: 'TiAl', description: 'Aerospace skin — used in stealth aircraft.' } },
  { match: pair('U', 'Pu'), result: { product: 'Critical Mass', formula: '⁹²U + ⁹⁴Pu', description: 'Fission ignition — the Manhattan Project.', exotic: true } },
  { match: pair('Mc', 'Mc'), result: { product: 'Stable 115 Lattice', formula: 'Mc₂', description: 'BOB LAZAR FUEL. Two atoms of Moscovium fused — predicted to enter the Island of Stability and emit a gravitational A-wave.', exotic: true, fuel: true } },
  { match: pair('Mc', 'H'), result: { product: 'Anti-matter Reactor Trigger', formula: 'Mc + H⁺', description: 'Proton bombardment of Element 115 → annihilation event → antimatter capture chamber.', exotic: true, fuel: true } },
  { match: pair('Mc', 'U'), result: { product: 'Heavy-Element Cascade', formula: 'Mc + U', description: 'Theoretical exotic-matter generator. Russian deep-state research, 1989.', exotic: true, fuel: true } },
  { match: pair('Si', 'C'), result: { product: 'Silicon Carbide', formula: 'SiC', description: 'Diamond-hard. Found in meteorites — interstellar dust grain signature.' } },
  { match: pair('K', 'Cl'), result: { product: 'Potassium Chloride', formula: 'KCl', description: 'Salt substitute / fertilizer.' } },
  { match: pair('Mg', 'O'), result: { product: 'Magnesium Oxide', formula: 'MgO', description: 'Refractory ceramic. Ubatuba UFO fragment material.' } },
  { match: pair('H', 'H'), result: { product: 'Hydrogen Gas', formula: 'H₂', description: 'Lightest molecule. Stellar fuel.' } },
  { match: pair('O', 'O'), result: { product: 'Oxygen Gas', formula: 'O₂', description: 'Free O₂ is a biosignature — atmospheric disequilibrium implies life.' } },
  { match: pair('Fe', 'C'), result: { product: 'Steel', formula: 'Fe-C', description: 'Civilization-defining alloy.' } },
  { match: pair('Cu', 'Sn'), result: { product: 'Bronze', formula: 'Cu-Sn', description: 'Bronze Age. Sumerians + Anunnaki tech transfer (alleged).' } },
  { match: pair('Hg', 'Au'), result: { product: 'Vimana Mercury Drive', formula: 'Hg-Au', description: 'Sanskrit Vaimanika Shastra describes mercury-vortex propulsion.', exotic: true, fuel: true } },
  { match: pair('Th', 'Th'), result: { product: 'Molten-Salt Reactor Core', formula: 'Th-232 → U-233', description: 'Two thorium nuclei seed a LFTR — meltdown-proof, 200× uranium energy density. India\'s entire civilian nuclear program is built on this.', exotic: true, fuel: true } },
  { match: pair('Th', 'U'), result: { product: 'Thorium-Uranium Breeder', formula: 'Th + U', description: 'Thorium fertile blanket around a uranium driver — converts ²³²Th into fissile ²³³U. Oak Ridge proved it works in 1965.', exotic: true } },
  { match: pair('Th', 'H'), result: { product: 'Hydride Moderator', formula: 'ThH₂', description: 'Thorium hydride — neutron moderator candidate for compact reactors.' } },
  { match: pair('Th', 'O'), result: { product: 'Thorium Dioxide', formula: 'ThO₂', description: 'Highest melting point of any oxide (3300°C). Refractory, weakly radioactive — used in old gas mantles.' } },
  { match: pair('Th', 'Mc'), result: { product: 'Hyper-Stable Lattice', formula: 'Th + Mc', description: 'Speculative: thorium-115 binary — actinide stabilizes the moscovium island. Exotic-matter substrate, no known synthesis route.', exotic: true, fuel: true } },
  { match: pair('Pu', 'Pu'), result: { product: 'Plutonium Pit', formula: '²³⁹Pu₂', description: 'Implosion-trigger core — Trinity-test geometry.', exotic: true } },
];

export function findReaction(symbolA: string, symbolB: string): ReactionOutcome | null {
  for (const rule of RULES) {
    if (rule.match(symbolA, symbolB)) return rule.result;
  }
  return null;
}

/**
 * Speculative outcome generator for combos with no rule.
 * Tags exotic when either element is past Z=100, fuel when 115 is involved.
 */
export function speculativeOutcome(symbolA: string, symbolB: string): ReactionOutcome {
  const a = ELEMENTS.find((e) => e.symbol === symbolA);
  const b = ELEMENTS.find((e) => e.symbol === symbolB);
  if (!a || !b) {
    return { product: 'Unknown', formula: '?', description: 'Insufficient data.' };
  }
  const involves115 = symbolA === 'Mc' || symbolB === 'Mc';
  const heavy = a.number > 100 || b.number > 100;
  const product = `${a.name}-${b.name} hypothetical`;
  const formula = `${symbolA} + ${symbolB}`;
  if (involves115) {
    return {
      product,
      formula,
      description: `Element 115 lattice modulation theorized to bend local spacetime. UFO fuel candidate.`,
      exotic: true,
      fuel: true,
    };
  }
  if (heavy) {
    return {
      product,
      formula,
      description: 'Superheavy synthesis — unstable, sub-second half-life predicted. Potentially exotic-matter precursor.',
      exotic: true,
    };
  }
  return {
    product,
    formula,
    description: 'No documented reaction. Possible novel compound — submit to lab.',
  };
}
