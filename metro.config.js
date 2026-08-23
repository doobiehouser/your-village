// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Some dependencies (e.g. react@19's package.json "exports" map for
// "react/jsx-runtime") trip up Metro's still-maturing support for
// package.json "exports" on this Expo/React version combo, producing
// "Unable to resolve react/jsx-runtime" during web bundling even though
// the file exists. Disabling package-exports resolution here falls back
// to legacy main-field / direct subpath file resolution, which resolves
// these correctly.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
