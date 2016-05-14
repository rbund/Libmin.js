var Libmin = (function(lib){
	"use strict";
	
	var CLibmin = function CLibmin(lib) 
	{
		// initialization
		
		if (CLibmin.prototype.instance) return(CLibmin.prototype.instance);
		CLibmin.prototype.instance = this;
		CLibmin.prototype.defaultconfig = { LIBBASE:  '' };
		CLibmin.prototype.configkeys  = Object.keys(this.defaultconfig);
		//this.namespace = {};
		CLibmin.prototype.jobs = [];
		this.__config = {};
		
		// read user config 
		var userconfig = Array.prototype.slice.call(document.scripts).filter(function(s){return(this.filter(function(k){return(this.hasAttribute(k))},s).length > 0)}, CLibmin.prototype.configkeys).shift() || {};
		CLibmin.prototype.configkeys.forEach(function(k){ var p = 'data-'+k; this.__config[k] = userconfig[p] ? userconfig[p] : CLibmin.prototype.defaultconfig[k]; }, this);

		/**
		 * retrieves namespace data.
		 *
		 * parameters: namespace parts (will be concatenated)
		 * returns: the referenced namespace object or undefined
		 */
		this.get = function(/* String namespace, String namspace addition 1, .., String namespace addition n */) 
		{
			var args = Array.prototype.slice.call(arguments), namespace = args.join('.'), self = CLibmin.prototype.instance, 
				parts = namespace.split('.'), ns = self;
				
			while (parts.length) 
			{
				ns = ns[parts.shift()];
				if (! ns) break;
			}
			return(ns);
		};

		/**
		 * stores namespace data.
		 * will create any namespace part as an object. takes the last parameter as value and
		 * the last namespace part as key (not seen as namespace part).
		 *
		 * CAUTION: it's prone to faults when inconsistently used, e.g.
		 *
		 * Libmin.register('a.b.c.d', 1);
		 * Libmin.register('a.b.c', 2);
		 *
		 * will overwrite 'a.b.c' and thus remove 'a.b.c.d'.
		 *
		 * parameters: namespace parts (will be concatenated) and lastly a value to store
		 * returns: the referenced namespace object or undefined
		 */		
		this.set = function(/* String namespace, String namspace addition 1, .., String namespace addition n, value */)
		{
			var self = CLibmin.prototype.instance, args = Array.prototype.slice.call(arguments), 
				value = args.pop(), namespace = args.join('.'), parts = namespace.split('.'), 
				key = parts.pop(), ns = self;
				
			if (arguments.length < 2) return;
			while (parts.length)
			{
				if (! ns[parts[0]]) ns[parts[0]] = {};
				ns = ns[parts.shift()];
			}
			ns[key] = value;
			return(ns);
		}
		
		// script onerror handler
		this.__onScriptError = function(/* Event */ ev, /* boolean */success)
		{
			var namespace = this['data-namespace'], self = CLibmin.prototype.instance, 
				jobs = CLibmin.prototype.jobs, i = 0;
				
			document.body.removeChild(this);
			self.set(namespace, '__status', success ? 'loaded' : 'error');
			
			while (i < jobs.length)
			{
				var j = jobs[i].mods.indexOf(namespace);
				if (j >= 0)
				{
					if (success) jobs[i].mods.splice(j,1);
					else jobs[i].mods = [];
					jobs[i].onload(success);
					if (jobs[i].mods.length == 0) jobs.splice(i,1);
					else i++;
				}
				else i++;
			}
		};
		// script onload handler
		this.__onScriptLoaded = function(/* Event */ ev)
		{
			var self = CLibmin.prototype.instance;
			self.__onScriptError.call(this, ev, true);
		};
		
		/**
		 * initiates dependency loading.
		 * 
		 * parameters: an array of strings with namespaces or a single string with a namespace,
		 *				a function to be called on loading success or error.
		 * returns: true when all dependencies already available, 
		 *			false when one dependency was already erroneous,
		 *			undefined when dependencies must be loaded.
		 */
		this.needs = function(/* Array of Strings or String */ namespace, /* function( / * boolean * / success) or undefined */ onloaded)
		{
			var self = CLibmin.prototype.instance, mods = (Array.isArray(namespace) ? namespace.slice(0) : [namespace]), list = [];			
			while (mods.length)
			{
				var mod = mods.pop();
				switch (self.get(mod, '__status'))
				{
					case 'loaded': if (onloaded) onloaded(true); break;
					case 'error': if (onloaded) onloaded(false); return(false);
					case 'loading':
					default: list.push(mod);
				}
			}
			if (list.length)
			{
				if (onloaded)
				{
					CLibmin.prototype.jobs.push({ mods: list.slice(0), onload: onloaded });
				}
				while (list.length)
				{
					var mod = list.pop();
					self.set(mod, '__status', 'loading');
					var sc = document.createElement('script');
					sc.setAttribute('async',true);
					sc.src = self.__config.LIBBASE + mod.replace('.','/') + '.js';
					sc.onload = self.__onScriptLoaded;
					sc.onerror = self.__onScriptError;
					sc['data-namespace'] = mod;
					document.body.appendChild(sc);
				}
			}
			else return(true);
		}
	}
	
	// installation
	return(new CLibmin(lib));
	
})(Libmin);

