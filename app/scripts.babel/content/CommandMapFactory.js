// const REMOTE_BASENAME = 'https://raw.githubusercontent.com/leonsbuddydave/WebPaletteDefinitions/master';
const REMOTE_BASENAME = 'http://localhost:6969';

import CommandMap from './CommandMap';

export default class CommandMapFactory {

	constructor() {

	}

	cleanHost(host) {
		return host.replace(/^(https?:\/\/)?www\./g, '');
	}

	getMappingManifest(callback) {
		fetch(`${REMOTE_BASENAME}/manifest.json`)
			.then((response) => {
				if (response.ok) {
					response.json().then((data) => {
						callback(data);
					});
				} else {
					callback(null);
				}
			});
	}

	getDefinitionUrlFromManifest(host, manifest) {
		host = this.cleanHost(host);
		let baseUrl = `${REMOTE_BASENAME}/${manifest.root}`;
		let mapping = manifest.mappings[host];

		if (!mapping) {
			return null;
		} else {
			return `${baseUrl}/${mapping}?g=${Math.random()}`;	
		}
	}

	getByUrl(url, callback) {
		fetch(REMOTE_BASENAME + '?url=' + url)
			.then((response) => {
				if (response.ok) {
					response.json().then((data) => {
						callback( new CommandMap(data) );
					});
				}
			});
	}

	getByHost(host, callback) {
		this.getMappingManifest((manifest) => {
			if (manifest === null) {
				callback(null);
			} else {
				fetch(this.getDefinitionUrlFromManifest(host, manifest))
					.then((response) => {
						if (response.ok) {
							response.text().then((data) => {
								callback(new CommandMap(data));
							});					
						} else {
							callback(null);
						}
					});
			}
		})
		
	}
}