<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller
{
    function show()
    {
        $data = Post::all();
        return view('posts.show', ['posts' => $data]);
    }

    function index()
    {
        // if (Gate::allows('isAuthor')) {
        //     dd('Author allowed');
        // } else {
        //     dd('You are not an Author');
        // }

        $data = Post::all();
        return view('posts.index', ['posts' => $data]);
    }

    function create(Request $req)
    {
        Post::create([
            'user_id' => $req->input('user_id'),
            'title' => $req->input('title'),
            'content' => $req->input('content'),
        ]);
        return redirect('posts/index');
    }

    function showCreateForm()
    {
        return view('posts.createForm');
    }

    function update(Request $req)
    {
        $data = Post::find($req->id);
        $data->update($req->all());

        $posts = Post::all();
        return view('posts.index', ['posts' => $posts]);
    }
    function showUpdateForm($id)
    {
        $data =  Post::find($id);
        return view('posts.updateForm', ['post' => $data]);
    }

    function destroy($id)
    {
        Post::find($id)->delete();
        return redirect('posts/index');
    }
}
