'use strict'

app = angular.module 'app', [
  'ngResource'
]



app.factory 'Post', [
  '$resource',
  (resource) ->
    belongs = [
      'id',
      'title'
    ]

    reduce = (obj) ->
      result = {}
      for key in belongs
        result[key] = obj[key]
      result

    Post = resource 'public/post/:id', {id: '@id'},
      update:
        method: 'put'

    Post.query = ((old) ->
      ->
        old (res) ->
          ''
        , (err) ->
          throw new Error 'in Post.query', err
    )(Post.query)

    Post.save = ((old) ->
      (post) ->
        if not post?
          throw new Error 'missing: posti in Post.update'
        old reduce(post), (res) ->
          for key, val of res
            post[key] = val
        , (err) ->
          throw new Error 'in Post.save', err
    )(Post.save)

    Post.update = ((old) ->
      (post) ->
        if not post?
          throw new Error 'missing: post in Post.update'
        old reduce(post), (res) ->

          for key, val of res
            post[key] = val
        , (err) ->
          throw new Error 'in Post.update', err
    )(Post.update)

    Post.delete = ((old) ->
      (post) ->
        if not post?
          throw new Error 'missing: post in Post.delete'
        old {id: post.id}, (res) ->
          ''
        , (err) ->
          throw new Error 'in Post.delete', err
    )(Post.delete)

    Post
]

app.factory 'Comment', [
  '$resource',
  (resource) ->
    belongs = [
      'id',
      'post_id',
      'title'
    ]

    reduce = (obj) ->
      result = {}
      for key in belongs
        result[key] = obj[key]
      result

    Comment = resource 'public/comment/:id', {id: '@id'},
      update:
        method: 'put'

    Comment.save = ((old) ->
      (post, comment) ->
        if not post?
          throw new Error 'missing: post in Comment.save'
        if not comment?
          throw new Error 'missing: comment in Comment.save'

        comment.post_id = post.id
        old reduce(comment), (res) ->
          for key, val of res
            comment[key] = val
        , (err) ->
          throw new Error 'in Comment.save', err
    )(Comment.save)

    Comment.update = ((old) ->
      (comment) ->
        if not comment?
          throw new Error 'missing: comment in Comment.update'
        old reduce(comment), (res) ->
          for key, val of res
            comment[key] = val
        , (err) ->
          throw new Error 'in Comment.update', err
    )(Comment.update)

    Comment.delete = ((old) ->
      (comment) ->
        if not comment?
          throw new Error 'missing: commnet in Comment.delete'
        old {id: comment.id}, (res) ->
          ''
        , (err) ->
          throw new Error 'in Comment.delete', err
    )(Comment.delete)

    Comment
]

app.controller 'testCtrl', [
  '$scope',
  'Post',
  'Comment',
  (s, Post, Comment) ->
    s.posts = Post.query()

    s.post = {}

    s.update = (post) ->
      if not post.title? then return
      delete post.edit
      Post.update post

    s.create = ->
      if not s.post.title? then return
      Post.save s.post
      s.posts.push s.post
      s.post = {}

    s.delete = (post) ->
      # _.without s.posts, {id: post.id}
      s.posts = _.without s.posts, post
      Post.delete post

    s.commentCreate = (post) ->
      if not post.comment.title? then return
      Comment.save post, post.comment
      post.comments.push post.comment
      post.comment = {}

    s.commentUpdate = (comment) ->
      if not comment.title? then return
      delete comment.edit
      Comment.update comment

    s.commentDelete = (post, comment) ->
      post.comments = _.without post.comments, comment
      Comment.delete comment

]
