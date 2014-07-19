<?php

class CommentController extends BaseController {

  public function index() {
    App::abort('401', 'unorthorized');
  }

  public function show($id) {
    $comment = Comment::find($id);
    if(!$comment) App::abort('404', 'comment not found');
    return Response::json($comment->toArray());
  }

  public function store() {
    $post_id = Input::get('post_id');
    $title = Input::get('title');
    if(!$post_id) App::abort('400', 'no post_id');
    if(!$title) App::abort('400', 'no title');

    $comment = new Comment();
    $comment->post_id = $post_id;
    $comment->title = $title;
    $comment->save();

    return Response::json($comment->toArray());
  }

  public function update($id) {
    $title = Input::get('title');
    if(!$title) App::abort('400', 'no title');

    $comment = Comment::find($id);
    if(!$comment) App::abort('404', 'comment not found');
    $comment->title = $title;
    $comment->save();
    return Response::json($comment->toArray());
  }

  public function destroy($id) {
    $comment = Comment::find($id);
    if(!$comment) App::abort('404', 'comment not found');
    $comment->delete();
    App::abort('200');
  }
}
