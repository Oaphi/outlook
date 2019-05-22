//Emulate OAuth2 object (instead of library call);
class e_OAuth2 {
	constructor() {
		this.service;
	}
}

/**
 * Create OAuth2 service object;
 * @param {String} name service name to set;
 * @returns {Object}
 */
e_OAuth2.prototype.createService = function (name) {
	//initiate Service;
	this.service = new Service(name);
	
	//return Service;
	return this.service;
}

//emulate service object creation;
class Service {
	constructor(name) {
		this.params = {
			providerID : name,
			redirect_uri : 'https://cardinsoft.github.io/outlook/OAuth2-result.html'
		};
	}
	build() {
		const service = {};
		return service;
	}
}
//add new methods to the class - FOR NOW WITH NO OPTIONAL PARAMETERS;
Service.prototype.getAuthorizationUrl = function(parameters) {
	//initiate JSO with set parameters;
	const service = this.build();
	
	service.setLoader(jso.Popup);
	
	let params = this.params;

	let base = params.authorization+'?';
	
	let query = [];
	
	for(let key in params) {
		if(key!=='scope') {
			query.push(key+'='+params[key]);
		}
	}
	
	query = query.join('&');
	
	console.log(base+query);
	
	return base+query;
};

Service.prototype.setAuthorizationBaseUrl = function(urlAuth) {
	//access parameters;
	let params = this.params;	
	params.authorization = urlAuth;
	return this;
};

Service.prototype.setRedirectUri = function(redirectUri) {
	//access parameters;
	let params = this.params;
	params.redirect_uri = redirectUri;
	return this;
};

Service.prototype.setTokenUrl = function(urlToken) {
	//access parameters;
	let params = this.params;
	params.token = urlToken;
	return this;
};  
 
Service.prototype.setClientId = function(clientId) {
	//access parameters;
	let params = this.params;
	params.client_id = clientId;
	return this;
};

Service.prototype.setClientSecret = function(secret) {
	//access parameters;
	let params = this.params;
	params.client_secret = secret;
	return this;
};

Service.prototype.setScope = function(scope) {
	//access parameters;
	let params = this.params;
	params.scopes = {};
	
	//access scopes;
	let scopes = params.scopes;
	scopes.request = [];
	scopes.require = [];
	
	//access request & require;
	let request = scopes.request;
	let require = scopes.require;
	
	//add scope to scopes list;
	request.push(scope);
	require.push(scope);
	
	return this;
};
Service.prototype.setCallbackFunction = function(callback) {
	
};

Service.prototype.setParam = function(key,value) {
	//access parameters;
	let params = this.params;
	params[key] = value;
	return this;
};

Service.prototype.setPropertyStore = function(userStore) {
	this
};

Service.prototype.setCache = function(userCache) {};

Service.prototype.setLock = function(userLock) {};

Service.prototype.hasAccess = function() {
	//initiate JSO with set parameters;
	const service = this.build();
	
	//await for token;
	const hasToken = service.checkToken();
	
	console.log(hasToken);
	
	return false;

	
	//if(token!==null) { return true; }else { return false; }
};
Service.prototype.getAccessToken = async function() {
	//initiate JSO with set parameters;
	const service = this.build();
	
	service.setLoader(jso.IFramePassive);
	
	const captured = null;
	
	//obtain token;
	service.getToken()
	.then(function(token){
		captured = token;
		console.log(token);
	})
	.catch(function(error){
		console.log(error);
	})
	
	console.log(captured);
	
	return captured;
}
Service.prototype.reset = async function() {
	//initiate JSO with set parameters;
	const service = this.build();	
	
	await service.wipeTokens();
};

const OAuth2 = new e_OAuth2();