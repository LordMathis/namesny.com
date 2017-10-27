const MarkdownIt = require('markdown-it');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const jsonfile = require('jsonfile');
const async = require('async');
const fm = require('front-matter');
const config = require('../static/config/config.json');

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

function compile(filepath, data, fileData, callback) {
  const frontMatter = fm(fileData);
  const rendered = render(frontMatter.body);
  const metadata = fileMetadata(filepath);

  const post = {
    published: moment().format('MMMM Do YYYY'),
    filename: metadata.filename,
    title: frontMatter.attributes.title,
    summary: frontMatter.attributes.summary,
  };

  const renderedpath = path.join(process.cwd(), config.renderPath, `${metadata.filename}.html`);

  data.posts.push(post);

  fs.writeFile(renderedpath, rendered, callback);
}

function Compiler(data) {
  this.data = data;
}

Compiler.prototype.addFile = function (filepath) {

  console.log("Foo", this.data);

  async.waterfall([
    fs.readFile.bind(fs, filepath, 'utf8'),
    compile.bind(compile, filepath, this.data),
  ], (err) => {
    if (err) throw err;
  });

};

Compiler.prototype.writeData = function (callback) {
  console.log('Bar', this.data);
  const dataPath = path.join(process.cwd(), 'src/utils/data.json');
  jsonfile.writeFile(dataPath, this.data, callback);
};

module.exports = Compiler;
