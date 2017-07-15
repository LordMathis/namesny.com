import React, {Component} from 'react';
import jsonfile from 'jsonfile';

export default class Post extends Component {

  static blogPost;

  constructor() {
    super();
    var dataPath = path.join(process.cwd(), 'src/helpers/data.json');
    jsonfile.readFile(dataPath, function(err, data) {
      if (err) throw err;

      for (var i = 0; i < data.posts.length; i++) {
        var val = data.posts[i];

        if (val.filename === this.props.match.params.post) {
          blogPost = val;
        }
      }
    }.bind(this));
  }



  render () {

    return (
      <div className="content">
        <div className="post-header">
          <h1>
            {blogPost.title}
          </h1>
          <span>
            {blogPost.published}
          </span>
          { if (blogPost.updated) {
            <span>{ blogPost.updated }</span>
            }}
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{__html: blogPost.body}}>

        </div>
      </div>
    )
  }
}
