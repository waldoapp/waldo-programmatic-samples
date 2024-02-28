import { RemoteCapability } from '@wdio/types/build/Capabilities';

export type BoundingBox = { width: number; height: number; top: number; left: number };

export type WaldoDriver = WebdriverIO.Browser & {
  capabilities: RemoteCapability & { replayUrl: string };
  resetApp(): Promise<void>;
  tapElement(
    property: string,
    value: any,
    timeout?: number,
    delay?: number,
    waitForStability?: boolean,
  ): Promise<void>;
  tapElementWith(
    predicate: (n: any) => boolean,
    position?: number | 'first' | 'last',
    retries?: number,
    delay?: number,
  ): Promise<void>;
  typeInElement(
    property: string,
    value: any,
    text: string,
    timeout?: number,
    delay?: number,
    waitForStability?: boolean,
  ): Promise<void>;
  tap(x: number, y: number): Promise<void>;
  waitForElement(
    property: string,
    value: any,
    timeout?: number,
    delay?: number,
    waitForStability?: boolean,
  ): Promise<void>;
  tapCenterOfBox(box: any): Promise<void>;
  getNodes(predicate: (n: any) => boolean): Promise<any[]>;
  swipeScreen(
    direction: 'vertical' | 'horizontal',
    fromScreenPercent: number,
    toScreenPercent: number,
  ): Promise<void>;
};
