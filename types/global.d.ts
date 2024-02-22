type WaldoDriver = WebdriverIO.Browser & {
  capabilities: Record<string, string> & { replayUrl: string };
  resetApp: () => Promise<void>;
  tapElement: (
    property: string,
    value: any,
    timeout?: number,
    delay?: number,
    waitForStability?: boolean,
  ) => Promise<void>;
  tapElementWith: (
    predicate: (n: any) => boolean,
    position: number | 'first' | 'last' = 0,
    retries: number = 3,
    delay: number = 500,
  ) => Promise<void>;
  typeInElement: (
    property: string,
    value: any,
    text: string,
    timeout: number = 5000,
    delay: number = 500,
    waitForStability: boolean = false,
  ) => Promise<void>;
  tap: (x: number, y: number) => Promise<void>;
  waitForElement: (
    property: string,
    value: any,
    timeout: number = 5000,
    delay: number = 500,
    waitForStability: boolean = false,
  ) => Promise<void>;
  tapCenterOfBox: (box: BoundingBox) => Promise<void>;
  getNodes: (predicate: (n: any) => boolean) => Promise<any[]>;
  swipeScreen: (
    direction: 'vertical' | 'horizontal',
    fromScreenPercent: number,
    toScreenPercent: number,
  ) => Promise<void>;
};

declare const driver: WaldoDriver;
