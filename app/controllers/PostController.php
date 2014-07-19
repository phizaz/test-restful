<?php

class PostController extends BaseController {

  /*
  |--------------------------------------------------------------------------
  | Default Home Controller
  |--------------------------------------------------------------------------
  |
  | You may wish to use controllers instead of, or in addition to, Closure
  | based routes. That's great! Here is an example controller method to
  | get you started. To route to this controller, just add the route:
  |
  |	Route::get('/', 'HomeController@showWelcome');
  |
  */

  public function index() {
    $posts = Post::all();
    $result = array();
    foreach($posts as $post) {
      $result[] = $post->toArray();
    }
    return Response::json($result);
  }

  public function show($id) {
    $post = Post::find($id);
    if(!$post) App::abort('404', 'post not found');
    return Response::json($post->toArray());
  }

  public function store() {
    $title = Input::get('title');
    if(!$title) App::abort('400', 'no title');

    $post = new Post();
    $post->title = $title;
    $post->save();

    return Response::json($post->toArray());
  }

  public function update($id) {
    $title = Input::get('title');
    if(!$title) App::abort('400', 'no title');

    $post = Post::find($id);
    if(!$post) App::abort('404', 'post not found');
    $post->title = $title;
    $post->save();

    return Response::json($post->toArraySelf());
  }

  public function destroy($id) {
    $post = Post::find($id);
    if(!$post) App::abort('404', 'post not found');
    $comments = $post->comments;
    foreach ($comments as $comment) {
      $comment->delete();
    }
    $post->delete();
    App::abort('200');
  }

}
