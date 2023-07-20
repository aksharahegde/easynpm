import { derived, writable, type Writable } from 'svelte/store';

class BagStore {
	constructor(public bag: Writable<any[]> = writable([])) {}

	add(item: any) {
		this.bag.update((items) => {
			items.push(item);
			return items;
		});
	}

	get bagData() {
		return derived([this.bag], ([item]) => {
			return this.bag.update((items) => {
				items.push(item);
				return items;
			});
		});
	}
}

export const bagStore = new BagStore();
