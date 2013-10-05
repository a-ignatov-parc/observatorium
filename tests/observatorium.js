test('check for Observatorium constructor', function() {
	equal(typeof(window.Observatorium), 'function', 'Observatorium is not constructor');
});

test('init instance of Marrow.Observatorium', function() {
	var observatorium = new window.Observatorium();

	notEqual(observatorium, null, 'observatorium variable is null');
	equal(observatorium instanceof window.Observatorium, true, 'observatorium variable is not instance of window.Observatorium');
	equal(typeof(observatorium.on), 'function', 'observatorium.on is not function');
	equal(typeof(observatorium.off), 'function', 'observatorium.off is not function');
	equal(typeof(observatorium.trigger), 'function', 'observatorium.trigger is not function');
	equal(typeof(observatorium.mute), 'function', 'observatorium.mute is not function');
	equal(typeof(observatorium.unmute), 'function', 'observatorium.unmute is not function');
});

asyncTest('bind one event and trigger it', 1, function() {
	var observatorium = new window.Observatorium();

	observatorium.on('test', function() {
		ok(true, 'handler has been triggered');
	});

	start();
	observatorium.trigger('test');
});

asyncTest('bind two events with same name', 2, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test', function() {
			ok(true, 'handler has been triggered');
		})
		.on('test', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium.trigger('test');
});

asyncTest('bind two events with same name and differend namespace in one action', 2, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test.a1 test.a2', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium.trigger('test');
});

asyncTest('bind two events with same name and differend namespace in one action', 2, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test.a1 test', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium.trigger('test');
});

asyncTest('bind two events with same name and differend namespace in one action', 1, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test.a1 test', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium.trigger('.a1');
});

asyncTest('bind two events with same name and differend namespace in one action', 3, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test.a1 test.a2 test', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium.trigger('test');
});

asyncTest('bind two events with name "test.a1" and "test.a2" then trigger "test.a2" and ".a2"', 2, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test.a1', function() {
			ok(true, 'handler has been triggered');
		})
		.on('test.a2', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium.trigger('test.a2');
	observatorium.trigger('.a2');
});

asyncTest('bind two events with name ".a1" and "test.a1" then trigger "test" and ".a1"', 3, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('.a1', function() {
			ok(true, 'handler has been triggered');
		})
		.on('test.a1', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium.trigger('test');
	observatorium.trigger('.a1');
});

asyncTest('bind two events with name "test" then trigger "test"', 2, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test', function() {
			ok(true, 'handler has been triggered');
		})
		.on('test', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium.trigger('test');
});

asyncTest('bind two events with name "test.a1" and "test.a2" then trigger "test" then unbind ".a2" and again trigger "test"', 3, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test.a1', function() {
			ok(true, 'handler has been triggered');
		})
		.on('test.a2', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium
		.trigger('test')
		.off('.a2')
		.trigger('test');
});

asyncTest('bind two events with name "test.a1" and "test.a2" then trigger "test" then mute ".a2" then trigger "test" then unmute ".a2" and finaly trigger "test"', 5, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test.a1', function() {
			ok(true, 'handler has been triggered');
		})
		.on('test.a2', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium
		.trigger('test')
		.mute('.a2')
		.trigger('test')
		.unmute('.a2')
		.trigger('test');
});

asyncTest('bind two events with name "test.a1" and "test.a2" then mute ".a2" then bind "test.a2" and trigger "test"', 1, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test.a1', function() {
			ok(true, 'handler has been triggered');
		})
		.on('test.a2', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium
		.mute('.a2')
		.on('test.a2', function() {
			ok(true, 'handler has been triggered');
		})
		.trigger('test');
});

asyncTest('bind two events with name "test.a1" then mute "test.a1" and trigger "test"', 0, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test.a1', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium
		.mute('test.a1')
		.trigger('test');
});

asyncTest('bind two events with name "test.a1" and "test.a2" then unbind "test.a1" trigger "test"', 1, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test.a1', function() {
			ok(true, 'handler has been triggered');
		})
		.on('test.a2', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium
		.off('test.a1')
		.trigger('test');
});

asyncTest('bind two events with name "test.a1" and "test.a2" then unbind ".a1" trigger "test"', 1, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test.a1', function() {
			ok(true, 'handler has been triggered');
		})
		.on('test.a2', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium
		.off('.a1')
		.trigger('test');
});

