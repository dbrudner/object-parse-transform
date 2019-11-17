const generate = require("@babel/generator");
const babel = require("@babel/core");
const util = require("util");
const babylon = require("babylon");

// function convertValueToValidJson(value) {
// 	switch (typeof value) {
// 		case "string": {
// 			return `"${value}"`
// 		}
// 	}
// }

function objectParseTransformer(x) {
	// console.log({ x: util.inspect(x) });
	// const { parse } = x;
	// console.log(x);
	return {
		visitor: {
			ObjectExpression(path) {
				// console.log(path.node);

				let stringifiedObject = path.node.properties.reduce(
					(acc, prop, i) => {
						// const isStringLiteral = t.isStringLiteral(prop.value);
						// const value = "blah blah blah";
						// const x = `${acc}"${prop.key.name}": "${value}"`;
						return `${acc}"${prop.key.name}": "${
							prop.value.value
						}"${i === path.node.properties.length - 1 ? "" : ","}`;
					},
					""
				);

				const newNode = babylon.parseExpression(
					`JSON.parse({${stringifiedObject}})`
				);

				path.replaceWith(newNode);

				// path.node = newNode;

				// path.node.properties.forEach(prop => {
				// 	const code = `JSON.parse({"${prop.key.name}": "${prop.value.value}"})`;
				// });
				// console.log({ code: babylon.parseExpression(code) });

				// let stringifiedObject = path.node.properties.reduce(
				// 	(acc, prop, i) => {
				// 		// const isStringLiteral = t.isStringLiteral(prop.value);
				// 		// const value = "blah blah blah";
				// 		// const x = `${acc}"${prop.key.name}": "${value}"`;
				// return `${acc}"${prop.key.name}": "${value}"${
				// 	i === path.node.properties.length - 1 ? "" : ","
				// }`;
				// 	},
				// 	""
				// );

				// console.log({ stringifiedObject });

				// path.node.properties;
				// console.log({ x: path.node });
				// path.node.key.name = "heh";
			}
		}
	};

	// console.log({ code });

	// const ast = babylon.parse(code);

	// traverse.default(ast, {
	// 	enter(path) {
	// 		if (t.isObjectExpression(path.node)) {
	// let stringifiedObject = path.node.properties.reduce(
	// 	(acc, prop, i) => {
	// 		const isStringLiteral = t.isStringLiteral(prop.value);
	// 		const value = "blah blah blah";
	// 		const x = `${acc}"${prop.key.name}": "${value}"`;
	// 		return `${acc}"${prop.key.name}": "${value}"${
	// 			i === path.node.properties.length - 1 ? "" : ","
	// 		}`;
	// 	},
	// 	""
	// );
	// 			// console.log({ stringifiedObject });

	// 			const code = `JSON.parse({${stringifiedObject}})`;
	// 			// console.log(babylon.parseExpression(code));
	// 			console.log(path.node);
	// 			// path.node = babylon.parseExpression(code);

	// 			// console.log(JSON.parse(`"${stringifiedObject}"`));
	// 		}
	// 	}
	// });

	// console.log(generate.default(ast));

	// return 5;
	// return generate(ast);
}

module.exports = babel.createConfigItem(objectParseTransformer);
