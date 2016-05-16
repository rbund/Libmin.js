# Libmin.js

a simple module and namespace management solution for javascript.

## Features

* Asynchronous loading of javascript modules
* Namespaces, similar to java namespaces
* Plain javascript, no dependencies
* Configurable
* Small and simple (somehow), 4K minified (not gziped!)

---

# Contents

- [Introduction](#introduction)
- [Quick reference](#quick-reference)
- [How to use](#how-to-use)  
	- [Managing namespaces](#managing-namespaces)
    	- [Storing something in a namespace](#storing-something-in-a-namespace)
        - [Retrieving something from a namespace](#retrieving-something-from-a-namespace)
	- [Asynchronous module loading](#asynchronous-module-loading)
- [FAQ](#FAQ)

---

## Introduction
__Libmin.js__ is a small and simple solution for handling javascript module dependencies and for managing namespaces. It isn't ment for replacing build tools or to compete with the mighty and complex [Require.js](requirejs.org) module loader.

It aims to help you managing your code, create reusable modules and enables you to create web solutions "on the fly". The motto behind __Libmin.js__ is (even when it sounds odd): __*keep it simple and without dependencies!*__

Did you ever want to use a specific library and wondered what else you have to install to use it? 

Did you ever searched for a library offering some functionality but wondered how complex it is f
 

Ever thought of using a specific library and wondered what else must be installed?
Ever tried a library to solve a minor issue but dropped it due to the complexity?

Now the good news: this shouldn't ever happen with __Libmin__!

---

## Quick reference

- include __Libmin__ in your page:

		<script src="Libmin.js"></script>
        
- declare dependencies:

		Libmin.needs(["mymodule_1", "mymodule_2", "mymodule_n"], callThisWhenLoaded);

- callback "callThisWhenLoaded" definition:

		callThisWhenLoaded(/*boolean*/ success, /*string*/ failed_module);

*(note: failed_module is only given when success is *`false`*)*

- set a namespace variable:

		Libmin.set("namespace", "key", value);

- get a namespace variable:

		var value = Libmin.get("namespace", "key");

for further details, read on! ;)

---

## How to use

At first include *Libmin.js* within your html like any other normal javascript, at best within the header:

```html
<script src="Libmin.js"></script>
```

Once done, the __Libmin__ object (and only that one) is globally available. You now may use it
to define javascript dependencies and to organize namespaces.

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
Alternatively you may call `set()` as followed:

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

---

## FAQ

##### When is a needed module seen as successfully loaded?
There are several states a module can have. At first it gets the state "*loading*" until it's loaded. Once it's loaded, it is automatically executed by the browser. It might happen that the module itself has some dependencies and is calling `Libmin.needs()` itself. This is detected by __Libmin__ and as long as the modules dependencies aren't satisfied, it goes into the state "*initializing*". When the modules dependencies are successfully loaded (and initialized) or when there aren't any, the module gets to the state "*loaded*". A module is only reported as succesfully loaded, when it is in the state "*loaded*". When a dependency fails, the according module is marked with the state "*error*". When all dependencies are within the state "*loaded*" the function given to  `Libmin.needs()` is called. It is also instantly triggered when a dependency fails.

##### How are the needed modules loaded?
__Libmin__ appends the html body with a separate script tag to load the module you asked for.

##### What happens when a module includes itself (A needs A)?
This is detected and handled by __Libmin__ automatically.

##### What happends on cascading references between several modules (A needs B needs C)?
This works well and __Libmin__ was built for such cases.

##### What happens on cross references between several modules (A needs B needs C needs A)?
This isn't detected by __Libmin__ and you must take care for it yourself. At the end none of the modules are loaded successfully and the dependencies will never be solved.

##### May I call `Libmin.needs()` twice or several times (e.g. within a module)?
Even though unnecessary it's save to do so.

##### Is it possible to use Libmin with web workers?
Unfortunately not yet, since web workers don't have access to `window.document`.

