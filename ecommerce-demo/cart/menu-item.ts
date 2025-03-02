import type { SlotRegistry } from '@bitdev/harmony.harmony';

export interface MenuItem {
  /**
   * name of the item
   */
  name: string;
}

export type MenuItemSlot = SlotRegistry<MenuItem[]>;
