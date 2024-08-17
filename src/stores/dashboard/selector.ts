import {
  transform2Grid,
  transform2SlotMachnie,
  transfrom2wheel,
} from './shared';
import { Store } from './store';

export const beConfig2FeConfig = (s: Store) => {
  const { luck_wheel_config, luck_grid_config, slot_machine_config } = s;

  return {
    luck_wheel_config: transfrom2wheel(luck_wheel_config),
    luck_grid_config: transform2Grid(luck_grid_config),
    slot_machine_config: transform2SlotMachnie(slot_machine_config),
  };
};
