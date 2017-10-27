const MarkdownIt = require('markdown-it');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const jsonfile = require('jsonfile');
const async = require('async');
const fm = require('front-matter');
const config = require('../static/config/config.json');

function readFile(filepath, callback) {
  fs.readFile(filepath, 'utf-8', callback);
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

function compile(fileData, callback) {
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

  this.data.posts.push(post);

  fs.writeFile(renderedpath, rendered, callback);
}

function Compiler(data) {
  this.data = data;
}

Compiler.prototype.addFile = function (filepath) {

  async.waterfall([
    readFile,
    compile,
  ], (err) => {
    if (err) throw err;
  });

};

Compiler.prototype.writeData = function (callback) {
  const dataPath = path.join(process.cwd(), 'src/utils/data.json');
  console.log(JSON.stringify(this.data));
  jsonfile.writeFile(dataPath, this.data, callback);
};

module.exports = Compiler;
