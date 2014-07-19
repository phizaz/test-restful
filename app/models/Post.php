<?php

class Post extends Eloquent {
  protected $table = 'posts';

  public function comments() {
    return $this->hasMany('Comment', 'post_id');
  }

  public function toArray() {
    return array(
      'id' => $this->id,
      'title' => $this->title,
      'comments' => $this->comments->toArray(),
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    );
  }

  // Without comments .. it's the right way for updating to reduce size
  public function toArraySelf() {
    return array(
      'id' => $this->id,
      'title' => $this->title,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at
    );
  }
}
