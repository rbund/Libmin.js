(function()
{
	var name = 'test3c';
	if (CTestcase.current().status === CTestcase.prototype.STATUS.RUNNING)
	{
		Libmin.needs(['com.promodeon.Libmin.test.test3b'], function(r,e) { CTestcase.current().setUserData(name, Array.prototype.slice.call(arguments,0)); } );
	}
})();

