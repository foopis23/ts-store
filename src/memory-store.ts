import { Store, StoreValue } from './store';

export class MemoryStore<T> implements Store<T> {
	private store: Map<string, StoreValue<T>>;
	constructor() {
		this.store = new Map();
	}

	all(): Promise<StoreValue<T>[]> {
		return Promise.resolve(Array.from(this.store.values()));
	}
	destroy(key: string): Promise<boolean> {
		return Promise.resolve(this.store.delete(key));
	}
	clear(): Promise<void> {
		return Promise.resolve(this.store.clear());
	}
	length(): Promise<number> {
		return Promise.resolve(this.store.size);
	}
	get(key: string): Promise<StoreValue<T> | undefined> {
		return Promise.resolve(this.store.get(key));
	}
	set(key: string, value: T): Promise<void> {
		const now = Date.now();
		if (this.store.has(key)) {
			const storeValue = this.store.get(key);
			if (storeValue) {
				storeValue.value = value;
				storeValue.updatedAt = now;
				this.store.set(key, storeValue);
				return Promise.resolve();
			}
		}

		const storeValue: StoreValue<T> = {
			key,
			value,
			createdAt: now,
			updatedAt: now
		};
		this.store.set(key, storeValue);

		return Promise.resolve();
	}

	touch(key: string): Promise<void> {
		const now = Date.now();
		if (this.store.has(key)) {
			const storeValue = this.store.get(key);
			if (storeValue) {
				storeValue.updatedAt = now;
				this.store.set(key, storeValue);
				return Promise.resolve();
			}
		}

		return Promise.reject(new Error('Key not found'));
	}
}
