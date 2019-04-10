<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('movie/upcoming/{page?}', 'API\MovieController@index');
Route::get('movie/pagination', 'API\MovieController@pagination');
Route::get('movie/search/{query}', 'API\MovieController@search');
Route::get('movie/{id}', 'API\MovieController@show');
