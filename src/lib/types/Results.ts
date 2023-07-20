interface Package {
	name: string;
	version: string;
	description: string;
	keywords: string[];
	date: string;
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

interface Detail {
	quality: number;
	popularity: number;
	maintenance: number;
}

interface Score {
	final: number;
	detail: Detail;
}

interface SearchResult {
	objects: {
		package: Package;
		score: Score;
		searchScore: number;
	}[];
	total: number;
	time: string;
}

interface Payload {
	keyword: string;
	quality: number;
	popularity: number;
	maintenance: number;
}
