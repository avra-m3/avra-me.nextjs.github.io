/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: !!process.env.BUNDLE_VIEWER,
})
const withTM = require('next-transpile-modules')(['react-anime']);
const withPreact = require('next-plugin-preact');
module.exports = withBundleAnalyzer(withPreact(withTM({
    webpack(config) {
        Object.assign(config.resolve.alias, {
            "react": "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",     // Must be below test-utils
            "react/jsx-runtime": "preact/jsx-runtime"
        })
        return config
    }
})))
