const MarkdownIt = require('markdown-it');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const jsonfile = require('jsonfile');
const async = require('async');
const fm = require('front-matter');
const config = require('../utils/config.json');

/**
 * Renders file using MarkdownIt
 */
function render(file) {
  const md = new MarkdownIt({html: true});
  return md.render(file);
}

/**
 * Extracts file metadata such as parent directory
 */
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

/**
 * Compiles file that is a blog post
 */
function compilePost(filepath, data, fileData, callback) {
  const frontMatter = fm(fileData);
  const rendered = render(frontMatter.body);
  const metadata = fileMetadata(filepath);

  let published;
  if (frontMatter.attributes.date) {
    published = moment(frontMatter.attributes.date);
  } else {
    published = moment();
  }

  const post = {
    published: published.format('MMMM DD, YYYY'),
    filename: metadata.filename,
    title: frontMatter.attributes.title,
    link: '/post/' + metadata.filename
  };

  const renderedpath = path.join(process.cwd(), config.renderPath, `${metadata.filename}.html`);

  fs.writeFile(renderedpath, rendered, (err) => {
    if (err) callback(err);
    else callback(null, post);
  });
}

/**
 * Compiles other types of files such as resumes, about me and so on.
 */
function compileOther(filepath, data, fileData, callback) {

  const frontMatter = fm(fileData);
  const rendered = render(frontMatter.body);
  const metadata = fileMetadata(filepath);

  const post = {
    filename: metadata.filename
  }

  const renderedpath = path.join(process.cwd(), config.renderPath, `${metadata.filename}.html`);

  fs.writeFile(renderedpath, rendered, (err) => {
    if (err) callback(err);
    else callback(null, post);
  });
}

function Compiler(data) {
  this.data = data;
}

/**
 *
 */
Compiler.prototype.addFile = function(filepath, isPost, callback) {

  if (isPost) {
    async.waterfall([
      fs.readFile.bind(fs, filepath, 'utf8'),
      compilePost.bind(compilePost, filepath, this.data),
    ], (err, result) => {
      if (err) throw err;

      this.data.posts.push(result);
      console.log("[Compiler] File %s compiled", filepath);
      callback();
    });
  } else {
    async.waterfall([
      fs.readFile.bind(fs, filepath, 'utf8'),
      compileOther.bind(compileOther, filepath, this.data),
    ], (err, result) => {
      if (err) throw err;

      this.data.other.push(result);
      console.log("[Compiler] File %s compiled", filepath);
      callback();
    });
  }
};

/**
 * Writes updated data to the data file
 */
Compiler.prototype.writeData = function(callback) {
  const dataPath = path.join(process.cwd(), 'src/utils/data.json');
  jsonfile.writeFile(dataPath, this.data, callback);
};

module.exports = Compiler;
