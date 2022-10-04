<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Support\Facades\Storage;

class GameController
{
    public function index()
    {
        return Game::where('title', 'like', '%'.request('q').'%')->latest()->paginate(10);
    }

    public function store()
    {
        $validated = request()->validate([
            'title' => 'required',
            'content' => 'required|min:2',
            'released_at' => 'required|date',
            'image' => 'required|image',
        ]);

        $validated['image'] = '/storage/'.request()->file('image')->store('games');

        $game = Game::create($validated);
    
        return response($game, 201);
    }

    public function update(Game $game)
    {
        $validated = request()->validate([
            'title' => 'nullable',
            'content' => 'nullable|min:2',
            'released_at' => 'nullable|date',
            'image' => 'nullable|image',
        ]);

        $game->update($validated);

        return $game;
    }

    public function destroy(Game $game)
    {
        Storage::delete(str($game->image)->remove('/storage/'));

        $game->delete();
    }
}