asyncTest('bind two events with name "test.a1" and "test.a2" then unbind "test" trigger "test"', 0, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test.a1', function() {
			ok(true, 'handler has been triggered');
		})
		.on('test.a2', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium
		.off('test')
		.trigger('test');
});

asyncTest('bind two events with name "test.a1" and "test.a2" then unbind "test" trigger "test"', 3, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test.a1', function() {
			ok(true, 'handler has been triggered');
		})
		.on('test.a2', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium
		.off('.a1')
		.trigger('test')
		.on('test.a1', function() {
			ok(true, 'handler has been triggered');
		})
		.trigger('test');
});

asyncTest('bind "test" event then mute "test" trigger "test" bind "test" event, trigger test, unmute "test", trigger "test"', 2, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium
		.mute('test')
		.trigger('test')
		.on('test', function() {
			ok(true, 'handler has been triggered');
		})
		.trigger('test')
		.unmute('test')
		.trigger('test');
});

asyncTest('bind two events with name "test.a1" and "test.a2" then unbind "test" trigger "test"', 2, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('ss:ss.test1', function() {
			ok(true, 'handler has been triggered');
		})
		.on('ss:ss.test2', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium
		.off('zz:zz.test2')
		.trigger('ss:ss');
});

asyncTest('bind two events with name "test.a1" and "test.a2" then unbind "test" trigger "test"', 1, function() {
	var observatorium = new window.Observatorium(),
		handler = function() {
			ok(true, 'handler has been triggered');
		};

	observatorium.on('test', handler);

	start();
	observatorium
		.trigger('test')
		.off('test', handler)
		.trigger('test');
});

asyncTest('bind two events with name "test.a1" and "test.a2" then unbind "test" trigger "test"', 2, function() {
	var observatorium = new window.Observatorium();

	observatorium
		.on('test', function() {
			ok(true, 'handler has been triggered');
		});

	start();
	observatorium
		.trigger('test')
		.off('test', function() {})
		.trigger('test');
});

asyncTest('bind two events with name "test.a1" and "test.a2" then unbind "test" trigger "test"', 2, function() {
	var observatorium = new window.Observatorium(),
		handler = function() {
			ok(true, 'handler has been triggered');
		};

	observatorium
		.on('test', handler, {
			a: 1
		});

	start();
	observatorium
		.trigger('test')
		.off('test', handler, {})
		.trigger('test');
});

asyncTest('bind two events with name "test.a1" and "test.a2" then unbind "test" trigger "test"', 1, function() {
	var observatorium = new window.Observatorium(),
		handler = function() {
			ok(true, 'handler has been triggered');
		},
		context = {
			a: 1
		};

	observatorium.on('test', handler, context);

	start();
	observatorium
		.trigger('test')
		.off('test', handler, context)
		.trigger('test');
});

test('bind two events with name "test.a1" and "test.a2" then unbind "test" trigger "test"', function() {
	var observatorium = new window.Observatorium();

	observatorium.on('test', function() {
		equal(this.a, 1, 'context is ok');
	}, {
		a: 1
	});

	observatorium.trigger('test');
});

test('Context works normaly between to instances of one class', function() {
	var observatorium = new window.Observatorium(),
		TestClass = function() {
			var count = this.count,
				cid;

			this.cid = cid = 'c' + count;
			this.constructor.prototype.count++

			this.init = function() {
				observatorium.on('test.' + this.cid, this.handler, this);
			};

			this.destroy = function() {
				observatorium.off('.' + this.cid);
			};

			this.init();
		};

	TestClass.prototype = {
		constructor: TestClass,
		handler: function() {
			equal(this.cid, 'c0', 'context is ok');
		},
		count: 0
	};

	var a = new TestClass(),
		b = new TestClass();

	b.destroy();
	b = null;

	observatorium.trigger('test');
});

test('Testing passing arguments in trigger method', function() {
	var observatorium = new window.Observatorium(),
		args = [1, 2];

	observatorium
		.on('test1', function(eventName, arg) {
			equal(eventName, 'test1', 'Event name is ok');
			equal(arg, 1, 'First argument is ok');
		})
		.on('test2', function(eventName, arg1, arg2) {
			equal(eventName, 'test2', 'Event name is ok');
			equal(arg1, args[0], 'First argument is ok');
			equal(arg2, args[1], 'Second argument is ok');
		});

	observatorium
		.trigger('test1', 1)
		.trigger('test2', args);
});
