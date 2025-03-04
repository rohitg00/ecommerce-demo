import type { SlotRegistry } from '@bitdev/harmony.harmony';

export interface MenuItem {
  /**
   * name of the item
   */
  name: string;
  
  /**
   * URL for the menu item
   */
  url: string;
  
  /**
   * Icon for the menu item (optional)
   */
  icon?: string;
  
  /**
   * Order/position of the menu item
   */
  order?: number;
}

export type MenuItemSlot = SlotRegistry<MenuItem[]>;
