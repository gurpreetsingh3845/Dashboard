TESTS = test/node.js
REPORTER = dot
BOOSTRAP = test/support/node
MOCHA = node_modules/.bin/_mocha

standalone: node_modules components
	@./node_modules/.bin/component-build -s instance -o .
	@mv build.js instance.js

components: node_modules component.json
	@./node_modules/.bin/component-install --dev

node_modules: package.json
	@npm install

build: components
	@./node_modules/.bin/component-build --dev

test: test-node test-browser

test-node:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require $(BOOSTRAP) \
		--reporter $(REPORTER) \
		$(TESTS)

test-browser: build
	@./node_modules/karma/bin/karma start \
		--single-run --browsers PhantomJS,Chrome,Firefox

coverage:
	@./node_modules/.bin/istanbul cover $(MOCHA) $(TESTS) \
		-- --require $(BOOSTRAP)

coveralls:
	@./node_modules/.bin/istanbul cover $(MOCHA) $(TESTS) --report lcovonly -- \
		-- --require $(BOOSTRAP) \
		&& cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

.PHONY: all test coverage
