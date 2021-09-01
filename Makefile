#
default: lambda.zip

lambda.zip: index.js package.json yarn.lock Makefile
	zip -r $@ . -x "*.git*" -x "*.idea*"
