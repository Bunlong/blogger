import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to the index
        // we navigate by calling this.context.route.push with the 
        // new path to navigate to.
        this.context.router.push('/');
      });
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Create A New Post</h3>
          <div className={`${title.touched && title.invalid ? 'has-danger' : ''}`}>
            <label>Title</label>
            <input type="text" {...title} />
            <div>
              {title.touched ? title.error : ''}
            </div>
          </div>
          <div className={`${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
            <label>Categories</label>
            <input type="text" {...categories} />
            <div>
              {categories.touched ? categories.error : ''}
            </div>
          </div>
          <div className={`${content.touched && content.invalid ? 'has-danger' : ''}`}>
            <label>Content</label>
            <textarea {...content} />
            <div>
              {content.touched ? content.error : ''}
            </div>
          </div>

          <button type="submit">Submit</button>
          <Link to="/">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = 'Enter a username';
  }

  if(!values.categories) {
    errors.categories = 'Enter categories';
  }

  if(!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchtoProps

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);