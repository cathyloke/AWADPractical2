@extends('layouts.app')
@section('content')
<div class='container'>
    <div class='card'>
        <div class='card-header'>Create Posts</div>
        <div class='card-body'></div>
        <form method='post' action='{{route('posts.create')}}'>
            @csrf 
            <div class='mb-3'>
                <label class='form-label'>User Id</label>
                <input class='form-control' type='text' name='user_id'>
            </div>

            <div class='mb-3'>
                <label class='form-label'>Title</label>
                <input class='form-control' type='text' name='title'>
            </div>

            <div class='mb-3'>
                <label class='form-label'>Content</label>
                <textarea class='form-control' type='text' name='content' rows=4></textarea>
            </div>

            <div class='mb-3'>
                <button class='btn btn-primary w-100'>Add Post</button>
            </div>
        </form>
    </div>
</div>

@endsection