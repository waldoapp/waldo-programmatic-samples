import { RemoteCapability } from '@wdio/types/build/Capabilities';
import { AppiumElement } from '../utils/utils.ts';

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
  ): Promise<AppiumElement>;
  tapCenterOfBox(box: any): Promise<void>;
  getNodes(predicate: (n: any) => boolean): Promise<any[]>;
  swipeScreen(
    direction: 'vertical' | 'horizontal',
    fromScreenPercent: number,
    toScreenPercent: number,
  ): Promise<void>;
  screenshot(path: string): Promise<void>;
  log(
    message: string,
    payload?: Record<string, string | boolean | number>,
    level?: 'debug' | 'info' | 'warn' | 'error',
  ): Promise<void>;
};
