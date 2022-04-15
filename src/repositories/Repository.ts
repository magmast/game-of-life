export default interface Repository<T> {
  get(): T;
  set(value: T): void;
}
