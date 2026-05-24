export interface Package {
	name: string;
	version: string;
	description: string;
	keywords: string[];
	date: string;
	license?: string;
	sanitized_name?: string;
	links: {
		npm: string;
		homepage: string;
		repository: string;
		bugs: string;
	};
	publisher: {
		username: string;
		email: string;
	};
	maintainers: {
		username: string;
		email: string;
	}[];
}

export interface ScoreDetail {
	quality: number;
	popularity: number;
	maintenance: number;
}

export interface Score {
	final: number;
	detail: ScoreDetail;
}

export interface Downloads {
	monthly: number;
	weekly: number;
}

export interface SearchFlags {
	insecure?: number;
}

export interface SearchObject {
	package: Package;
	score: Score;
	searchScore: number;
	downloads?: Downloads;
	dependents?: string;
	updated?: string;
	flags?: SearchFlags;
}

export interface SearchResult {
	objects: SearchObject[];
	total: number;
	time: string;
}

export interface Payload {
	keyword: string;
	quality: number;
	popularity: number;
	maintenance: number;
}
