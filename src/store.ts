export interface StoreValue<T> {
	key: string;
	value: T;
	createdAt: number;
	updatedAt: number;
}

export interface Store<T> {
	all(): Promise<StoreValue<T>[]>;
	destroy(key: string): Promise<boolean>;
	clear(): Promise<void>;
	length(): Promise<number>;
	get(key: string): Promise<StoreValue<T> | undefined>;
	set(key: string, value: T): Promise<void>;
	touch(key: string): Promise<void>;
}
