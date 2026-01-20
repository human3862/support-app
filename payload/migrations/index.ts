import * as migration_20260111_024516 from './20260111_024516';
import * as migration_20260111_024624 from './20260111_024624';
import * as migration_20260111_081958 from './20260111_081958';
import * as migration_20260116_014009_add_pricing_block from './20260116_014009_add_pricing_block';
import * as migration_20260116_114222 from './20260116_114222';

export const migrations = [
  {
    up: migration_20260111_024516.up,
    down: migration_20260111_024516.down,
    name: '20260111_024516',
  },
  {
    up: migration_20260111_024624.up,
    down: migration_20260111_024624.down,
    name: '20260111_024624',
  },
  {
    up: migration_20260111_081958.up,
    down: migration_20260111_081958.down,
    name: '20260111_081958',
  },
  {
    up: migration_20260116_014009_add_pricing_block.up,
    down: migration_20260116_014009_add_pricing_block.down,
    name: '20260116_014009_add_pricing_block',
  },
  {
    up: migration_20260116_114222.up,
    down: migration_20260116_114222.down,
    name: '20260116_114222'
  },
];
