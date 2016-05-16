(function()
{
	var name = 'test2b';
	
	if (CTestcase.current().status === CTestcase.prototype.STATUS.RUNNING)
	{
		Libmin.needs('com.promodeon.Libmin.test.test2a', function(r,e) { CTestcase.current().setUserData(name, Array.prototype.slice.call(arguments,0)); } );
	}
})();
