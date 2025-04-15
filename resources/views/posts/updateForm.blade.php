@extends('layouts.app')
@section('content')
<div class='container'>
    <div class='card'>
        <div class='card-header'>Update Posts</div>
        <div class='card-body'></div>
        <form method='post' action='{{route('posts.update', ['id'=>$post->id])}}'>
            @csrf 

            <div class='mb-3'>
                <label class='form-label'>Title</label>
                <input class='form-control' type='text' name='title' value='{{$post->title}}'>
            </div>

            <div class='mb-3'>
                <input class='form-control' type='hidden' name='id' value='{{$post->id}}'>
            </div>

            <div class='mb-3'>
                <label class='form-label'>Content</label>
                <textarea class='form-control' type='text' name='content' rows=4>{{$post->content}}</textarea>
            </div>

            <div class='mb-3'>
                <button class='btn btn-success w-100'>Update Post</button>
            </div>
        </form>
    </div>
</div>

@endsection