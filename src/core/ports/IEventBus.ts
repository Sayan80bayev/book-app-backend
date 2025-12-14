export interface IEventBus {
  publish(event: string, payload: any): void;
}