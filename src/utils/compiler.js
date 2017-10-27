const MarkdownIt = require('markdown-it');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const jsonfile = require('jsonfile');
const Step = require('step');
const fm = require('front-matter');
const config = require('../static/config.json');

function readFile(filepath, callback) {
  fs.readFile(filepath, 'utf-8', callback);
}

function writeRenderedFile(renderedpath, result) {
  fs.writeFile(renderedpath, result, (err) => {
    if (err) throw err;
  });
}

function writeData(data) {
  const dataPath = path.join(process.cwd(), 'server/utils/data.json');
  jsonfile.writeFile(dataPath, data, (err) => {
    if (err) throw err;
  });
}

function render(file) {
  const md = new MarkdownIt();
  return md.render(file);
}

function fileMetadata(filepath) {
  const paths = filepath.split('/');
  const basename = path.basename(filepath);

  const metadata = {
    basename,
    filename: basename.substr(0, basename.lastIndexOf('.')),
    parrent: paths[paths.length - 2],
    dirname: path.dirname(filepath),
  };

  return metadata;
}

const compiler = {
  add(filepath) {
    Step(
      function loadFiles() {
        readData(this.parallel());
        readFile(filepath, this.parallel());
      },
      (err, data, fileData) => {
        if (err) throw err;

        const frontMatter = fm(fileData);
        const rendered = render(frontMatter.body);
        const metadata = fileMetadata(filepath);

        const post = {
          published: moment().format('MMMM Do YYYY'),
          filename: metadata.filename,
          title: frontMatter.attributes.title,
          summary: frontMatter.attributes.summary,
        };

        const renderedpath = path.join(config.renderPath, `${metadata.filename}.html`);

        data.posts.push(post);
        writeData(data);
        writeRenderedFile(renderedpath, rendered);
      }
    );
  },
}
