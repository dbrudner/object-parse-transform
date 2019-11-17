const path = require("path");

const entry = __dirname + "\\dev\\index.js";
const objectParseTransformer = require("./src/lib");

module.exports = {
	entry,
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		publicPath: "./"
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						// presets: ["@babel/preset-env"]
						plugins: [objectParseTransformer]
					}
				}
			}
		]
	},
	node: {
		fs: "empty"
	}
};
