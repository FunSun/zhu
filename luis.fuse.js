const { FuseBox, WebIndexPlugin, ImageBase64Plugin, JSONPlugin } = require('fuse-box');
const JsxControlsPugin = require('jsx-controls-loader').fuseBoxPlugin;

const { SnapshotPlugin } = require('luis/dist/bridges/jest/snapshot_plugin');

function run (root, entry) {
  const fuse = FuseBox.init({
    homeDir: root,
    target: 'browser@es6',
    output: '../../luis/$name.js',
    allowSyntheticDefaultImports: true,
    alias: {
      'react-split-pane': 'react-split-pane/dist/index.esm.js'
    },
    plugins: [
      WebIndexPlugin({ template: 'index.html', target: 'index.html' }),
      JsxControlsPugin,
      ImageBase64Plugin(),
      JSONPlugin(),
      SnapshotPlugin()
    ],
    sourceMaps: true
  });
  const historyAPIFallback = require('connect-history-api-fallback');

  fuse.dev({ port: 9001 }, server => {
    const app = server.httpServer.app;
    app.use(historyAPIFallback());
  });

  // fuse
  //   .bundle('vendor')
  //   // Watching (to add dependencies) it's damn fast anyway
  //   // first bundle will get HMR related code injected
  //   .instructions(` ~ ${entry}`); // nothing has changed here

  fuse
    .bundle('app')
    .instructions(` > ${entry}`)
    .hmr()
    .watch();
  fuse.run();
};

run("../../src", "luis.ts")