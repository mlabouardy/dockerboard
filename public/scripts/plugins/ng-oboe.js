(function (window, module, ng, undefined) {
	module.provider('oboe', function () {
			var defaults = {
				url: '',
				method: 'GET',
				headers: {},
				body: null,
				cached: false,
				withCredentials: false
			};

			var ngOboe = function ($rootScope) {
				function oboeWrapper(params) {
					var stream = oboe(params);
					var singleArgMethods = ['start', 'done', 'fail'];
					var on = function (event, pattern, callback) {
						var wrappedCallback = function () {
							var args = arguments;

							return $rootScope.$evalAsync(function () {
								return callback.apply(stream, args);
							});
						};

						return singleArgMethods.indexOf(event) >= 0 ? stream.on(event, wrappedCallback)
							: stream.on(event, pattern, wrappedCallback);
					};

					return {
						start: function (callback) {
							return on('start', null, callback);
						},
						node: function (pattern, callback) {
							return on('node', pattern, callback);
						},
						path: function (pattern, callback) {
							return on('path', pattern, callback);
						},
						success: function (callback) {
							return on('done', null, callback);
						},
						done: function (callback) {
							return on('done', null, callback);
						},
						error: function (callback) {
							return on('fail', null, callback);
						},
						fail: function (callback) {
							return on('fail', null, callback);
						},
					};
				}

				var request = function (url, data, config, method) {
					var params = config || defaults; // TODO: Merge these two.
					params.method = method;
					params.body = data;
					params.url = url;

					return oboeWrapper(params);
				};

				return {
					get: function (url, config) {
						return request(url, null, config, 'GET');
					},
					post: function (url, data, config) {
						return request(url, data, config, 'POST');
					},
					put: function (url, data, config) {
						return request(url, data, config, 'PUT');
					},
					patch: function (url, data, config) {
						return request(url, data, config, 'PATCH');
					},
					"delete": function (url, config) {
						return request(url, null, config, 'DELETE');
					}
				};
			};

			this.defaults = defaults;
			ngOboe.$inject = ['$rootScope'];
			this.$get = ngOboe;
		});
})(window, angular.module('ng-oboe', []), angular);
