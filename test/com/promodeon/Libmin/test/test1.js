(function()
{
	var name = 'test1';
	Libmin.needs('com.promodeon.Libmin.test.test1', function(r) { RESULTSET[name] = Array.prototype.slice.call(arguments,0); } );
})();
//alert('test1');