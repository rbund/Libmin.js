(function()
{
	var name = 'test2a';
	if (CTestcase.current().status === CTestcase.prototype.STATUS.RUNNING)
	{
		Libmin.needs('com.promodeon.Libmin.test.test2b', function(r,e) { CTestcase.current().setUserData(name, Array.prototype.slice.call(arguments,0)); } );
	}
})();

