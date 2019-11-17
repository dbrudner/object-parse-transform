const babel = require("@babel/core");
const babylon = require("babylon");

function objectParseTransformer(babel) {
	return {
		visitor: {
			ObjectExpression(path) {
				const stringifiedObject = path.node.properties.reduce(
					(acc, prop, i) => {
						return `${acc}"${prop.key.name}": "${
							prop.value.value
						}"${i === path.node.properties.length - 1 ? "" : ","}`;
					},
					""
				);

				const newNode = babylon.parseExpression(
					`JSON.parse({${stringifiedObject}})`
				);

				// This is an infinite loop that needs to be fixed
				// https://github.com/babel/babel/issues/9413
				path.replaceWith(newNode);
			}
		}
	};
}

module.exports = babel.createConfigItem(objectParseTransformer);
