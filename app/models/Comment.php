<?php

class Comment extends Eloquent {
  protected $table = 'comments';

  public function toArray() {
    return array(
      'id' => $this->id,
      'post_id' => $this->post_id,
      'title' => $this->title,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at
    );
  }
}
