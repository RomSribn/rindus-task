const nodeExternals = require('webpack-node-externals');

module.exports = {
	mode: "development",
	watch: true,
	entry: "./src/app.ts",
	target: "node",
	externals: [nodeExternals()],
	watch: false,
	output: {
		filename: "server.js",
		path: __dirname + "/dist/dev"
	},
	resolve: {
		extensions: [".ts", ".js", ".json", ".svg"],
	},
	devtool: "source-map",
	module: {
		rules: [
			{ test: /\.ts?$/, loader: "babel-loader" },
			{ test: /\.ts?$/, loader: "ts-loader" },
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
		]
	}
};
