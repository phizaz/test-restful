'use strict';
var app;

app = angular.module('app', ['ngResource']);

app.factory('Post', [
  '$resource', function(resource) {
    var Post, belongs, reduce;
    belongs = ['id', 'title'];
    reduce = function(obj) {
      var key, result, _i, _len;
      result = {};
      for (_i = 0, _len = belongs.length; _i < _len; _i++) {
        key = belongs[_i];
        result[key] = obj[key];
      }
      return result;
    };
    Post = resource('public/post/:id', {
      id: '@id'
    }, {
      update: {
        method: 'put'
      }
    });
    Post.query = (function(old) {
      return function() {
        return old(function(res) {
          return '';
        }, function(err) {
          throw new Error('in Post.query', err);
        });
      };
    })(Post.query);
    Post.save = (function(old) {
      return function(post) {
        if (post == null) {
          throw new Error('missing: posti in Post.update');
        }
        return old(reduce(post), function(res) {
          var key, val, _results;
          _results = [];
          for (key in res) {
            val = res[key];
            _results.push(post[key] = val);
          }
          return _results;
        }, function(err) {
          throw new Error('in Post.save', err);
        });
      };
    })(Post.save);
    Post.update = (function(old) {
      return function(post) {
        if (post == null) {
          throw new Error('missing: post in Post.update');
        }
        return old(reduce(post), function(res) {
          var key, val, _results;
          _results = [];
          for (key in res) {
            val = res[key];
            _results.push(post[key] = val);
          }
          return _results;
        }, function(err) {
          throw new Error('in Post.update', err);
        });
      };
    })(Post.update);
    Post["delete"] = (function(old) {
      return function(post) {
        if (post == null) {
          throw new Error('missing: post in Post.delete');
        }
        return old({
          id: post.id
        }, function(res) {
          return '';
        }, function(err) {
          throw new Error('in Post.delete', err);
        });
      };
    })(Post["delete"]);
    return Post;
  }
]);

app.factory('Comment', [
  '$resource', function(resource) {
    var Comment, belongs, reduce;
    belongs = ['id', 'post_id', 'title'];
    reduce = function(obj) {
      var key, result, _i, _len;
      result = {};
      for (_i = 0, _len = belongs.length; _i < _len; _i++) {
        key = belongs[_i];
        result[key] = obj[key];
      }
      return result;
    };
    Comment = resource('public/comment/:id', {
      id: '@id'
    }, {
      update: {
        method: 'put'
      }
    });
    Comment.save = (function(old) {
      return function(post, comment) {
        if (post == null) {
          throw new Error('missing: post in Comment.save');
        }
        if (comment == null) {
          throw new Error('missing: comment in Comment.save');
        }
        comment.post_id = post.id;
        return old(reduce(comment), function(res) {
          var key, val, _results;
          _results = [];
          for (key in res) {
            val = res[key];
            _results.push(comment[key] = val);
          }
          return _results;
        }, function(err) {
          throw new Error('in Comment.save', err);
        });
      };
    })(Comment.save);
    Comment.update = (function(old) {
      return function(comment) {
        if (comment == null) {
          throw new Error('missing: comment in Comment.update');
        }
        return old(reduce(comment), function(res) {
          var key, val, _results;
          _results = [];
          for (key in res) {
            val = res[key];
            _results.push(comment[key] = val);
          }
          return _results;
        }, function(err) {
          throw new Error('in Comment.update', err);
        });
      };
    })(Comment.update);
    Comment["delete"] = (function(old) {
      return function(comment) {
        if (comment == null) {
          throw new Error('missing: commnet in Comment.delete');
        }
        return old({
          id: comment.id
        }, function(res) {
          return '';
        }, function(err) {
          throw new Error('in Comment.delete', err);
        });
      };
    })(Comment["delete"]);
    return Comment;
  }
]);

app.controller('testCtrl', [
  '$scope', 'Post', 'Comment', function(s, Post, Comment) {
    s.posts = Post.query();
    s.post = {};
    s.update = function(post) {
      if (post.title == null) {
        return;
      }
      delete post.edit;
      return Post.update(post);
    };
    s.create = function() {
      if (s.post.title == null) {
        return;
      }
      Post.save(s.post);
      s.posts.push(s.post);
      return s.post = {};
    };
    s["delete"] = function(post) {
      s.posts = _.without(s.posts, post);
      return Post["delete"](post);
    };
    s.commentCreate = function(post) {
      if (post.comment.title == null) {
        return;
      }
      Comment.save(post, post.comment);
      post.comments.push(post.comment);
      return post.comment = {};
    };
    s.commentUpdate = function(comment) {
      if (comment.title == null) {
        return;
      }
      delete comment.edit;
      return Comment.update(comment);
    };
    return s.commentDelete = function(post, comment) {
      post.comments = _.without(post.comments, comment);
      return Comment["delete"](comment);
    };
  }
]);
