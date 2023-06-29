const nodeExternals = require('webpack-node-externals');

module.exports = {
	mode: "development",
	watch: true,
	entry: "./src/index.ts",
	target: "node",
	externals: [nodeExternals()],
	watch: false,
	output: {
		filename: "server.js",
		path: __dirname + "/dist/dev"
	},
	resolve: {
		extensions: [".ts", ".js", ".json", ".svg"],
		alias: {
			'@helpers': path.resolve(__dirname, 'src', 'helpers'),
			'@root': path.resolve(__dirname, 'src'),
			"@config": path.resolve(__dirname, 'src', 'config'),
			"@api": path.resolve(__dirname, 'src', 'api'),
			"@middlewares": path.resolve(__dirname, 'src', 'middlewares'),
			"@utils": path.resolve(__dirname, 'src', 'utils'),
			"@interfaces": path.resolve(__dirname, 'src', 'interfaces')
		}
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
