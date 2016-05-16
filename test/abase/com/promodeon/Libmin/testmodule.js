(function(Lib)
{
	/**
	 * Test module
	 *
	 */
	 
	 var module_info = 
	 {	 	 
		VERSION : '1.0.0.0'
		,AUTHOR : 'R.Bund'
	 },
	,dependencies = []
	,namespace = 'com.promodeon.Libmin'
	,name = 'testmodule'
	;
	
	function module()
	{
		
	};


	function finishModule(success)
	{
		if (success)
		{
			// initialize your module
			// register any additional info after initialization
		}
		else
		{
			// remove whatever needed from namespace
			// throw new Error(name+': failed to load dependcies.');
		}
	};
	
	function registerModule(module)
	{
		Lib.set(namespace, name, module);
		for (var key in module_info)
			Lib.set(namespace, key, module_info[key]);
		if (dependencies.length) Lib.needs(dependencies, finishModule);
	};

	if (Lib)
	{
		registerModule(module);
	}

})(Libmin);




