# Libmin.js
a simple namespace and module management solution for javascript.

## Features

* Asynchronous loading of javascript modules
* Namespaces, similar to java namespaces
* Plain javascript, no dependencies
* Configurable
* Small and simple, 2K minified (not gziped!)

## How to use

At first include *Libmin.js* within your html like any other normal javascript, at best within the header:

```html
<script src="Libmin.js"></script>
```

Once done, the __Libmin__ object (and only that one) is globally available. You now may use it
to organize namespaces and to define javascript dependencies which should be loaded.

### Managing namespaces

Namespaces are intentionally handled similar as in Java, resulting in partial names separated by dots.
It doesn't matter how you'd like to build the partial names, either to use the java style like
"com.mydomain.myapp.someclass" or your own style, e.g. "may.the.force.be.with.you".
You even may decide not to use partial names at all but only flat namespaces, e.g. "json" and "myapp",
it's up to you!


#### Storing something in a namespace

To set something within a namespace, call the `set()` method of __Libmin__,
e.g.

	Libmin.set("com.github.classes.myclass", aclass);

will set *myclass* within the namespace "com.github.classes" to *aclass*.
Alternatively you make call set as followed:

	Libmin.set("com.github.classes", "myclass", aclass);

This will also set *myclass* within the namespace "com.github.classes" to *aclass*.
It doesn't matter if the namespace is existent or not, when `set()`is called, non existent namespaces
will be created. By the way, you may do the following call which does the same as those above:

	Libmin.set("com","github","classes","myclass", aclass);

#### Retrieving something from a namespace

Similar to `set()` you may call `get()` to retrieve data from a namespace, e.g.

	Libmin.get("com.github.classes.myclass");

will result in whatever is stored at "com.github.classes" with the key *myclass*.
Similar to the `set()` call you can split the key and namespace parts as you like:

	Libmin.get("com.github.classes","myclass");

is just another way to perform the same.

Please note that when requesting a non existing namespace or key, `get()` will return `undefined` and 
when you're directly requesting a namespace (e.g. "com.github.classes") a namespace descriptor object 
is returned.

### Asynchronous module loading

Loading javascript modules is quite simple:

	Libmin.needs(["mymodule_1", "mymodule_2", "mymodule_n"], callThisWhenLoaded);
    
This will ask for loading *mymodule_1*, *mymodule_2*, and *mymodule_n*. When done, the function/method `callThisWhenLoaded()` shall be called.

So what exactly is *mymodule_1* or *mymodule_n* ? Obviously a string!

Now comes the tricky part: it specifies both a namespace and a module path. Yet another example:

	Libmin.needs(["com.github.classes.mymodule"], callthis);
    
Now it's more clear the first parameter is an array of namespaces. Libmin takes the string and creates a namespace accordingly: "com.github.classes.mymodule". It takes the namespace as path to the module by replacing
the dots with path separators and appending ".js" at the end. So loading of a javascript module with the name "com/github/classes/mymodule.js" is initiated. Once loaded, the function `callthis()` is called informing about loading success or failure by passing a boolean as first parameter. When you specify several modules within the array, e.g.:

	Libmin.needs(["com.github.classes.mymodule1","com.github.classes.mymodule2"], callthis);

the function `callthis()` is called either when all specified modules are loaded successfully or when an error raises.
    
The call to `Libmin.needs()` will return immediately. The result indicates what is done next. When `true` is returned, the required modules are already loaded. When the some or all modules must be loaded, `undefined` is returned. More worse when you get `false`. It indicates that one of the modules you asked for is already experienced as faulty and can not be loaded.

Regardless of the result code you may get from calling `Libmin.needs()`, the according notification function `callthis()` is called in any case.

That's it roughly! :)

## FAQ
to be filled.

