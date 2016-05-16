(function()
{
	var name = 'test3a';
	if (CTestcase.current().status === CTestcase.prototype.STATUS.RUNNING)
	{
		Libmin.needs(['com.promodeon.Libmin.test.test3b', 'com.promodeon.Libmin.test.test3c'], function(r,e) { CTestcase.current().setUserData(name, Array.prototype.slice.call(arguments,0)); } );
	}
})();

