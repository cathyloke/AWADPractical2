@extends('layouts.app')
@section('content')
<div class='container'>
  {{ auth()->id() }}
    @foreach ($posts as $post)
    
        <div class='card'>
            <div class='card-header'>{{$post->title}}</div>
            <div class='d-flex'>
                @can('delete', $post)
                    <form method='get' action='{{route('posts.delete', ['id'=>$post->id])}}'>
                        <button class = 'btn btn-danger me-3'>Delete</button>
                    </form>
                @endcan

                @can('update', $post)
                    <form method='get' action='{{route('posts.update', ['id'=>$post->id])}}'>
                        <button class = 'btn btn-success me-3'>Update</button>
                    </form>
                @endcan
            </div>
            <div class='card-body'>{{$post->content}}</div>   
        </div>
                
    @endforeach
</div>

@endsection