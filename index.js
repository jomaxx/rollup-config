const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const path = require("path");

const cwd = process.cwd();
const pkg = require(`${cwd}/package.json`);

module.exports = {
  input: require.resolve(path.resolve(cwd, "src")),

  output: [
    {
      file: path.resolve(cwd, pkg.main),
      format: "cjs"
    },

    pkg.module && {
      file: path.resolve(cwd, pkg.module),
      format: "es"
    }
  ].filter(Boolean),

  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],

  plugins: [
    resolve(),
    babel({
      plugins: [require.resolve("babel-plugin-external-helpers")]
    })
  ]
};
